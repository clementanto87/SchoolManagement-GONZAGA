import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

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

// Get logged-in teacher's profile
router.get('/me', authenticateToken, authorizeRoles('TEACHER'), async (req, res) => {
    res.json({ message: 'Get all teachers' });
});

export default router;
