import { useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  const ref = useRef(null);

  const handleThemeToggle = async () => {
    if (
      !ref.current ||
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      toggleTheme();
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        toggleTheme();
      });
    }).ready;

    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(
      Math.max(left, right),
      Math.max(top, bottom),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 600,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button
      ref={ref}
      onClick={handleThemeToggle}
      className="theme-toggle-button"
      aria-label="Toggle dark mode"
    >
      <div className="theme-toggle">
        <svg
          className="theme-toggle__simple"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="12" />
        </svg>
      </div>
    </button>
  );
}