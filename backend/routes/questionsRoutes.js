const express = require('express');
const { getQuestions } = require('../controllers/questionsController');
const router = express.Router();

// Define route for fetching questions
router.get('/questions', getQuestions);

module.exports = router;
