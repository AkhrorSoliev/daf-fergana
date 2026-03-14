'use client';

import { useState, useEffect, useRef } from 'react';

interface UseCountUpProps {
  end: number;
  duration?: number;
  startOnMount?: boolean;
}

export function useCountUp({ end, duration = 2000, startOnMount = false }: UseCountUpProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(startOnMount);
  const countRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (startOnMount) {
      hasStartedRef.current = true;
      setIsVisible(true);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let frameId: number | null = null;

    const setup = () => {
      const element = countRef.current;
      if (!element || hasStartedRef.current) return;

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasStartedRef.current) {
            hasStartedRef.current = true;
            setIsVisible(true);
            observer?.disconnect();
          }
        },
        { root: null, rootMargin: '0px', threshold: 0.1 }
      );

      observer.observe(element);
    };

    // Defer setup to ensure ref is attached after render
    frameId = requestAnimationFrame(setup);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      observer?.disconnect();
    };
  }, [startOnMount]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  return { count, countRef };
}
