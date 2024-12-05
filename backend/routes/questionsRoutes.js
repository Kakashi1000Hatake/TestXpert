import express from 'express';
import { getQuestions } from '../controllers/questionsController.js';

const router = express.Router();

router.get('/generate', getQuestions);  // Assuming 'getQuestions' is your controller function

export default router;  // This line exports the router as a default export
