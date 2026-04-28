import express from 'express';
import { getCafeInfo, updateCafeInfo } from '../controllers/cafeInfo.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();
router.get('/', getCafeInfo);
router.put('/', authMiddleware, updateCafeInfo);
export default router;
