import React from 'react';

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex items-center justify-between px-3">
      <h1 className="text-2xl font-bold">TestXpert</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/test" className="hover:underline">Take Test</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
