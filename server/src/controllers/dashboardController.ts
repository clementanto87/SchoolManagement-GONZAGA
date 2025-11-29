import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const userRole = (req as any).user.role;
        const userId = (req as any).user.id;

        let stats = {};

        if (userRole === 'ADMIN') {
            const totalStudents = await prisma.student.count();
            const totalTeachers = await prisma.teacher.count();
            const totalClasses = await prisma.class.count();
            // Mock revenue for now
            const revenue = 1200000;

            stats = {
                cards: [
                    { title: 'Total Students', value: totalStudents, trend: 'increase', percentage: '12%' },
                    { title: 'Total Teachers', value: totalTeachers, trend: 'increase', percentage: '5%' },
                    { title: 'Total Classes', value: totalClasses },
                    { title: 'Revenue', value: `$${revenue.toLocaleString()}`, trend: 'increase', percentage: '8%' },
                ]
            };
        } else if (userRole === 'TEACHER') {
            // Get teacher's classes and students
            const teacher = await prisma.teacher.findUnique({ where: { userId } });
            if (teacher) {
                const classes = await prisma.class.count({ where: { classTeacherId: teacher.id } });
                const assignments = await prisma.assignment.count({ where: { teacherId: teacher.id } });
                stats = {
                    cards: [
                        { title: 'My Classes', value: classes },
                        { title: 'Active Assignments', value: assignments },
                    ]
                }
            }
        } else if (userRole === 'STUDENT') {
            const student = await prisma.student.findUnique({ where: { userId } });
            if (student) {
                const attendance = await prisma.attendance.count({ where: { studentId: student.id, status: 'PRESENT' } });
                // This is just a placeholder logic
                stats = {
                    cards: [
                        { title: 'Attendance', value: `${attendance} Days` },
                        { title: 'Assignments Pending', value: '3' },
                    ]
                }
            }
        }

        res.json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching dashboard stats' });
    }
};
