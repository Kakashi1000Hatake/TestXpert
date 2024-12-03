import React from 'react';
import { Link } from 'react-router-dom';

function TestCard({ subject }) {
  return (
    <Link to={`/test/${subject}`} className="p-6 bg-gray-200 hover:bg-gray-300 rounded-lg">
      <h3 className="text-xl font-semibold">{subject}</h3>
    </Link>
  );
}

export default TestCard;
