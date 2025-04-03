import React, { useState, useEffect } from 'react';

function CountUp({ from = 0, to = 100, duration = 2, className = '', onEnd }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime = null;
    let animationFrameId = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);
      
      // Apply easeOutCubic function: t => 1 - Math.pow(1 - t, 3)
      const easeOutProgress = 1 - Math.pow(1 - Math.min(progress, 1), 3);

      if (progress < 1) {
        const currentCount = Math.floor(from + (to - from) * easeOutProgress);
        setCount(currentCount);
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(to);
        if (onEnd) onEnd();
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [from, to, duration, onEnd]);

  return (
    <span className={className}>
      {count}
    </span>
  );
}

export default CountUp;