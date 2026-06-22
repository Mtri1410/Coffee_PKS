import React, { useEffect, useState } from 'react';

export default function Petals() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Generate 22 falling elements (leaves and flower petals)
    const types = ['jasmine', 'leaf'];
    const generated = Array.from({ length: 22 }).map((_, idx) => {
      const type = types[Math.floor(Math.random() * types.length)];
      const size = Math.random() * 12 + 8; // Size between 8px and 20px
      const left = Math.random() * 100; // Position across screen
      const delay = Math.random() * -20; // Random starting offsets so they don't fall all at once
      const duration = Math.random() * 12 + 10; // Fall duration between 10s and 22s
      const swayDuration = Math.random() * 4 + 3; // Sway duration between 3s and 7s
      const spinDuration = Math.random() * 8 + 4; // Spin duration
      
      return {
        id: idx,
        type,
        size,
        left,
        delay,
        duration,
        swayDuration,
        spinDuration
      };
    });
    setPetals(generated);
  }, []);

  return (
    <div className="petals-container" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className={`petal-item ${p.type}-petal`}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            animationName: 'fall-animation',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
        >
          {/* Inner shape element for rotation and sway */}
          <div
            className="petal-shape"
            style={{
              animationName: 'sway-spin-animation',
              animationDuration: `${p.swayDuration}s`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite'
            }}
          />
        </div>
      ))}

      <style>{`
        .petals-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1; /* Below content but above background */
          overflow: hidden;
        }

        .petal-item {
          position: absolute;
          top: -20px;
          opacity: 0;
          will-change: transform, opacity;
        }

        /* Jasmine Petal Shape (White-cream flower petal) */
        .jasmine-petal .petal-shape {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #ffffff 0%, #FFFDF9 60%, #F5EFEB 100%);
          border-radius: 50% 0 50% 50%;
          box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.03);
          border: 0.5px solid rgba(194, 159, 104, 0.15);
        }

        /* Tea Leaf Shape (Green) */
        .leaf-petal .petal-shape {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #8EA885 0%, #556F52 100%);
          border-radius: 50% 0 50% 0;
          box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.03);
        }

        /* Falling Keyframes */
        @keyframes fall-animation {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          5% {
            opacity: 0.75;
          }
          90% {
            opacity: 0.75;
          }
          100% {
            transform: translateY(105vh);
            opacity: 0;
          }
        }

        /* Swaying and Spinning Keyframes */
        @keyframes sway-spin-animation {
          0% {
            transform: translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateX(15px) rotate(90deg);
          }
          50% {
            transform: translateX(0px) rotate(180deg);
          }
          75% {
            transform: translateX(-15px) rotate(270deg);
          }
          100% {
            transform: translateX(0px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
