import express from 'express';
import { themeController, animationController, socialController } from '../controllers/settings.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/theme', themeController.get);
router.put('/theme', authMiddleware, themeController.update);

router.get('/animation', animationController.get);
router.put('/animation', authMiddleware, animationController.update);

router.get('/social', socialController.get);
router.put('/social', authMiddleware, socialController.update);

export default router;
