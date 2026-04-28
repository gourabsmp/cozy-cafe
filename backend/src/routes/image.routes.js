import express from 'express';
import { uploadImage, deleteImage, getGallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } from '../controllers/image.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

// Image Storage
router.post('/upload', authMiddleware, upload.single('image'), uploadImage);
router.delete('/delete', authMiddleware, deleteImage);

// Gallery
router.get('/gallery', getGallery);
router.post('/gallery', authMiddleware, addGalleryItem);
router.put('/gallery/:id', authMiddleware, updateGalleryItem);
router.delete('/gallery/:id', authMiddleware, deleteGalleryItem);

export default router;
