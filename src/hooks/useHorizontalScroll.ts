import { useEffect, useRef } from 'react';

interface ScrollState {
  targetScrollLeft: number;
  currentScrollLeft: number;
  distortionStrength: number;
}

export function useHorizontalScroll(containerRef: React.RefObject<HTMLDivElement | null>) {
  const scrollState = useRef<ScrollState>({
    targetScrollLeft: 0,
    currentScrollLeft: 0,
    distortionStrength: 0,
  });

  const maxDistortion = 0.3;
  const scrollEase = 0.05;
  const distortionEase = 0.08;

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const onScroll = (event: WheelEvent) => {
      event.preventDefault();
      const delta = Math.sign(event.deltaY);
      scrollState.current.targetScrollLeft += delta * 30;

      // Clamp target scroll position
      scrollState.current.targetScrollLeft = Math.max(
        0,
        Math.min(
          scrollState.current.targetScrollLeft,
          container.scrollWidth - container.clientWidth
        )
      );
    };

    const animateScroll = () => {
      const { targetScrollLeft, currentScrollLeft } = scrollState.current;
      const scrollDiff = targetScrollLeft - currentScrollLeft;

      if (Math.abs(scrollDiff) > 0.1) {
        scrollState.current.currentScrollLeft += scrollDiff * scrollEase;
        container.scrollLeft = scrollState.current.currentScrollLeft;

        // Calculate distortion based on scroll speed
        scrollState.current.distortionStrength =
          Math.sign(scrollDiff) *
          maxDistortion *
          (Math.abs(scrollDiff) / (container.scrollWidth * 0.1));
      } else {
        scrollState.current.currentScrollLeft = targetScrollLeft;
        // Ease distortion back to zero
        scrollState.current.distortionStrength +=
          (0 - scrollState.current.distortionStrength) * distortionEase;
      }

      requestAnimationFrame(animateScroll);
    };

    container.addEventListener('wheel', onScroll, { passive: false });
    const animationFrame = requestAnimationFrame(animateScroll);

    return () => {
      container.removeEventListener('wheel', onScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, [containerRef]);

  return {
    getDistortionStrength: () => scrollState.current.distortionStrength,
  };
}