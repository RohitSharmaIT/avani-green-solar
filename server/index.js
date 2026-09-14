import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedInitialData } from './seed/seedData.js';

// Route imports
import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import blogRoutes from './routes/blog.routes.js';
import leadRoutes from './routes/lead.routes.js';
import siteVisitRoutes from './routes/siteVisit.routes.js';
import reviewRoutes from './routes/review.routes.js';
import partnerRoutes from './routes/partner.routes.js';
import contactRoutes from './routes/contact.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import uploadRoutes from './routes/upload.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Avani Green Solar API Server'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/site-visits', siteVisitRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);

// Error Handler
app.use((err, req, res, _next) => {
  console.error('[Server Error]', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error occurred.',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start Server and Database
async function startServer() {
  try {
    await connectDB();
    await seedInitialData();

    app.listen(PORT, () => {
      console.log(`[Avani Solar API] Running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();
