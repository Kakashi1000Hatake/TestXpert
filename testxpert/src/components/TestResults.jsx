import React from 'react';

function TestResults({ score, total }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Your Test Results</h2>
      <p>Your score: {score} / {total}</p>
      <button className="mt-4 p-2 bg-green-500 text-white rounded-lg">
        Try Again
      </button>
    </div>
  );
}

export default TestResults;
