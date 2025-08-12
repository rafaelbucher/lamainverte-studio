// src/app/components/EcoModeSwitch/EcoModeSwitch.tsx
'use client';
import React, { useState, useEffect } from 'react';
import styles from './EcoModeSwitch.module.css';

export interface EcoModeSwitchProps {
  className?: string;
  position?: 'fixed' | 'relative';
}

function EcoModeSwitch({ 
  className = '', 
  position = 'fixed' 
}: EcoModeSwitchProps) {
  const [isEcoMode, setIsEcoMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Vérifier si le mode éco est déjà activé au chargement
    const hasEcoMode = document.body.classList.contains('eco-mode');
    setIsEcoMode(hasEcoMode);
  }, []);

  const toggleEcoMode = () => {
    const newEcoMode = !isEcoMode;
    setIsEcoMode(newEcoMode);
    
    if (newEcoMode) {
      document.body.classList.add('eco-mode');
    } else {
      document.body.classList.remove('eco-mode');
    }
  };

  if (!mounted) {
    return null;
  }

  const positionClass = position === 'fixed' ? styles.fixed : styles.relative;

  return (
    <div className={`${styles.container} ${positionClass} ${className}`}>
      {/* Label du mode actif à gauche */}
      <span className={styles.modeLabel}>
        {isEcoMode ? 'éco' : 'standard'}
      </span>
      
      {/* Switch avec deux cercles */}
      <button
        onClick={toggleEcoMode}
        className={styles.switch}
        aria-label={`Basculer vers le ${isEcoMode ? 'mode standard' : 'mode éco'}`}
        title={`Passer au ${isEcoMode ? 'mode standard (coloré)' : 'mode éco (sobre)'}`}
      >
        {/* Cercle mode standard */}
        <div className={`${styles.circle} ${styles.circleStandard} ${!isEcoMode ? styles.circleStandardActive : ''}`} />
        
        {/* Cercle mode éco */}
        <div className={`${styles.circle} ${styles.circleEco} ${isEcoMode ? styles.circleEcoActive : ''}`} />
      </button>
    </div>
  );
}

// Export par défaut explicite
export default EcoModeSwitch;