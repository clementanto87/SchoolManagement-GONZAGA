import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Submit contact form (Public)
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const contactRequest = await prisma.contactRequest.create({
            data: {
                name,
                email,
                subject,
                message,
                status: 'PENDING',
            },
        });

        res.status(201).json(contactRequest);
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({ error: 'Failed to submit message' });
    }
});

// Get all messages (Admin only)
router.get('/', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
    try {
        const messages = await prisma.contactRequest.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Update message status (Admin only)
router.put('/:id', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const message = await prisma.contactRequest.update({
            where: { id },
            data: { status },
        });
        res.json(message);
    } catch (error) {
        console.error('Error updating message status:', error);
        res.status(500).json({ error: 'Failed to update status' });
    }
});

// Get message stats (Admin only) - for notifications
router.get('/stats', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
    try {
        const pendingCount = await prisma.contactRequest.count({
            where: {
                status: 'PENDING',
            },
        });
        res.json({ pendingCount });
    } catch (error) {
        console.error('Error fetching message stats:', error);
        res.status(500).json({ error: 'Failed to fetch stats', details: error instanceof Error ? error.message : String(error) });
    }
});

export default router;
