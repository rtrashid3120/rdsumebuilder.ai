import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import resumeRoutes from './routes/resumeRoutes.js';
import suggestRoutes from './routes/suggestRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/smart-resume-builder';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'ResumeBuilder.ai Backend API', timestamp: new Date() });
});

// API Routes
app.use('/api/resumes', resumeRoutes);
app.use('/api/suggest', suggestRoutes);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log(` Connected to MongoDB database: ${MONGO_URI}`))
  .catch((err) => console.log(` MongoDB Connection Warning: ${err.message}. Server running with local memory storage.`));

app.listen(PORT, () => {
  console.log(` ResumeBuilder.ai Express server listening on http://localhost:${PORT}`);
});
