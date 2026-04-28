import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { errorMiddleware } from './src/middleware/error.middleware.js';
import authRoutes from './src/routes/auth.routes.js';
import cafeInfoRoutes from './src/routes/cafeInfo.routes.js';
import menuRoutes from './src/routes/menu.routes.js';
import reviewsRoutes from './src/routes/reviews.routes.js';
import offersRoutes from './src/routes/offers.routes.js';
import imageRoutes from './src/routes/image.routes.js';
import settingsRoutes from './src/routes/settings.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true
}));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => res.json({ success: true, message: 'Cozy Cafe API running 🍵', timestamp: new Date().toISOString() }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cafe-info', cafeInfoRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/settings', settingsRoutes);

// 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// Global error handler
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`\n☕  Cozy Cafe API running at http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
});
