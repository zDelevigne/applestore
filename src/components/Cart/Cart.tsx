'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import styles from './Cart.module.css';
import { useStore } from '../StoreContext';

const Cart = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className={styles.overlay}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={styles.sidebar}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>Bolsa</h2>
              <button onClick={() => setIsCartOpen(false)} className={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.content}>
              {cartItems.length === 0 ? (
                <div className={styles.empty}>
                  <p>Tu bolsa está vacía.</p>
                </div>
              ) : (
                <div className={styles.items}>
                  {cartItems.map((item, index) => (
                    <div key={index} className={styles.item}>
                      <img src={item.image} alt={item.name} className={styles.itemImage} />
                      <div className={styles.itemInfo}>
                        <h3>{item.name}</h3>
                        <p>{item.price}</p>
                        <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.total}>
                  <span>Total</span>
                  <span>$ {cartItems.reduce((acc, item) => acc + parseInt(item.price.replace(/[^0-9]/g, '')), 0)}</span>
                </div>
                <button className={styles.checkoutBtn}>Revisar Bolsa</button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
