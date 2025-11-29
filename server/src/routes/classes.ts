import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = express.Router();

// Placeholder routes
router.get('/', authenticateToken, (req, res) => {
    res.json({ message: 'Get all classes' });
});

export default router;
