import Question from '../models/Question.js';
import Session from '../models/Session.js';
import { v4 as uuidv4 } from 'uuid';

export default {
  getQuestions: async (req, res) => {
    try {
      const questions = await Question.find({});
      res.json(questions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch quiz questions' });
    }
  },

  submitAnswers: async (req, res) => {
    try {
      const { answers } = req.body;
      if (!answers || !Array.isArray(answers)) {
        return res.status(400).json({ error: 'Answers array is required' });
      }

      const sessionUUID = uuidv4();
      const session = new Session({
        sessionUUID,
        user: req.user._id,
        responses: answers.map(a => ({
          questionId: a.questionId,
          selectedOptionIds: a.selectedOptionIds
        }))
      });

      await session.save();
      res.json({ ok: true, sessionUUID });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to submit answers' });
    }
  }
};
