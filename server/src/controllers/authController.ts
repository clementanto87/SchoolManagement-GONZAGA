import { Request, Response } from 'express';
import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const register = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName, role, ...additionalData } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await prisma.$transaction(async (prisma) => {
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    firstName,
                    lastName,
                    role: role as UserRole,
                },
            });

            // Create role-specific profile
            if (role === 'STUDENT') {
                await prisma.student.create({
                    data: {
                        userId: user.id,
                        admissionNo: additionalData.admissionNo || `ADM${Date.now()}`,
                        dob: new Date(additionalData.dob || '2000-01-01'),
                        gender: additionalData.gender || 'OTHER',
                        grade: additionalData.grade || '1',
                        section: additionalData.section || 'A',
                    },
                });
            } else if (role === 'TEACHER') {
                await prisma.teacher.create({
                    data: {
                        userId: user.id,
                        hireDate: new Date(),
                        specialization: additionalData.subject || 'General',
                    },
                });
            } else if (role === 'ADMIN') {
                await prisma.admin.create({
                    data: {
                        userId: user.id,
                        designation: additionalData.designation || 'Administrator',
                    },
                });
            } else if (role === 'PARENT') {
                await prisma.parent.create({
                    data: {
                        userId: user.id,
                        occupation: additionalData.occupation
                    }
                })
            }

            return user;
        });

        const token = jwt.sign(
            { id: result.id, email: result.email, role: result.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({ message: 'User registered successfully', token, user: { id: result.id, email: result.email, role: result.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, user: { id: user.id, email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

export const getMe = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                student: true,
                teacher: true,
                admin: true,
                parent: true
            }
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const { password, ...userData } = user;
        res.json(userData);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
