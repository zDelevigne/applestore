'use client';

import styles from './Hero.module.css';
import SplitText from '../Animations/SplitText';
import ProductCarousel from './ProductCarousel';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.subheadline}>Calidad Premium</h2>
          <SplitText
            text="Axis Store"
            className={styles.headline}
            delay={0.05}
          />
          <p className={styles.description}>
            Los mejores equipos Apple con 1 año de garantía y accesorios de regalo incluidos.
          </p>
          <div className={styles.cta}>
            <button className={styles.primaryBtn}>Ver Catálogo</button>
            <button className={styles.secondaryBtn}>Promociones</button>
          </div>
        </div>
        
        <div className={styles.imageContainer}>
          <ProductCarousel />
        </div>
      </div>
    </section>
  );
};

export default Hero;
