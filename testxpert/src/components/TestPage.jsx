import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TestPage() {
  const { subject } = useParams(); // Get the subject from the URL
  const [examPattern,setexamPattern] = useState("Hp High Court Clerk")
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {

    console.log(subject);
    console.log(examPattern);
    

    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/questions/generate?subject=${subject}&examPattern=${examPattern}`
        );
        const data = await response.json();
        const questionsText = data.questions;

        // Parse the questions (assuming the format returned is a simple string)
        const questionList = parseQuestions(questionsText);
        setQuestions(questionList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [subject]);

  const parseQuestions = (questionsText) => {
    // Check if the questionsText is valid before parsing
    if (!questionsText) return [];
    return questionsText.split('\n').map((q, index) => {
      const parts = q.split('|');
      return {
        question: parts[0],
        options: parts[1].split(','),
        answer: parts[2],
      };
    });
  };

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Test Completed! Your score: ${score} / ${questions.length}`);
    }
  };

  // Check if questions is empty before trying to render
  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (questions.length === 0) {
    return <p>No questions available.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{subject} Test</h2>
      <div className="mt-4">
        <h3 className="text-lg">{questions[currentQuestionIndex].question}</h3>
        <div className="mt-2">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 mr-2 mb-2"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestPage;
