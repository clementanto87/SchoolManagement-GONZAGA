import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all news (Public)
router.get('/', async (req, res) => {
    try {
        const news = await prisma.news.findMany({
            orderBy: { date: 'desc' },
        });
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// Create news (Admin only)
router.post('/', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
    try {
        const { title, excerpt, content, date, author } = req.body;
        const news = await prisma.news.create({
            data: {
                title,
                excerpt,
                content,
                date: date ? new Date(date) : new Date(),
                author,
            },
        });
        res.status(201).json(news);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create news' });
    }
});

// Update news (Admin only)
router.put('/:id', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, excerpt, content, date, author } = req.body;
        const news = await prisma.news.update({
            where: { id },
            data: {
                title,
                excerpt,
                content,
                date: date ? new Date(date) : undefined,
                author,
            },
        });
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update news' });
    }
});

// Delete news (Admin only)
router.delete('/:id', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.news.delete({
            where: { id },
        });
        res.json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete news' });
    }
});

export default router;
