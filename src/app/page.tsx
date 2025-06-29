// src/app/page.tsx - Avec section main
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
      return isEcoMode ? 'mode standard' : 'mode éco';
    }
    return isEcoMode ? 'mode éco' : 'mode standard';
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

  // Style pour carré BLANC avec bordure noire
  const squareWhiteBorder: React.CSSProperties = {
    width: '18px',
    height: '18px',
    borderRadius: 0,
    borderRight: 'none',
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
        {/* Header with title */}
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

      {/* Section Main */}
      <main className="container-full" style={{
        width: '100%',
        padding: '0 var(--space-8)',
        marginBottom: 'var(--space-20)'
      }}>
        
        {/* Section 1 - Une colonne avec typo 3xl */}
        <section className="row" style={{
          paddingTop: '75px',
          borderTop: '1px solid #e7e7eb',
          marginTop: '75px',
          marginBottom: 'var(--space-20)'
        }}>
          <div className="col-md-7 col-md-offset-3 col-xs-12" style={{
            maxWidth: '900px',
            marginLeft: '25%', // offset-3 = 25%
            width: '75%' // col-9 = 75%
          }}>
            <h2 style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 'var(--font-weight-normal)',
              fontSize: 'var(--font-size-4xl)',
              color: 'var(--color-text-primary)',
              lineHeight: 'var(--line-height-tight)',
              marginBottom: 'var(--space-8)'
            }}>
              Accélérez la transformation responsable de vos produits digitaux
            </h2>
            
            <p style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-size-lg)',
              lineHeight: 'var(--line-height-relaxed)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-6)'
            }}>
              La main verte studio aide agences, PME et grands comptes à concevoir des solutions numériques accessibles, performantes et respectueuses de l'environnement.
            </p>
            
            <p style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-size-lg)',
              lineHeight: 'var(--line-height-relaxed)',
              color: 'var(--color-text-secondary)'
            }}>
              De l'audit d'accessibilité (RGAA) au conseil en numérique responsable (RGESN), jusqu'à l'écoconception UX/UI (en partenariat avec Nortis), nous accompagnons vos équipes pour bâtir un numérique plus inclusif, sobre et conforme aux exigences réglementaires.
            </p>
          </div>
        </section>

        {/* Section 2 - Deux colonnes avec texte courant */}
        <section className="row" style={{
          paddingTop: '75px',
          borderTop: '1px solid #e7e7eb',
          marginTop: '75px',
          marginBottom: 'var(--space-20)'
        }}>
          <div className="col-md-9 col-md-offset-3 col-xs-12" style={{
            maxWidth: '900px',
            marginLeft: '25%',
            width: '75%',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--space-8)'
          }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--font-size-lg)',
                lineHeight: 'var(--line-height-relaxed)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-4)'
              }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--font-size-lg)',
                lineHeight: 'var(--line-height-relaxed)',
                color: 'var(--color-text-secondary)'
              }}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
            <div>
              <p style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--font-size-lg)',
                lineHeight: 'var(--line-height-relaxed)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-4)'
              }}>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error.
              </p>
              <p style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--font-size-lg)',
                lineHeight: 'var(--line-height-relaxed)',
                color: 'var(--color-text-secondary)'
              }}>
                Sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 - Trois colonnes avec textes et listes */}
        <section className="row" style={{
          paddingTop: '75px',
          borderTop: '1px solid #e7e7eb',
          marginTop: '75px',
          marginBottom: 'var(--space-20)'
        }}>
          <div className="col-md-9 col-md-offset-3 col-xs-12" style={{
            maxWidth: '900px',
            marginLeft: '25%',
            width: '75%',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-6)'
          }}>
            {/* Colonne 1 */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-xl)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-4)'
              }}>
                Lorem ipsum
              </h3>
              <p style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--font-size-base)',
                lineHeight: 'var(--line-height-relaxed)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-4)'
              }}>
                Dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.
              </p>
              <ul style={{
                listStyle: 'none',
                margin: 0,
                padding: 0
              }}>
                <li style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-2)',
                  paddingLeft: 'var(--space-4)',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: 'var(--color-primary)'
                  }}>•</span>
                  Lorem ipsum dolor
                </li>
                <li style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-2)',
                  paddingLeft: 'var(--space-4)',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: 'var(--color-primary)'
                  }}>•</span>
                  Consectetur adipiscing
                </li>
                <li style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  paddingLeft: 'var(--space-4)',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: 'var(--color-primary)'
                  }}>•</span>
                  Sed do eiusmod
                </li>
              </ul>
            </div>

            {/* Colonne 2 */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-xl)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-4)'
              }}>
                Consectetur
              </h3>
              <p style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--font-size-base)',
                lineHeight: 'var(--line-height-relaxed)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-4)'
              }}>
                Adipiscing elit sed do eiusmod tempor incididunt ut labore.
              </p>
              <ul style={{
                listStyle: 'none',
                margin: 0,
                padding: 0
              }}>
                <li style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-2)',
                  paddingLeft: 'var(--space-4)',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: 'var(--color-primary)'
                  }}>•</span>
                  Tempor incididunt
                </li>
                <li style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-2)',
                  paddingLeft: 'var(--space-4)',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: 'var(--color-primary)'
                  }}>•</span>
                  Ut labore dolore
                </li>
                <li style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  paddingLeft: 'var(--space-4)',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: 'var(--color-primary)'
                  }}>•</span>
                  Magna aliqua
                </li>
              </ul>
            </div>

            {/* Colonne 3 */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-xl)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-4)'
              }}>
                Adipiscing
              </h3>
              <p style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--font-size-base)',
                lineHeight: 'var(--line-height-relaxed)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-4)'
              }}>
                Elit sed do eiusmod tempor incididunt ut labore et dolore.
              </p>
              <ul style={{
                listStyle: 'none',
                margin: 0,
                padding: 0
              }}>
                <li style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-2)',
                  paddingLeft: 'var(--space-4)',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: 'var(--color-primary)'
                  }}>•</span>
                  Enim ad minim
                </li>
                <li style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-2)',
                  paddingLeft: 'var(--space-4)',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: 'var(--color-primary)'
                  }}>•</span>
                  Veniam quis nostrud
                </li>
                <li style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  paddingLeft: 'var(--space-4)',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: 'var(--color-primary)'
                  }}>•</span>
                  Exercitation ullamco
                </li>
              </ul>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
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