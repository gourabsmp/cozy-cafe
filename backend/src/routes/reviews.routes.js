import express from 'express';
import { reviewsController } from '../controllers/reviews.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();
router.get('/', reviewsController.getAll);
router.post('/', authMiddleware, reviewsController.create);
router.put('/:id', authMiddleware, reviewsController.update);
router.delete('/:id', authMiddleware, reviewsController.remove);
export default router;
