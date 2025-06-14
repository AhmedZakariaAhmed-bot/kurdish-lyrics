
import React, { useState, useCallback } from 'react';
import { TextInputArea } from './components/TextInputArea';
import { LyricDisplay } from './components/LyricDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { generateLyricsFromText } from './services/geminiService';
import { MusicNoteIcon } from './components/icons/MusicNoteIcon';
import { SparklesIcon } from './components/icons/SparklesIcon';

interface LanguageOption {
  value: string;
  label: string;
  apiValue: string;
}

const languageOptions: LanguageOption[] = [
  { value: 'ku-sor', label: 'کوردی سۆرانی', apiValue: 'Kurdish (Sorani)' },
  { value: 'ku-kur', label: 'کوردی کرمانجی', apiValue: 'Kurdish (Kurmanji)' },
  { value: 'en', label: 'ئینگلیزی', apiValue: 'English' },
  { value: 'ar', label: 'عەرەبی', apiValue: 'Arabic' },
  { value: 'fa', label: 'فارسی', apiValue: 'Persian' },
  { value: 'tr', label: 'تورکی', apiValue: 'Turkish' },
];

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [generatedLyrics, setGeneratedLyrics] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(languageOptions[0].value);

  const handleSubmit = useCallback(async () => {
    if (!inputText.trim()) {
      setError('تکایە بابەتێک یان چەند وشەیەک بنووسە بۆ هۆنینەوەی هۆنراوە.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedLyrics(null);

    try {
      const currentLanguageOption = languageOptions.find(lang => lang.value === selectedLanguage);
      if (!currentLanguageOption) {
        throw new Error("زمانی هەڵبژێردراو نەدۆزرایەوە.");
      }
      const lyrics = await generateLyricsFromText(inputText, currentLanguageOption.apiValue);
      setGeneratedLyrics(lyrics);
    } catch (err) {
      if (err instanceof Error) {
        setError(`هۆنینەوەی هۆنراوە سەرکەوتوو نەبوو: ${err.message}.`);
      } else {
        setError('هەڵەیەکی نەناسراو ڕوویدا لە کاتی هۆنینەوەی هۆنراوەدا.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, selectedLanguage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-dark via-purple-900 to-blue-900 text-neutral-light flex flex-col items-center justify-center p-4 selection:bg-brand-accent selection:text-white">
      <main className="container mx-auto max-w-2xl w-full bg-neutral-dark/70 backdrop-blur-lg shadow-2xl rounded-xl p-6 md:p-10 animate-fade-in">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-2">
            <MusicNoteIcon className="h-10 w-10 text-brand-primary" />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary">
              دروستکەری هۆنراوەی زیرەک
            </h1>
            <SparklesIcon className="h-10 w-10 text-brand-accent" />
          </div>
          <p className="text-lg text-neutral-light/80">
            جوانترین هۆنراوەکان لە بیرۆکەکانتەوە بهۆنەوە بە زمانی دڵخوازی خۆت.
          </p>
        </header>

        <div className="mb-6">
          <label htmlFor="language-select" className="block text-sm font-medium text-neutral-light/90 mb-1">
            زمانی هۆنراوە هەڵبژێرە:
          </label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full p-2.5 bg-neutral-dark/60 border border-neutral-light/30 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none text-neutral-light transition-colors duration-200"
            aria-label="زمانی هۆنراوە هەڵبژێرە"
          >
            {languageOptions.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <TextInputArea
          value={inputText}
          onChange={setInputText}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {isLoading && (
          <div className="mt-8 flex justify-center">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div className="mt-6 animate-slide-up">
            <ErrorMessage message={error} />
          </div>
        )}

        {generatedLyrics && !isLoading && (
          <div className="mt-8 animate-slide-up">
            <LyricDisplay lyrics={generatedLyrics} />
          </div>
        )}
        
        <footer className="mt-12 text-center text-sm text-neutral-light/60">
          <p>created by ahmed rawandzy</p>
        </footer>
      </main>
    </div>
  );
};

export default App;