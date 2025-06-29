// src/app/page.tsx - Avec système de grille intégré
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/organisms/Navigation/Navigation';
import ChiffresSlider from '@/components/organisms/ChiffresSlider';
import BannerContact from '@/components/organisms/BannerContact';
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

  // Choisir le bon logo selon le mode
  const currentLogo = isEcoMode ? logoEco : logo;
  const logoAlt = isEcoMode ? 'Logo La main verte Studio - Mode Éco' : 'Logo La main verte Studio';

  // Logique pour le texte du switch
  const getDisplayText = () => {
    if (isHovered) {
      return isEcoMode ? 'mode standard' : 'mode éco';
    }
    return isEcoMode ? 'mode éco' : 'mode standard';
  };

  // Styles du switch avec tokens CSS
  const switchContainerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 'var(--space-8)',
    right: 'var(--space-10)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    zIndex: 'var(--z-toast)' as any
  };

  const switchLabelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-primary)',
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-normal)',
    fontStyle: 'italic',
    color: 'var(--color-accent)',
    whiteSpace: 'nowrap'
  };

  const switchButtonStyle: React.CSSProperties = {
    display: 'flex',
    padding: 0,
    border: '2px solid var(--color-accent)',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'all var(--transition-normal)',
    outline: 'none'
  };

  const squareWhiteBorder: React.CSSProperties = {
    width: '18px',
    height: '18px',
    borderRadius: 0,
    transition: 'all var(--transition-normal)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'var(--color-white)'
  };

  const squareBlackFilled: React.CSSProperties = {
    width: '18px',
    height: '18px',
    borderRadius: 0,
    transition: 'all var(--transition-normal)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'var(--color-accent)'
  };

  const squareGreenFilled: React.CSSProperties = {
    width: '18px',
    height: '18px',
    borderRadius: 0,   
    transition: 'all var(--transition-normal)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'var(--color-primary)'
  };

  return (
    <div className="w-full bg-primary text-primary font-primary min-h-screen flex flex-col">
      {/* Hero Section */}
      <section style={{
        height: 'calc(100vh - 80px)',
        minHeight: '400px',
        maxHeight: 'calc(100vh - 160px)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header with title */}
        <header className="w-full px-8">
          <h1 className="text-6xl font-bold leading-tight text-black" style={{
            margin: 'var(--space-8) 0'
          }}>
            L&apos;expertise numérique,<br/> engagée et inclusive.
          </h1>
        </header>

        {/* Logo - Aligné à gauche */}
        <div className='px-8' style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start'
        }}>
          <div style={{ maxWidth: '1024px', width: '100%' }}>
            <Image 
              src={currentLogo}
              alt={logoAlt}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Section Main avec Container et Grid */}
      <main className="container-fluid mb-20">
        
        {/* Section 1 - Une colonne avec offset */}
        <section className="row" style={{
          paddingTop: '75px',
          borderTop: '1px solid #e7e7eb',
          marginTop: '75px',
          marginBottom: 'var(--space-20)',
        }}>
          <div className="col-md-5 col-md-offset-2 col-xs-12">
            <h2 className="text-4xl font-bold leading-tight text-primary mb-8">
              Accélérez la transformation responsable de vos produits digitaux
            </h2>
            
            <p className="text-xl leading-relaxed text-secondary mb-6">
              La main verte studio aide agences, PME et grands comptes à concevoir des solutions numériques accessibles, performantes et respectueuses de l'environnement.
            </p>
            
            <p className="text- leading-relaxed text-secondary">
              De l'audit d'accessibilité (RGAA) au conseil en numérique responsable (RGESN), jusqu'à l'écoconception UX/UI (en partenariat avec Nortis), nous accompagnons vos équipes pour bâtir un numérique plus inclusif, sobre et conforme aux exigences réglementaires.
            </p>
          </div>
        </section>

        {/* Section 3 - Nos offres et engagements */}
        <section className="row" style={{
          borderTop: '1px solid #e7e7eb',
          marginTop: '75px',
          paddingTop: '75px',
          marginBottom: 'var(--space-20)'
        }}>
          <div className="col-md-5 col-offset-1 col-xs-12 flex items-center justify-center">
            <h2 className="text-6xl font-bold leading-tight text-black" style={{
              margin: 'var(--space-8) 0'
            }}>
              Cultivons un web <br/>inclusif et responsable<br />
              pour une croissance durable.
            </h2>
          </div>
          {/* 
          <div className="col-md-5 col-offset-2 col-xs-12 flex items-center">
            <div>
              <div
                style={{
                textAlign: 'right'
                }}>
                <h3 className="text-xl font-medium text-primary mb-4">
                  Nos engagements
                </h3>
                
                <div className="mb-3">
                  <span className="text-base text-secondary">— </span>
                  <span className="text-base text-secondary">Accessibilité numérique pour tous</span>
                </div>
                
                <div className="mb-3">
                  <span className="text-base text-secondary">— </span>
                  <span className="text-base text-secondary">Réduction de l'empreinte environnementale</span>
                </div>
                
                <div className="mb-6">
                  <span className="text-base text-secondary">— </span>
                  <span className="text-base text-secondary">Expériences utilisateurs innovantes et inclusives</span>
                </div>
              </div>
              <div style={{
                marginTop: '30px',
                textAlign: 'right'
                }}>
                <h3 className="text-xl font-medium text-primary mb-4">
                  Nos offres
                </h3>
                
                <div className="mb-3">
                  <span className="text-base text-secondary">— </span>
                  <strong className="text-base text-secondary">Audit d'accessibilité RGAA</strong>
                </div>
                
                <div className="mb-3">
                  <span className="text-base text-secondary">— </span>
                  <strong className="text-base text-secondary">Conseil en numérique responsable (RGESN)</strong>
                </div>
                
                <div className="mb-3">
                  <span className="text-base text-secondary">— </span>
                  <strong className="text-base text-secondary">Écoconception UX/UI</strong>
                  <span className="text-base text-secondary"> (en partenariat avec Nortis)</span>
                </div>
                
                <div className="mb-6">
                  <span className="text-base text-secondary">— </span>
                  <strong className="text-base text-secondary">Accompagnement global ou formation</strong>
                  <span className="text-base text-secondary"> (optionnel)</span>
                </div>
              </div>
            </div>
          </div>
          */}
          <div className="col-md-4 col-offset-1 col-xs-12">           
            <ChiffresSlider />
          </div>
        </section>
        <section className="row" style={{
          marginTop: '75px',
          marginBottom: 'var(--space-20)'
        }}>
          <div className="col-8 col-offset-2 col-xs-12">
            <BannerContact />
          </div>

        </section>


      </main>

      {/* Footer */}
      <footer className="w-full py-8 flex items-center justify-start text-left px-8" style={{ marginTop: 'auto' }}>
        <h2 className="text-5xl font-normal leading-tight text-primary" style={{ margin: 'var(--space-8) 0' }}>
          L&apos;expertise numérique,<br/> engagée et inclusive
        </h2>
      </footer>

      {/* Eco Mode Switch */}
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