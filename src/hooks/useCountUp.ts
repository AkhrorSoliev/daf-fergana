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

    const element = countRef.current;

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window && element) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasStartedRef.current) {
            hasStartedRef.current = true;
            setIsVisible(true);
            if (element) observer.unobserve(element);
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0,
        }
      );

      observer.observe(element);
      return () => observer.disconnect();
    }

    const checkInView = () => {
      if (!countRef.current || hasStartedRef.current) return;
      const rect = countRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight || document.documentElement.clientHeight;
      const viewWidth = window.innerWidth || document.documentElement.clientWidth;

      const verticallyInView = rect.top < viewHeight && rect.bottom > 0;
      const horizontallyInView = rect.left < viewWidth && rect.right > 0;

      if (verticallyInView && horizontallyInView) {
        hasStartedRef.current = true;
        setIsVisible(true);
        window.removeEventListener('scroll', checkInView, { passive: true } as any);
        window.removeEventListener('resize', checkInView);
        window.removeEventListener('load', checkInView);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', checkInView, { passive: true } as any);
      window.addEventListener('resize', checkInView);
      window.addEventListener('load', checkInView);
      checkInView();

      return () => {
        window.removeEventListener('scroll', checkInView, { passive: true } as any);
        window.removeEventListener('resize', checkInView);
        window.removeEventListener('load', checkInView);
      };
    }
  }, []);

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
