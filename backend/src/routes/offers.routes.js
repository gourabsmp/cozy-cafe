import express from 'express';
import { offersController } from '../controllers/reviews.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();
router.get('/', offersController.getAll);
router.post('/', authMiddleware, offersController.create);
router.put('/:id', authMiddleware, offersController.update);
router.delete('/:id', authMiddleware, offersController.remove);
export default router;
