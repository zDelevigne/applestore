'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProductCarousel.module.css';

interface CarouselItem {
  id: number;
  name: string;
  image: string;
  color: string;
}

const carouselItems: CarouselItem[] = [
  { id: 1, name: 'iPhone 16 Pro', image: '/products/iphone_16_pro.png', color: 'rgba(142, 142, 147, 0.2)' },
  { id: 2, name: 'MacBook Air', image: '/products/mac_air.png', color: 'rgba(106, 176, 171, 0.2)' },
  { id: 3, name: 'iPad Pro', image: '/products/ipad_pro.webp', color: 'rgba(50, 50, 50, 0.2)' },
  { id: 4, name: 'Apple Watch Ultra 2', image: '/products/watch_ultra_2.png', color: 'rgba(255, 159, 10, 0.2)' },
  { id: 5, name: 'AirPods Max', image: '/products/airpods_max.webp', color: 'rgba(0, 102, 204, 0.2)' },
];

const ProductCarousel = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = carouselItems.length - 1;
      if (next >= carouselItems.length) next = 0;
      return next;
    });
  }, []);

  const nextStep = useCallback(() => {
    paginate(1);
  }, [paginate]);

  useEffect(() => {
    const timer = setInterval(nextStep, 5000);
    return () => clearInterval(timer);
  }, [nextStep, index]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.glow} style={{ backgroundColor: carouselItems[index].color }} />
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={carouselItems[index].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 },
            rotateY: { duration: 0.4 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className={styles.slide}
        >
          <img
            src={carouselItems[index].image}
            alt={carouselItems[index].name}
            className={styles.image}
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      <div className={styles.indicators}>
        {carouselItems.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${idx === index ? styles.activeDot : ''}`}
            onClick={() => {
              setDirection(idx > index ? 1 : -1);
              setIndex(idx);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
