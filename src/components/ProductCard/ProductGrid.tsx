'use client';

import React, { useMemo } from 'react';
import styles from './ProductGrid.module.css';
import SpotlightCard from '../Animations/SpotlightCard';
import { useStore } from '../StoreContext';

interface Product {
  id: number;
  name: string;
  tagline: string;
  price: string;
  image: string;
  category: string;
}

const products: Product[] = [
  // iPhone
  {
    id: 1,
    name: 'iPhone 16 Pro',
    tagline: 'Hola, Inteligencia.',
    price: 'Desde $999',
    image: '/products/iphone_16_pro.png',
    category: 'iPhone'
  },
  {
    id: 2,
    name: 'iPhone 16',
    tagline: 'Nueva cámara. Nuevos colores.',
    price: 'Desde $799',
    image: '/products/iphone_16.png',
    category: 'iPhone'
  },
  {
    id: 3,
    name: 'iPhone 15',
    tagline: 'Tan increíble como siempre.',
    price: 'Desde $699',
    image: '/products/iphone_15.png',
    category: 'iPhone'
  },
  {
    id: 4,
    name: 'iPhone SE',
    tagline: 'Mucho potencial. Mucho precio.',
    price: 'Desde $429',
    image: '/products/iphone_se.png',
    category: 'iPhone'
  },
  // Mac
  {
    id: 5,
    name: 'MacBook Air',
    tagline: 'Ligera. Potente. M3.',
    price: 'Desde $1099',
    image: '/products/mac_air.png',
    category: 'Mac'
  },
  {
    id: 6,
    name: 'Mac Pro',
    tagline: 'Pura potencia para profesionales.',
    price: 'Desde $1599',
    image: '/products/mac_pro.png',
    category: 'Mac'
  },
  {
    id: 18,
    name: 'Mac mini',
    tagline: 'Más músculo. Más ingenio.',
    price: 'Desde $599',
    image: '/products/mac_mini.png',
    category: 'Mac'
  },
  {
    id: 25,
    name: 'iMac Pro',
    tagline: 'Potencia oscura. Rendimiento brillante.',
    price: 'Desde $4999',
    image: '/products/imac_pro.webp',
    category: 'Mac'
  },
  // iPad
  {
    id: 7,
    name: 'iPad Pro',
    tagline: 'Increíblemente fino. Increíblemente potente.',
    price: 'Desde $999',
    image: '/products/ipad_pro.webp',
    category: 'iPad'
  },
  {
    id: 8,
    name: 'iPad Air',
    tagline: 'Pura frescura.',
    price: 'Desde $599',
    image: '/products/ipad_air.png',
    category: 'iPad'
  },
  {
    id: 19,
    name: 'iPad',
    tagline: 'Encantador. Dibujable. Mágico.',
    price: 'Desde $349',
    image: '/products/ipad.png',
    category: 'iPad'
  },
  {
    id: 20,
    name: 'iPad mini',
    tagline: 'Mega potencia. Tamaño mini.',
    price: 'Desde $499',
    image: '/products/ipad_mini.png',
    category: 'iPad'
  },
  // Watch
  {
    id: 9,
    name: 'Apple Watch Series 10',
    tagline: 'Más fino. Más rápido. Más inteligente.',
    price: 'Desde $399',
    image: '/products/watch_series_10.png',
    category: 'Watch'
  },
  {
    id: 10,
    name: 'Apple Watch Ultra 2',
    tagline: 'Aventura al siguiente nivel.',
    price: 'Desde $799',
    image: '/products/watch_ultra_2.png',
    category: 'Watch'
  },
  {
    id: 21,
    name: 'Apple Watch SE',
    tagline: 'Mucho que amar por mucho menos.',
    price: 'Desde $249',
    image: '/products/watch_se.png',
    category: 'Watch'
  },
  {
    id: 22,
    name: 'Watch Hermès',
    tagline: 'La unión definitiva.',
    price: 'Desde $1249',
    image: '/products/watch_hermes.png',
    category: 'Watch'
  },
  // AirPods
  {
    id: 11,
    name: 'AirPods Pro 2',
    tagline: 'Rediseñados para el sonido.',
    price: 'Desde $249',
    image: '/products/airpods_pro_2.png',
    category: 'AirPods'
  },
  {
    id: 12,
    name: 'AirPods Max',
    tagline: 'La experiencia auditiva definitiva.',
    price: 'Desde $549',
    image: '/products/airpods_max.webp',
    category: 'AirPods'
  },
  {
    id: 23,
    name: 'AirPods 4',
    tagline: 'Icónicos. Ahora con cancelación de ruido.',
    price: 'Desde $129',
    image: '/products/airpods_4.png',
    category: 'AirPods'
  },
  {
    id: 24,
    name: 'AirPods 3',
    tagline: 'Audio espacial. Pura magia.',
    price: 'Desde $169',
    image: '/products/airpods_3.png',
    category: 'AirPods'
  }
];

const ProductGrid = () => {
  const { addToCart, currentCategory } = useStore();

  const filteredProducts = useMemo(() => {
    if (currentCategory === 'Todos' || currentCategory === 'Tienda') {
      return products;
    }
    return products.filter((p) => p.category === currentCategory);
  }, [currentCategory]);

  return (
    <section className={styles.gridSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <SpotlightCard key={product.id} className={styles.productCard}>
              <div className={styles.cardContent}>
                <div className={styles.text}>
                  <h3 className={styles.name}>{product.name}</h3>
                  <p className={styles.tagline}>{product.tagline}</p>
                  <p className={styles.price}>{product.price}</p>
                </div>
                <div className={styles.imageWrapper}>
                  <img src={product.image} alt={product.name} className={styles.image} />
                </div>
                <div className={styles.actions}>
                  <button onClick={() => addToCart(product)} className={styles.buyBtn}>Comprar</button>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
