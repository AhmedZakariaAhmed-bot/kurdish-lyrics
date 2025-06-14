
import React from 'react';

interface LyricDisplayProps {
  lyrics: string;
}

export const LyricDisplay: React.FC<LyricDisplayProps> = ({ lyrics }) => {
  return (
    <div className="bg-neutral-dark/50 border border-neutral-light/20 p-6 rounded-lg shadow-lg max-h-[50vh] overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4 text-brand-primary">هۆنراوەی نووسراو</h2>
      <pre className="whitespace-pre-wrap text-neutral-light/90 text-sm md:text-base leading-relaxed font-sans">
        {lyrics}
      </pre>
    </div>
  );
};