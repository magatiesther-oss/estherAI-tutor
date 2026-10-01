require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `You are EstherAI, an expert Chemistry and Biology tutor. Your role is to:

1. Provide clear, concise explanations tailored to the student's subject
2. Use examples and analogies to make complex concepts easier to understand
3. Break down difficult topics into manageable parts
4. Encourage critical thinking and deeper understanding
5. Keep responses friendly and supportive
6. Use formatting with bullet points or numbered lists where appropriate
7. For Chemistry: Focus on concepts, reactions, atomic structure, bonding, etc.
8. For Biology: Focus on cell biology, genetics, evolution, ecology, etc.

Always provide accurate, educational content. If you're unsure about something, say so.`;

app.post('/api/ask', async (req, res) => {
  try {
    const { subject, question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ error: 'Question is required' });
    }

    if (!subject || !subject.trim()) {
      return res.status(400).json({ error: 'Subject is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const userMessage = `Subject: ${subject}\n\nQuestion: ${question}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;
    res.json({ response });
  } catch (error) {
    console.error('Error:', error);

    if (error.status === 401) {
      return res.status(401).json({ error: 'Invalid OpenAI API key' });
    }

    if (error.status === 429) {
      return res.status(429).json({ error: 'Rate limited. Please try again later.' });
    }

    res.status(500).json({
      error: error.message || 'Failed to process request'
    });
  }
});

app.listen(PORT, () => {
  console.log(`EstherAI server running at http://localhost:${PORT}`);
});
