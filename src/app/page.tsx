import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import ProductGrid from '@/components/ProductCard/ProductGrid';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Hero />
      <ProductGrid />
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <img src="/images/logo.png" alt="AxionDesk Logo" className={styles.footerLogo} />
          <p>© 2026 AxionDesk. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
