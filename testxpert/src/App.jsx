import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import TestCard from './components/TestCard';
import TestPage from './components/TestPage';
import TestResults from './components/TestResults';
import './index.css'

function App() {
  const [score, setScore] = useState(0);
  const totalQuestions = 5;

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="p-4">
              <h2 className="text-2xl font-bold">Select a Subject</h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <TestCard subject="General Knowledge" />
                <TestCard subject="Reasoning" />
                <TestCard subject="Mathematics" />
                <TestCard subject="English" />
              </div>
            </div>
          }
        />
        <Route
          path="/test/:subject"
          element={<TestPage />}
        />
        <Route
          path="/results"
          element={<TestResults score={score} total={totalQuestions} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
