import express from 'express';
import Resume from '../models/Resume.js';

const router = express.Router();

// POST /api/resumes - Create new resume record
router.post('/', async (req, res) => {
  try {
    const newResume = new Resume(req.body);
    const saved = await newResume.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating resume:', err);
    res.status(500).json({ error: 'Failed to save resume to database.' });
  }
});

// GET /api/resumes/:id - Fetch resume by ID
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found.' });
    }
    res.json(resume);
  } catch (err) {
    console.error('Error fetching resume:', err);
    res.status(500).json({ error: 'Failed to fetch resume.' });
  }
});

// PUT /api/resumes/:id - Update existing resume draft
router.put('/:id', async (req, res) => {
  try {
    const updated = await Resume.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Resume not found.' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating resume:', err);
    res.status(500).json({ error: 'Failed to update resume draft.' });
  }
});

// GET /api/resumes - Fetch all resumes for a user session
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'anonymous-user';
    const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (err) {
    console.error('Error listing resumes:', err);
    res.status(500).json({ error: 'Failed to retrieve resumes list.' });
  }
});

export default router;
