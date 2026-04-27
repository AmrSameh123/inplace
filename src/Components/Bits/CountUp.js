import React, { useEffect, useState, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 1,
  duration = 2, // Duration in seconds
  className = '',
}) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(to);
      }, delay * 1000);
    }
  }, [isInView, to, delay, motionValue]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      setCount(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref} className={className}>{count}</span>;
}
