import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
import prisma from '../prisma';

const router = Router();

// Create a new assignment
router.post('/', authenticateToken, authorizeRoles('TEACHER'), async (req, res) => {
    try {
        const { title, description, dueDate, totalMarks, classId, subjectId } = req.body;
        const teacherId = (req as any).user.teacherId; // Assuming middleware adds teacherId

        if (!teacherId) {
            // Fallback to finding teacher by userId if not in token
            const user = await prisma.user.findUnique({
                where: { id: (req as any).user.userId },
                include: { teacher: true }
            });
            if (!user?.teacher) return res.status(403).json({ error: 'Not a teacher' });
        }

        // Re-fetch teacher ID to be safe
        const user = await prisma.user.findUnique({
            where: { id: (req as any).user.userId },
            include: { teacher: true }
        });

        const assignment = await prisma.assignment.create({
            data: {
                title,
                description,
                dueDate: new Date(dueDate),
                totalMarks: parseInt(totalMarks),
                classId,
                subjectId,
                teacherId: user!.teacher!.id
            }
        });

        res.status(201).json(assignment);
    } catch (error) {
        console.error('Error creating assignment:', error);
        res.status(500).json({ error: 'Failed to create assignment' });
    }
});

// Get all assignments created by the logged-in teacher
router.get('/teacher', authenticateToken, authorizeRoles('TEACHER'), async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: (req as any).user.userId },
            include: { teacher: true }
        });

        if (!user?.teacher) return res.status(403).json({ error: 'Not a teacher' });

        const assignments = await prisma.assignment.findMany({
            where: {
                teacherId: user.teacher.id
            },
            include: {
                class: true,
                subject: true,
                _count: {
                    select: { submissions: true }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.json(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ error: 'Failed to fetch assignments' });
    }
});

export default router;
