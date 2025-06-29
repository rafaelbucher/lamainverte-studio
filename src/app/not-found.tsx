// src/app/page.tsx - Avec exemples de titres pour tester le mode éco
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/organisms/Navigation/Navigation';
import logo from './assets/logo.svg';
import logoEco from './assets/logo-eco.svg';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isEcoMode, setIsEcoMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  const heroStyle: React.CSSProperties = {
    height: 'calc(100vh - 80px)',
    minHeight: '400px',
    maxHeight: 'calc(100vh - 160px)',
    marginBottom: 'var(--space-20)',
    paddingBottom: 'var(--space-20)',
    borderBottom: `1px solid var(--color-border-light)`,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-primary)',
    fontWeight: 'var(--font-weight-normal)',
    fontSize: 'var(--font-size-5xl)',
    color: 'var(--color-text-primary)',
    margin: 'var(--space-8) 0',
    lineHeight: 'var(--line-height-tight)'
  };

  // Choisir le bon logo selon le mode
  const currentLogo = isEcoMode ? logoEco : logo;
  const logoAlt = isEcoMode ? 'Logo La main verte Studio - Mode Éco' : 'Logo La main verte Studio';

  // Logique pour le texte du switch
  const getDisplayText = () => {
    if (isHovered) {
      return isEcoMode ? 'standard' : 'éco';
    }
    return isEcoMode ? 'éco' : 'standard';
  };

  // Styles du switch intégrés
  const switchContainerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 'var(--space-8)',
    right: 'var(--space-10)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    zIndex: 1700
  };

  const switchLabelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-primary)',
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-normal)',
    color: 'var(--color-accent)',
    whiteSpace: 'nowrap'
  };

  const switchButtonStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--space-2)',
    padding: 0,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'all var(--transition-normal)',
    outline: 'none'
  };

  // Style pour carré BLANC avec bordure noire
  const squareWhiteBorder: React.CSSProperties = {
    width: '18px',
    height: '18px',
    borderRadius: 0,
    border: '2px solid var(--color-accent)',
    transition: 'all var(--transition-normal)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'var(--color-white)'
  };

  // Style pour carré NOIR rempli
  const squareBlackFilled: React.CSSProperties = {
    width: '18px',
    height: '18px',
    borderRadius: 0,
    border: '2px solid var(--color-accent)',
    transition: 'all var(--transition-normal)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'var(--color-accent)'
  };

  // Style pour carré VERT rempli
  const squareGreenFilled: React.CSSProperties = {
    width: '18px',
    height: '18px',
    borderRadius: 0,
    border: '2px solid var(--color-primary)',
    transition: 'all var(--transition-normal)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'var(--color-primary)'
  };

  return (
    <div className="w-full px-8 relative bg-primary text-primary font-primary min-h-screen flex flex-col">
      {/* Hero Section */}
      <section style={heroStyle}>
        {/* Header with title - Utilise un h1 qui changera en mode éco */}
        <header style={{ width: '100%' }}>
          <h1 style={titleStyle}>
            cultivons un web inclusif et responsable…<br />
            pour une croissance durable
          </h1>
        </header>

        {/* Navigation - Composant externe */}
        <Navigation />

        {/* Logo - Aligné à gauche */}
        <div style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start'
        }}>
          <div style={{ maxWidth: '960px', width: '100%' }}>
            <Image 
              src={currentLogo}
              alt={logoAlt}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Section de démonstration des titres */}
      <section style={{ marginBottom: 'var(--space-20)' }}>
        <div style={{ maxWidth: '800px' }}>
          <h2 style={{ 
            fontSize: 'var(--font-size-3xl)', 
            marginBottom: 'var(--space-6)',
            fontFamily: 'var(--font-primary)',
            fontWeight: 'var(--font-weight-normal)'
          }}>
            Nos services responsables
          </h2>
          
          <h3 style={{ 
            fontSize: 'var(--font-size-2xl)', 
            marginBottom: 'var(--space-4)',
            fontFamily: 'var(--font-primary)',
            fontWeight: 'var(--font-weight-normal)'
          }}>
            Éco-conception web
          </h3>
          
          <p style={{ 
            marginBottom: 'var(--space-6)',
            fontSize: 'var(--font-size-lg)',
            lineHeight: 'var(--line-height-relaxed)',
            color: 'var(--color-text-secondary)'
          }}>
            Nous développons des sites web performants et respectueux de l'environnement.
          </p>

          <h3 style={{ 
            fontSize: 'var(--font-size-2xl)', 
            marginBottom: 'var(--space-4)',
            fontFamily: 'var(--font-primary)',
            fontWeight: 'var(--font-weight-normal)'
          }}>
            Accessibilité universelle
          </h3>
          
          <p style={{ 
            marginBottom: 'var(--space-8)',
            fontSize: 'var(--font-size-lg)',
            lineHeight: 'var(--line-height-relaxed)',
            color: 'var(--color-text-secondary)'
          }}>
            Un web accessible à tous, conforme aux standards RGAA et WCAG.
          </p>

          <h4 style={{ 
            fontSize: 'var(--font-size-xl)', 
            marginBottom: 'var(--space-3)',
            fontFamily: 'var(--font-primary)',
            fontWeight: 'var(--font-weight-medium)'
          }}>
            Pourquoi choisir l'éco-conception ?
          </h4>

          <h5 style={{ 
            fontSize: 'var(--font-size-lg)', 
            marginBottom: 'var(--space-2)',
            fontFamily: 'var(--font-primary)',
            fontWeight: 'var(--font-weight-medium)'
          }}>
            Impact environnemental réduit
          </h5>

          <h6 style={{ 
            fontSize: 'var(--font-size-base)', 
            marginBottom: 'var(--space-4)',
            fontFamily: 'var(--font-primary)',
            fontWeight: 'var(--font-weight-medium)'
          }}>
            Des sites 3x plus légers en moyenne
          </h6>
        </div>
      </section>

      {/* Footer - Utilise un h2 qui changera en mode éco */}
      <footer style={{
        width: '100%',
        padding: 'var(--space-8) 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        textAlign: 'left',
        marginTop: 'auto'
      }}>
        <h2 style={titleStyle}>
          L&apos;expertise numérique,<br/> engagée et inclusive
        </h2>
      </footer>

      {/* Eco Mode Switch - Intégré directement */}
      <div style={switchContainerStyle}>
        <span style={switchLabelStyle}>
          {getDisplayText()}
        </span>
        
        <button
          onClick={toggleEcoMode}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={switchButtonStyle}
          aria-label={`Basculer vers le ${isEcoMode ? 'mode standard' : 'mode éco'}`}
          title={`Passer au ${isEcoMode ? 'mode standard (coloré)' : 'mode éco (sobre)'}`}
        >
          {/* Carré mode standard (gauche) */}
          <div style={isEcoMode ? squareBlackFilled : squareWhiteBorder} />
          
          {/* Carré mode éco (droite) */}
          <div style={isEcoMode ? squareWhiteBorder : squareGreenFilled} />
        </button>
      </div>
    </div>
  );
}