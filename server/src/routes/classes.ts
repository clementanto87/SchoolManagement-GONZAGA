import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

import prisma from '../prisma';

const router = express.Router();

// Get all classes
router.get('/', authenticateToken, async (req, res) => {
    try {
        const classes = await prisma.class.findMany({
            include: {
                classTeacher: {
                    include: {
                        user: {
                            select: { firstName: true, lastName: true }
                        }
                    }
                },
                _count: {
                    select: { students: true }
                }
            }
        });
        res.json(classes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch classes' });
    }
});

// Get class details by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const classDetails = await prisma.class.findUnique({
            where: { id },
            include: {
                students: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });

        if (!classDetails) {
            return res.status(404).json({ error: 'Class not found' });
        }

        res.json(classDetails);
    } catch (error) {
        console.error('Error fetching class details:', error);
        res.status(500).json({ error: 'Failed to fetch class details' });
    }
});

export default router;
