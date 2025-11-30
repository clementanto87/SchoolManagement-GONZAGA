import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
import prisma from '../prisma';

const router = express.Router();

// Get logged-in teacher's classes
router.get('/me/classes', authenticateToken, authorizeRoles('TEACHER'), async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: (req as any).user.userId },
            include: { teacher: true }
        });

        if (!user?.teacher) {
            return res.status(404).json({ error: 'Teacher profile not found' });
        }

        const classes = await prisma.class.findMany({
            where: {
                classTeacherId: user.teacher.id
            },
            include: {
                _count: {
                    select: { students: true }
                }
            }
        });

        res.json(classes);
    } catch (error) {
        console.error('Error fetching teacher classes:', error);
        res.status(500).json({ error: 'Failed to fetch classes' });
    }
});

// Get logged-in teacher's schedule (all periods assigned to them)
router.get('/me/schedule', authenticateToken, authorizeRoles('TEACHER'), async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: (req as any).user.userId },
            include: { teacher: true }
        });

        if (!user?.teacher) {
            return res.status(404).json({ error: 'Teacher profile not found' });
        }

        const periods = await prisma.period.findMany({
            where: {
                teacherId: user.teacher.id
            },
            include: {
                subject: true,
                timetable: {
                    include: {
                        class: true
                    }
                }
            },
            orderBy: [
                { timetable: { dayOfWeek: 'asc' } },
                { startTime: 'asc' }
            ]
        });

        // Transform data for easier frontend consumption
        const schedule = periods.map(period => ({
            id: period.id,
            day: period.timetable.dayOfWeek,
            startTime: period.startTime,
            endTime: period.endTime,
            subject: period.subject.name,
            className: `${period.timetable.class.name}-${period.timetable.class.section}`,
            room: period.roomNo || 'N/A'
        }));

        res.json(schedule);
    } catch (error) {
        console.error('Error fetching teacher schedule:', error);
        res.status(500).json({ error: 'Failed to fetch schedule' });
    }
});

// Get logged-in teacher's profile
router.get('/me', authenticateToken, authorizeRoles('TEACHER'), async (req, res) => {
    res.json({ message: 'Get all teachers' });
});

export default router;
