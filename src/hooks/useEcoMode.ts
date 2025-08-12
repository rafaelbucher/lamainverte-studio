// src/hooks/useEcoMode.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

export const useEcoMode = () => {
  const [isEcoMode, setIsEcoMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialisation au montage
  useEffect(() => {
    setMounted(true);
    
    // Vérifier l'état initial du mode éco
    const checkInitialEcoMode = () => {
      const hasEcoMode = document.body.classList.contains('eco-mode');
      setIsEcoMode(hasEcoMode);
    };
    
    checkInitialEcoMode();
    
    // Observer les changements de classe sur le body
    const observer = new MutationObserver(() => {
      const hasEcoMode = document.body.classList.contains('eco-mode');
      setIsEcoMode(hasEcoMode);
    });
    
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Fonction pour basculer le mode éco
  const toggleEcoMode = useCallback(() => {
    if (!mounted) return;
    
    const newEcoMode = !isEcoMode;
    
    // Mettre à jour l'état local
    setIsEcoMode(newEcoMode);
    
    // Mettre à jour la classe sur le body
    if (newEcoMode) {
      document.body.classList.add('eco-mode');
      console.log('✅ Mode éco activé via useEcoMode');
    } else {
      document.body.classList.remove('eco-mode');
      console.log('❌ Mode éco désactivé via useEcoMode');
    }
    
    // Optionnel : sauvegarder la préférence
    try {
      localStorage.setItem('eco-mode-preference', newEcoMode.toString());
    } catch (error) {
      console.warn('Impossible de sauvegarder la préférence eco-mode:', error);
    }
  }, [isEcoMode, mounted]);

  // Fonction pour définir explicitement le mode
  const setEcoMode = useCallback((enabled: boolean) => {
    if (!mounted) return;
    
    setIsEcoMode(enabled);
    
    if (enabled) {
      document.body.classList.add('eco-mode');
    } else {
      document.body.classList.remove('eco-mode');
    }
    
    try {
      localStorage.setItem('eco-mode-preference', enabled.toString());
    } catch (error) {
      console.warn('Impossible de sauvegarder la préférence eco-mode:', error);
    }
  }, [mounted]);

  // Charger la préférence sauvegardée au démarrage
  useEffect(() => {
    if (!mounted) return;
    
    try {
      const savedPreference = localStorage.getItem('eco-mode-preference');
      if (savedPreference !== null) {
        const shouldEnableEco = savedPreference === 'true';
        setEcoMode(shouldEnableEco);
      }
    } catch (error) {
      console.warn('Impossible de charger la préférence eco-mode:', error);
    }
  }, [mounted, setEcoMode]);

  return {
    isEcoMode,
    toggleEcoMode,
    setEcoMode,
    mounted
  };
};