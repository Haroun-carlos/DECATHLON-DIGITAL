import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ error: 'Email already registered' });

      const user = new User({ email, password });
      await user.save();

      res.json({ ok: true, message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to register user' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'Invalid email or password' });

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ ok: true, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Login failed' });
    }
  }
};
