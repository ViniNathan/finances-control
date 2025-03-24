import express from 'express';
import authController from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/validate', protect, authController.validate);
router.get('/user', protect, authController.getUserData);

export default router;