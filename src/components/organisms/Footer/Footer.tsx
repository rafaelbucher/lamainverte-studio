// src/components/organisms/Footer/Footer.tsx - Version corrigée avec useEcoMode
'use client';

import { usePathname } from 'next/navigation';
import { useEcoMode } from '@/hooks/useEcoMode';

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
  
  // Utilisation du hook centralisé
  const { isEcoMode, toggleEcoMode, mounted } = useEcoMode();

  // Ne pas rendre avant le montage pour éviter l'hydratation mismatch
  if (!mounted) {
    return null;
  }

  // Styles du Footer
  const footerStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'var(--color-bg-primary)',
    borderTop: '1px solid var(--color-border-light)',
    padding: '32px',
    minHeight: '120px',
    fontFamily: 'var(--font-primary)',
    transition: 'all var(--transition-normal)',
    ...style
  };

  // Container principal
  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  // Composant EcoSwitch amélioré
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
        color: 'var(--color-accent)',
        transition: 'color var(--transition-normal)'
      }}>
        {isEcoMode ? 'mode éco' : 'mode standard'}
      </span>
      
      {/* Bouton switch */}
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log('🖱️ Click sur EcoSwitch Footer');
          toggleEcoMode();
        }}
        style={{
          display: 'flex',
          padding: '0',
          border: '2px solid var(--color-accent)',
          backgroundColor: 'var(--color-bg-primary)',
          cursor: 'pointer',
          outline: 'none',
          borderRadius: '2px',
          transition: 'all var(--transition-normal)',
          position: 'relative'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = '2px solid var(--color-focus)';
          e.currentTarget.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
        }}
        aria-label={`Basculer vers le ${isEcoMode ? 'mode standard' : 'mode éco'}`}
        title={`Passer au ${isEcoMode ? 'mode standard (coloré)' : 'mode éco (sobre)'}`}
        type="button"
      >
        {/* Carré gauche - Mode standard */}
        <div style={{
          width: '20px',
          height: '20px',
          backgroundColor: isEcoMode ? 'var(--color-white)' : 'var(--color-primary)',
          border: `1px solid ${isEcoMode ? 'var(--color-accent)' : 'var(--color-primary)'}`,
          transition: 'all var(--transition-normal)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Indicateur visuel pour le mode standard */}
          {!isEcoMode && (
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--color-white)',
              borderRadius: '50%'
            }} />
          )}
        </div>
        
        {/* Carré droite - Mode éco */}
        <div style={{
          width: '20px',
          height: '20px',
          backgroundColor: isEcoMode ? 'var(--color-accent)' : 'var(--color-white)',
          border: `1px solid var(--color-accent)`,
          transition: 'all var(--transition-normal)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Indicateur visuel pour le mode éco */}
          {isEcoMode && (
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--color-white)',
              borderRadius: '50%'
            }} />
          )}
        </div>
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
                color: 'var(--color-text-primary)',
                margin: '0',
                maxWidth: '600px',
                transition: 'color var(--transition-normal)'
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
              color: 'var(--color-text-secondary)',
              margin: '0',
              fontStyle: 'italic',
              transition: 'color var(--transition-normal)'
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