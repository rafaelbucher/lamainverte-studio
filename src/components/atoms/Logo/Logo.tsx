// src/components/atoms/Logo/Logo.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/app/assets/logo.svg';
import logoEco from '@/app/assets/logo-eco.svg';

export interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'auto';
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  showHover?: boolean;
  onClick?: () => void;
  title?: string;
}

// Configuration des tailles
const sizeConfig = {
  small: { width: '120px', maxWidth: '120px' },
  medium: { width: '180px', maxWidth: '180px' },
  large: { width: '240px', maxWidth: '240px' },
  auto: { width: '100%', maxWidth: '100%' }
};

const Logo: React.FC<LogoProps> = ({
  size = 'medium',
  href,
  className = '',
  style,
  priority = false,
  showHover = true,
  onClick,
  title
}) => {
  const [isEcoMode, setIsEcoMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Vérifier le mode éco initial
    const checkEcoMode = () => {
      const hasEcoMode = document.body.classList.contains('eco-mode');
      setIsEcoMode(hasEcoMode);
    };
    
    checkEcoMode();
    
    // Observer les changements de classe sur body
    const observer = new MutationObserver(() => {
      checkEcoMode();
    });
    
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    // Fallback pendant l'hydratation
    return (
      <div 
        style={{ 
          ...sizeConfig[size], 
          height: 'auto',
          backgroundColor: 'transparent',
          ...style 
        }}
        className={className}
      />
    );
  }

  // Choisir le bon logo selon le mode
  const currentLogo = isEcoMode ? logoEco : logo;
  const logoAlt = isEcoMode 
    ? 'Logo La main verte Studio - Mode Éco' 
    : 'Logo La main verte Studio - Mode Standard';
  
  const logoTitle = title || (isEcoMode 
    ? 'La main verte Studio - Mode Éco activé'
    : 'La main verte Studio - Mode Standard'
  );

  // Styles de base
  const baseStyle: React.CSSProperties = {
    display: 'block',
    transition: showHover ? 'transform var(--transition-normal)' : 'none',
    cursor: (href || onClick) ? 'pointer' : 'default',
    ...sizeConfig[size],
    height: 'auto',
    ...style
  };

  // Gestionnaires d'événements pour l'hover
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (showHover && (href || onClick)) {
      const target = e.currentTarget as HTMLElement;
      target.style.transform = 'scale(1.05)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (showHover && (href || onClick)) {
      const target = e.currentTarget as HTMLElement;
      target.style.transform = 'scale(1)';
    }
  };

  // Contenu du logo
  const logoContent = (
    <Image 
      src={currentLogo}
      alt={logoAlt}
      style={{ 
        width: '100%', 
        height: 'auto',
        display: 'block'
      }}
      priority={priority}
      title={logoTitle}
    />
  );

  // Si on a un href, wrapper dans un Link
  if (href) {
    return (
      <Link 
        href={href}
        style={baseStyle}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        title={logoTitle}
      >
        {logoContent}
      </Link>
    );
  }

  // Si on a juste un onClick, wrapper dans un button
  if (onClick) {
    return (
      <button
        onClick={onClick}
        style={{
          ...baseStyle,
          border: 'none',
          background: 'transparent',
          padding: 0,
          margin: 0
        }}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title={logoTitle}
        type="button"
      >
        {logoContent}
      </button>
    );
  }

  // Sinon, juste une div
  return (
    <div 
      style={baseStyle}
      className={className}
      title={logoTitle}
    >
      {logoContent}
    </div>
  );
};

export default Logo;