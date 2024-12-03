require('dotenv').config();  // Load environment variables from .env

// Check if the API key is set
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not set.');
  process.exit(1);
}

const { OpenAI } = require('openai');

// Initialize OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // API key loaded from .env or environment
});

const generateQuestions = async (req, res) => {
  const { subject, examPattern } = req.query;
  const prompt = `Generate 5 multiple-choice questions for the subject ${subject} in the exam pattern ${examPattern}. Each question should have 4 options, with one correct answer.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const generatedQuestions = response.choices[0].message.content.trim();
    res.json({ questions: generatedQuestions });
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).send('Error generating questions');
  }
};

module.exports = { generateQuestions };
