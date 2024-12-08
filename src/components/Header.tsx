import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Button } from './Button';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/SilkWork" className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">ResumeAI</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/SilkWork/builder" className="text-gray-600 hover:text-gray-900">
          Create Resume
          </Link>
        </nav>
      </div>
    </header>
  );
}