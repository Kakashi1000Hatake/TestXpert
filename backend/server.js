const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const questionsRoutes = require('./routes/questionsRoutes');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000; // Use port 5000 as default

// Enable CORS to allow requests from frontend
app.use(cors());
app.use(express.json());

// Route for dynamic questions (using the existing endpoint)
app.get('/generate-questions', async (req, res) => {
  const { subject, examPattern } = req.query;

  const prompt = `Generate 5 multiple-choice questions for the subject ${subject} in the exam pattern ${examPattern}. Each question should have 4 options, with one correct answer.`;

  const { Configuration, OpenAIApi } = require('openai');
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.7,
    });

    const generatedQuestions = response.data.choices[0].text.trim();
    res.json({ questions: generatedQuestions });
  } catch (error) {
    console.error('Error generating questions:', error.message);
    res.status(500).send('Error generating questions');
  }
});

// Add the new questions route (integrating OpenAI and alternative API)
app.use('/api', questionsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
