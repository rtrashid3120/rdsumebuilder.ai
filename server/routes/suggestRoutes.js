import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

// Initialize OpenAI client if API key is provided
const apiKey = process.env.OPENAI_API_KEY;
let openai = null;
if (apiKey && apiKey !== 'YOUR_OPENAI_API_KEY') {
  openai = new OpenAI({ apiKey });
}

// POST /api/suggest - OpenAI Resume Bullet Improvement Endpoint
router.post('/', async (req, res) => {
  const { text = '', jobTitle = '' } = req.body;
  const trimmed = text.trim();

  // If OpenAI API Key is configured on the backend, call OpenAI API
  if (openai) {
    try {
      const prompt = `You are an expert executive resume writer. 
Rewrite the following resume bullet for a "${jobTitle || 'Professional'}" role to make it action-oriented, quantified, and high impact:
"${trimmed || 'Developed software features and maintained codebase'}"

Return a JSON object with 3 keys:
- "quantified": rewrite with metric estimates (% increase, time saved, $ revenue, or scale)
- "executive": leadership and strategic tone
- "concise": punchy action-verb version`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      });

      const parsed = JSON.parse(completion.choices[0].message.content);
      return res.json(parsed);
    } catch (err) {
      console.error('OpenAI API call failed, using high-impact fallback:', err.message);
    }
  }

  // Graceful High-Impact Local Generator Fallback if OpenAI key is pending
  let quantified = `Engineered scalable modules for ${jobTitle || 'core product'}, accelerating deployment cycles by 35% and maintaining 99.9% uptime.`;
  let executive = `Spearheaded technical execution for ${jobTitle || 'engineering initiatives'}, aligning team output with strategic business goals.`;
  let concise = `Optimized ${trimmed.toLowerCase().replace(/\.$/, '') || 'system features'} to improve overall execution velocity and code quality.`;

  if (trimmed) {
    quantified = `Optimized ${trimmed.toLowerCase().replace(/\.$/, '')}, yielding a 35% increase in operational efficiency and quantifying output across team workflows.`;
    executive = `Spearheaded execution of ${trimmed.toLowerCase().replace(/\.$/, '')}, driving technical quality and cross-functional alignment.`;
    concise = `Streamlined ${trimmed.toLowerCase().replace(/\.$/, '')} to enhance system execution speed and reliability.`;
  }

  res.json({ quantified, executive, concise });
});

export default router;
