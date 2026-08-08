import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Mock In-Memory User Store fallback when MongoDB is connecting
const inMemoryUsers = [
  { id: 'usr-1', name: 'Mohamed Rashid', email: 'mohamed@resumebuilder.ai', password: 'password123' }
];

// REGISTER ENDPOINT
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please provide name, email, and password.' });
  }

  try {
    // Try MongoDB
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password // In production, hash with bcrypt
    });

    await newUser.save();

    return res.status(201).json({
      message: 'Account created successfully!',
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });
  } catch (err) {
    console.log('MongoDB Register fallback to in-memory user creation:', err.message);

    const existsMem = inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existsMem) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const memUser = { id: `usr-${Date.now()}`, name, email: email.toLowerCase(), password };
    inMemoryUsers.push(memUser);

    return res.status(201).json({
      message: 'Account created successfully (Memory Store)!',
      user: { id: memUser.id, name: memUser.name, email: memUser.email }
    });
  }
});

// LOGIN ENDPOINT
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password.' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    return res.json({
      message: 'Login successful!',
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.log('MongoDB Login fallback to memory store check:', err.message);

    const memUser = inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!memUser) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    return res.json({
      message: 'Login successful!',
      user: { id: memUser.id, name: memUser.name, email: memUser.email }
    });
  }
});

export default router;
