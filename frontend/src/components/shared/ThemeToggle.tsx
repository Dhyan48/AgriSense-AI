import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border-stone)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[#285442] dark:hover:border-[#D6F36A] transition-colors cursor-pointer"
    >
      {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-[#D6F36A]" />}
    </button>
  );
};