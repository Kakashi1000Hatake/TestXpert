const { Configuration, OpenAIApi } = require('openai');
const axios = require('axios');

// OpenAI API configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Controller to fetch questions
const fetchQuestions = async (req, res) => {
  const { subject, examPattern } = req.query;

  const prompt = `Generate 5 multiple-choice questions for the subject ${subject} in the exam pattern ${examPattern}. Each question should have 4 options, with one correct answer.`;

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
    console.error('Error fetching questions from OpenAI:', error);
    res.status(500).json({ error: 'Failed to generate questions from OpenAI' });
  }
};

const fetchQuestionsFromAnotherAI = async (req, res) => {
  const { subject, examPattern } = req.query;

  try {
    const response = await axios.get(
      `https://example.com/api/questions?subject=${subject}&examPattern=${examPattern}`
    );

    res.json({ questions: response.data.questions });
  } catch (error) {
    console.error('Error fetching questions from external AI:', error);
    res.status(500).json({ error: 'Failed to fetch questions from external AI' });
  }
};

module.exports = { fetchQuestions, fetchQuestionsFromAnotherAI };
