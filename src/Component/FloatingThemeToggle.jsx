import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const FloatingThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-300"
            aria-label="Toggle Dark Mode"
        >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
    );
};

export default FloatingThemeToggle;
