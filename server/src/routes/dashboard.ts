import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { getDashboardStats } from '../controllers/dashboardController';

const router = express.Router();

router.get('/stats', authenticateToken, getDashboardStats);

export default router;
