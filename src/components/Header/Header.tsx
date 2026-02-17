'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, User, Menu, Apple, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';
import { useStore } from '../StoreContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsCartOpen, setIsLoginOpen, cartItems, setCategory, currentCategory } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Tienda', value: 'Todos' },
    { name: 'Mac', value: 'Mac' },
    { name: 'iPad', value: 'iPad' },
    { name: 'iPhone', value: 'iPhone' },
    { name: 'Watch', value: 'Watch' },
    { name: 'AirPods', value: 'AirPods' },
    { name: 'Soporte', value: 'Support' }
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleCategorySelect = (category: string) => {
    setCategory(category);
    setIsMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo} onClick={() => setCategory('Todos')}>
            <img src="/images/logo.png" alt="Logo" className={styles.headerLogo} />
            <span className={styles.logoText}>Axis Store</span>
          </Link>
          
          <div className={styles.links}>
            {navItems.map((item) => (
              <button 
                key={item.name} 
                onClick={() => setCategory(item.value)}
                className={`${styles.navLink} ${currentCategory === item.value ? styles.active : ''}`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className={styles.actions}>
            <button aria-label="Buscar"><Search size={18} /></button>
            <button onClick={() => setIsCartOpen(true)} className={styles.cartBtn} aria-label="Carrito">
              <ShoppingBag size={18} />
              {cartItems.length > 0 && <span className={styles.badge}>{cartItems.length}</span>}
            </button>
            <button onClick={() => setIsLoginOpen(true)} aria-label="Perfil"><User size={18} /></button>
          </div>

          <button 
            className={styles.mobileMenu} 
            aria-label="Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className={styles.mobileOverlay}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className={styles.mobileLinks}>
              {navItems.map((item) => (
                <button 
                  key={item.name} 
                  onClick={() => handleCategorySelect(item.value)}
                  className={`${styles.mobileNavLink} ${currentCategory === item.value ? styles.mobileActive : ''}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
