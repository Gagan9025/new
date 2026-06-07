import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all duration-300 active:scale-90"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-amber-400 hover:rotate-45 transition-transform duration-500" />
      ) : (
        <Moon className="h-5 w-5 text-indigo-600 hover:-rotate-12 transition-transform duration-500" />
      )}
    </button>
  );
};
