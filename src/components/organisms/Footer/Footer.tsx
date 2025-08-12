// src/components/organisms/Footer/Footer.tsx - Version avec switch intégré ultra-simple
'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
  showEcoSwitch?: boolean;
  ecoSwitchPosition?: 'left' | 'right' | 'center';
  variant?: 'default' | 'minimal' | 'extended';
}

const Footer: React.FC<FooterProps> = ({
  className = '',
  style,
  showEcoSwitch = true,
  ecoSwitchPosition = 'right',
  variant = 'default'
}) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  // État du mode éco - géré directement dans le Footer
  const [isEcoMode, setIsEcoMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialisation
  useEffect(() => {
    setMounted(true);
    // Vérifier l'état initial
    const hasEcoMode = document.body.classList.contains('eco-mode');
    setIsEcoMode(hasEcoMode);
  }, []);

  // Fonction pour basculer le mode éco
  const toggleEcoMode = () => {
    const newEcoMode = !isEcoMode;
    setIsEcoMode(newEcoMode);
    
    if (newEcoMode) {
      document.body.classList.add('eco-mode');
      console.log('✅ Mode éco activé');
    } else {
      document.body.classList.remove('eco-mode');
      console.log('❌ Mode éco désactivé');
    }
  };

  // Ne pas rendre avant le montage
  if (!mounted) {
    return null;
  }

  // Styles du Footer
  const footerStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #E5E5E5',
    padding: '32px',
    minHeight: '120px',
    fontFamily: 'Arial, sans-serif',
    ...style
  };

  // Container principal
  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  // Bouton eco switch ultra-simple
  const EcoSwitchButton = () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      userSelect: 'none'
    }}>
      {/* Label */}
      <span style={{
        fontSize: '16px',
        fontStyle: 'italic',
        color: '#4B4B4B'
      }}>
        {isEcoMode ? 'mode éco' : 'mode standard'}
      </span>
      
      {/* Bouton switch */}
      <button
        onClick={toggleEcoMode}
        style={{
          display: 'flex',
          padding: '0',
          border: '2px solid #4B4B4B',
          backgroundColor: '#FFFFFF',
          cursor: 'pointer',
          outline: 'none',
          borderRadius: '2px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        aria-label={`Basculer vers le ${isEcoMode ? 'mode standard' : 'mode éco'}`}
        type="button"
      >
        {/* Carré gauche - Mode standard */}
        <div style={{
          width: '20px',
          height: '20px',
          backgroundColor: isEcoMode ? '#4B4B4B' : '#FFFFFF',
          transition: 'background-color 0.2s ease'
        }} />
        
        {/* Carré droite - Mode éco */}
        <div style={{
          width: '20px',
          height: '20px',
          backgroundColor: isEcoMode ? '#FFFFFF' : '#3EDC81',
          transition: 'background-color 0.2s ease'
        }} />
      </button>
    </div>
  );

  // Footer pour la page d'accueil
  if (isHomePage) {
    return (
      <footer className={className} style={footerStyle}>
        <div style={containerStyle}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            {/* Slogan principal */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h2 style={{
                fontSize: '2.75rem',
                fontWeight: 400,
                lineHeight: 1.2,
                color: '#111111',
                margin: '0',
                maxWidth: '600px'
              }}>
                L&apos;expertise numérique,<br/> engagée et inclusive
              </h2>
            </div>

            {/* Bouton eco switch */}
            {showEcoSwitch && <EcoSwitchButton />}
          </div>
        </div>

        {/* CSS responsive */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 768px) {
              .${className} h2 {
                font-size: 1.875rem !important;
                text-align: center !important;
                margin-bottom: 20px !important;
              }
              .${className} > div > div {
                flex-direction: column !important;
                align-items: center !important;
                gap: 20px !important;
              }
              .${className} > div > div > div:first-child {
                min-width: auto !important;
              }
            }
          `
        }} />
      </footer>
    );
  }

  // Footer pour les pages internes
  return (
    <footer className={className} style={footerStyle}>
      <div style={containerStyle}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          {/* Copyright */}
          <div style={{ flex: 1 }}>
            <p style={{
              fontSize: '16px',
              color: '#4B4B4B',
              margin: '0',
              fontStyle: 'italic'
            }}>
              © 2024 La main verte Studio
            </p>
          </div>

          {/* Bouton eco switch */}
          {showEcoSwitch && <EcoSwitchButton />}
        </div>
      </div>

      {/* CSS responsive */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (max-width: 768px) {
            .${className} > div > div {
              flex-direction: column !important;
              align-items: center !important;
              text-align: center !important;
              gap: 16px !important;
            }
          }
        `
      }} />
    </footer>
  );
};

export default Footer;