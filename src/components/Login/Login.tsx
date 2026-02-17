'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './Login.module.css';
import { useStore } from '../StoreContext';
import React, { useState } from 'react';

const Login = () => {
  const { isLoginOpen, setIsLoginOpen } = useStore();
  const [isRegister, setIsRegister] = useState(false);

  return (
    <AnimatePresence>
      {isLoginOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLoginOpen(false)}
            className={styles.overlay}
          />
          <div className={styles.modalContainer}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={styles.modal}
            >
              <button onClick={() => setIsLoginOpen(false)} className={styles.closeBtn}>
                <X size={24} />
              </button>
              
              <div className={styles.content}>
                <div className={styles.logoContainer}>
                  <img src="/images/logo.png" alt="Axis Store Logo" className={styles.logo} />
                </div>
                <h2 className={styles.title}>
                  {isRegister ? 'Crea tu Axis Account' : 'Inicia sesión en Axis Store'}
                </h2>
                <p className={styles.subtitle}>
                  {isRegister 
                    ? 'Únete a nuestra comunidad y disfruta de beneficios exclusivos.' 
                    : 'Gestiona tus pedidos y accede a soporte premium.'}
                </p>
                
                <div className={styles.form}>
                  {isRegister && <input type="text" placeholder="Nombre completo" className={styles.input} />}
                  <input type="email" placeholder="Correo electrónico" className={styles.input} />
                  <input type="password" placeholder="Contraseña" className={styles.input} />
                  {isRegister && <input type="password" placeholder="Confirmar contraseña" className={styles.input} />}
                  <button className={styles.submitBtn}>
                    {isRegister ? 'Registrarse' : 'Iniciar sesión'}
                  </button>
                </div>
                
                <div className={styles.links}>
                  {!isRegister && <a href="#" className={styles.forgot}>¿Olvidaste tu contraseña?</a>}
                  <button 
                    onClick={() => setIsRegister(!isRegister)} 
                    className={styles.toggleBtn}
                  >
                    {isRegister 
                      ? '¿Ya tienes una cuenta? Inicia sesión' 
                      : '¿No tienes una Axis Account? Regístrate ahora'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Login;
