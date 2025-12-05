import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import illustrationController from '../controllers/illustrationController.js';

const router = express.Router();

// GET /illustrations/:sessionId → returns images for a user session
router.get('/:sessionId', authMiddleware, illustrationController.getIllustrations);

export default router;
