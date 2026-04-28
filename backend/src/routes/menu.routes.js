import express from 'express';
import { getAllMenuItems, createMenuItem, updateMenuItem, deleteMenuItem, getCategories } from '../controllers/menu.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();
router.get('/', getAllMenuItems);
router.get('/categories', getCategories);
router.post('/', authMiddleware, createMenuItem);
router.put('/:id', authMiddleware, updateMenuItem);
router.delete('/:id', authMiddleware, deleteMenuItem);
export default router;
