import { OpenAI } from 'openai';
import axios from 'axios';

const openai = new OpenAI({
  apiKey: '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'
});

// Controller to fetch questions
export const fetchQuestions = async (req, res) => {
  const { subject, examPattern } = req.query;

  const prompt = `Generate 5 multiple-choice questions for the subject ${subject} in the exam pattern ${examPattern}. Each question should have 4 options, with one correct answer.`;

  try {
    const response = await openai.completions.create({
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

