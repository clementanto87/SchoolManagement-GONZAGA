import { Router } from 'express';
import prisma from '../prisma';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

// Get all events (Public)
router.get('/', async (req, res) => {
    try {
        const events = await prisma.event.findMany({
            orderBy: {
                date: 'asc',
            },
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// Create a new event (Admin only)
router.post('/', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
    const { title, date, time, location, description } = req.body;
    try {
        const event = await prisma.event.create({
            data: {
                title,
                date: new Date(date),
                time,
                location,
                description,
            },
        });
        res.status(201).json(event);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

// Update an event (Admin only)
router.put('/:id', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
    const { id } = req.params;
    const { title, date, time, location, description } = req.body;
    try {
        const event = await prisma.event.update({
            where: { id },
            data: {
                title,
                date: new Date(date),
                time,
                location,
                description,
            },
        });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update event' });
    }
});

// Delete an event (Admin only)
router.delete('/:id', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.event.delete({
            where: { id },
        });
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

export default router;
