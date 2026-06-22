import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, animation = 'up', delay = 0, duration = 800 }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once it's visible, we can unobserve
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before it fully enters viewport
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const getAnimationClass = () => {
    switch (animation) {
      case 'up': return 'reveal-up';
      case 'down': return 'reveal-down';
      case 'left': return 'reveal-left';
      case 'right': return 'reveal-right';
      case 'scale': return 'reveal-scale';
      case 'fade': return 'reveal-fade';
      default: return 'reveal-up';
    }
  };

  const style = {
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`
  };

  return (
    <div
      ref={elementRef}
      className={`reveal-base ${getAnimationClass()} ${isVisible ? 'revealed' : ''}`}
      style={style}
    >
      {children}
    </div>
  );
}
