import express from 'express';
import { check } from 'express-validator';
import { register, login, getMe } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post(
    '/register',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        check('firstName', 'First name is required').not().isEmpty(),
        check('lastName', 'Last name is required').not().isEmpty(),
        check('role', 'Role is required').isIn(['ADMIN', 'TEACHER', 'STUDENT', 'PARENT']),
    ],
    register
);

router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    login
);

router.get('/me', authenticateToken, getMe);

export default router;
