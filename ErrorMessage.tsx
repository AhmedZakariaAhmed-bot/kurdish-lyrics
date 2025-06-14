
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-500/20 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative shadow-md" role="alert">
      <strong className="font-bold">!ئۆپس </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
