'use client';

import { motion, Variants } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
}

export default function SplitText({
  text = '',
  className = '',
  delay = 0.05,
}: SplitTextProps) {
  const words = text.split(' ');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' }}>
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={itemVariants}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
}
