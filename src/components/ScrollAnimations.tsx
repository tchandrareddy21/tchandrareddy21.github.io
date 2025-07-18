import React, { useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in-up' | 'scale-in' | 'fade-in' | 'slide-in-left' | 'slide-in-right';
  delay?: number;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  animation = 'fade-in-up',
  delay = 0
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-visible');
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`scroll-animation ${animation} ${className}`}
      style={{ '--delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

// Add these styles to your CSS
const styles = `
  .scroll-animation {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
  }

  .scroll-animation.animate-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .scroll-animation.scale-in {
    transform: scale(0.9);
  }

  .scroll-animation.scale-in.animate-visible {
    transform: scale(1);
  }

  .scroll-animation.slide-in-left {
    transform: translateX(-30px);
  }

  .scroll-animation.slide-in-left.animate-visible {
    transform: translateX(0);
  }

  .scroll-animation.slide-in-right {
    transform: translateX(30px);
  }

  .scroll-animation.slide-in-right.animate-visible {
    transform: translateX(0);
  }
`;

export default ScrollAnimation;