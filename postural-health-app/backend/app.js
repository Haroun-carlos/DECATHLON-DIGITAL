import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // <-- 1. IMPORT CORS HERE

import authRoutes from './routes/auth.js';
import quizRoutes from './routes/quiz.js';
import illustrationRoutes from './routes/illustration.js';

dotenv.config();

const app = express();

// --- 2. ADD CORS MIDDLEWARE HERE ---
// This allows requests from your frontend's different origin (port)
app.use(cors());

app.use(express.json());

// Connect to MongoDB
// NOTE: For Mongoose v6+, useNewUrlParser and useUnifiedTopology are deprecated and unnecessary.
mongoose.connect(process.env.MONGODB_URI) 
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
// NOTE: Your frontend is configured to call /api/... due to the proxy.
// You need to adjust your route prefix usage to match the frontend's calls.

// If frontend calls /api/auth/login, your current setup needs adjustment.
// Let's assume you want your routes under a common '/api' prefix:
app.use('/api/auth', authRoutes); // <-- UPDATED to include '/api'
app.use('/api/quiz', quizRoutes); // <-- UPDATED to include '/api'
app.use('/api/illustrations', illustrationRoutes); // <-- UPDATED to include '/api'


const PORT = process.env.PORT || 5000; // <--- RECOMMENDED: Use port 5000 for backend
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));