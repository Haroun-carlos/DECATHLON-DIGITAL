import Session from '../models/Session.js';
import Illustration from '../models/Illustration.js';

export default {
  getIllustrations: async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await Session.findById(sessionId).populate('responses.questionId');
      if (!session) return res.status(404).json({ error: 'Session not found' });

      // Simple example logic: assign profile based on answers
      let profile = "Beginner"; // default
      const answers = session.responses.flatMap(r => r.selectedOptionIds);

      // Example: if answers contain certain option IDs, assign "Advanced"
      if (answers.includes("advancedOptionId1") || answers.includes("advancedOptionId2")) {
        profile = "Advanced";
      }

      // Fetch illustrations for the profile
      const illustration = await Illustration.findOne({ profileName: profile });
      if (!illustration) return res.json({ images: [] });

      res.json({ images: illustration.images });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch illustrations' });
    }
  }
};
