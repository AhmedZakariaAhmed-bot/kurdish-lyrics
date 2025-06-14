
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface TextInputAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const TextInputArea: React.FC<TextInputAreaProps> = ({ value, onChange, onSubmit, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="بابەتێک، تێمایەک، یان چەند وشەیەکی سەرەتایی بۆ هۆنراوەکانت بنووسە..."
        className="w-full h-32 p-4 bg-neutral-dark/50 border-2 border-neutral-light/30 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all duration-300 ease-in-out text-neutral-light placeholder-neutral-light/50 resize-none shadow-md"
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-accent text-white font-semibold rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ms-1 me-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            لە ژێر ئامادەکردندایە...
          </>
        ) : (
          <>
            <SparklesIcon className="h-5 w-5 me-2" />
            هۆنینەوەی هۆنراوە
          </>
        )}
      </button>
    </div>
  );
};