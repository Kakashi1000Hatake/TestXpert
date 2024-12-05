import express from 'express';
import { fetchQuestions } from '../controllers/questionsController.js';

const router = express.Router();

router.get('/generate', fetchQuestions);

export default router;
