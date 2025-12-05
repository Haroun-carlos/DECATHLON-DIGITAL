import express from 'express';
import quizController from '../controllers/quizController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', quizController.getQuestions);
router.post('/submit', authMiddleware, quizController.submitAnswers);

export default router;
