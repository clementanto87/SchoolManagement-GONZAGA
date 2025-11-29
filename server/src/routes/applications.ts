import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Create a new application (Public)
router.post('/', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            dob,
            gender,
            grade,
            parentName,
            parentEmail,
            parentPhone,
            address,
        } = req.body;

        const application = await prisma.application.create({
            data: {
                firstName,
                lastName,
                dob: new Date(dob),
                gender,
                grade,
                parentName,
                parentEmail,
                parentPhone,
                address,
                status: 'PENDING',
            },
        });

        res.status(201).json(application);
    } catch (error) {
        console.error('Error creating application:', error);
        res.status(500).json({ error: 'Failed to submit application' });
    }
});

// Get all applications (Admin only)
router.get('/', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
    try {
        const applications = await prisma.application.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        res.json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});

// Get application stats (Admin only) - for notifications
router.get('/stats', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
    try {
        const pendingCount = await prisma.application.count({
            where: {
                status: 'PENDING',
            },
        });
        res.json({ pendingCount });
    } catch (error) {
        console.error('Error fetching application stats:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// Update application status (Admin only)
router.put('/:id', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const application = await prisma.application.update({
            where: { id },
            data: { status },
        });
        res.json(application);
    } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({ error: 'Failed to update application status' });
    }
});

export default router;
