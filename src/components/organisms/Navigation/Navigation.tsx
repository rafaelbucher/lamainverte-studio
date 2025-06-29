// src/components/organisms/Navigation/Navigation.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import logo from '@/app/assets/logo.svg';
import logoEco from '@/app/assets/logo-eco.svg';

interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

const navigationItems: NavigationItem[] = [
  { label: 'offres', href: '/offres', description: 'Nos services et solutions' },
  { label: 'démarche', href: '/demarche', description: 'Notre approche responsable' },
  { label: 'références', href: '/references', description: 'Nos réalisations' },
  { label: 'à propos', href: '/a-propos', description: 'Notre histoire et équipe' },
  { label: 'blog', href: '/blog', description: 'Actualités et réflexions' },
  { label: 'contact', href: '/contact', description: 'Échanger avec nous' }
];

interface NavigationProps {
  className?: string;
  style?: React.CSSProperties;
  vertical?: boolean;
  showActiveIndicator?: boolean;
}

export default function Navigation({ 
  className = '', 
  style,
  vertical = true,
  showActiveIndicator = true
}: NavigationProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
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
    return null;
  }

  // Choisir le bon logo selon le mode
  const currentLogo = isEcoMode ? logoEco : logo;
  const logoAlt = isEcoMode ? 'Logo La main verte Studio - Mode Éco' : 'Logo La main verte Studio';

  // Obtenir le nom de la page courante
  const getCurrentPageName = () => {
    const pathMap: { [key: string]: string } = {
      '/offres': 'offres',
      '/demarche': 'démarche',
      '/references': 'références',
      '/a-propos': 'à propos',
      '/blog': 'blog',
      '/contact': 'contact'
    };
    
    return pathMap[pathname] || 'page';
  };

  const baseStyle: React.CSSProperties = {
    position: 'fixed',
    top: 'var(--space-6)',
    zIndex: 'var(--z-dropdown)' as any
  };

  // Style spécifique pour la page d'accueil (droite)
  const homeNavStyle: React.CSSProperties = {
    ...baseStyle,
    right: 'var(--space-10)'
  };

  // Style spécifique pour les pages internes (toute la largeur)
  const internalNavStyle: React.CSSProperties = {
    ...baseStyle,
    left: 0,
    right: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 'var(--space-10)',
    paddingRight: 'var(--space-10)'
  };

  const linkBaseStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    color: 'var(--color-accent)',
    cursor: 'pointer',
    textDecoration: 'none',
    fontFamily: 'var(--font-primary)',
    fontSize: 'var(--font-size-base)',
    fontStyle: 'italic',
    transition: 'color var(--transition-normal)',
    padding: 'var(--space-1) 0'
  };

  const activeLinkStyle: React.CSSProperties = {
    ...linkBaseStyle,
    color: 'var(--color-primary)',
    fontWeight: 'var(--font-weight-medium)'
  };

  // Navigation pour la page d'accueil (horizontale à droite)
  if (isHomePage) {
    const mergedStyle = { ...homeNavStyle, ...style };
    
    return (
      <nav style={mergedStyle} className={className}>
        <ul style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'row',
          gap: 'var(--space-4)',
          textAlign: 'right'
        }}>
          {navigationItems.map((item, index) => {
            const isActive = pathname === item.href || 
                            (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <li key={index} style={{ margin: 0, padding: 0 }}>
                <Link 
                  href={item.href}
                  style={isActive && showActiveIndicator ? activeLinkStyle : linkBaseStyle}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--color-hover)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--color-accent)';
                    }
                  }}
                  title={item.description}
                >
                  {item.label}
                  {/* Indicateur visuel pour la page active */}
                  {isActive && showActiveIndicator && (
                    <span 
                      style={{
                        position: 'absolute',
                        right: '-8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '4px',
                        height: '4px',
                        backgroundColor: 'var(--color-primary)',
                        borderRadius: '50%'
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  // Navigation pour les pages internes (logo à gauche, nav à droite)
  const mergedStyle = { ...internalNavStyle, ...style };
  
  return (
    <nav style={mergedStyle} className={className}>
      {/* Logo + nom de page à gauche */}
      <div style={{
        display: 'flex',
        alignItems: 'end',
      }}>
        <Link 
          href="/"
          style={{
            display: 'block',
            transition: 'transform var(--transition-normal)',
            maxWidth: '180px',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title="Retour à l'accueil"
        >
          <Image 
            src={currentLogo}
            alt={logoAlt}
            style={{ 
              width: '100%', 
              height: 'auto',
              display: 'block'
            }}
            priority
          />
        </Link>

        {/* Séparateur et nom de page */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'var(--font-primary)',
          fontSize: '1.4rem',
          letterSpacing: '1px',
          marginLeft: '-78px',
          marginBottom: '7px',
          color: 'var(--color-accent)'
        }}>
          <span style={{ fontWeight: 'var(--font-weight-bold)' }}>/</span>
          <span style={{ 
            fontStyle: 'italic',
            fontWeight: 'var(--font-weight-bold)'
          }}>
            {getCurrentPageName()}
          </span>
        </div>
      </div>

      {/* Navigation à droite */}
      <ul style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
        gap: 'var(--space-4)',
        alignItems: 'center'
      }}>
        {navigationItems.map((item, index) => {
          const isActive = pathname === item.href || 
                          (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <li key={index} style={{ margin: 0, padding: 0 }}>
              <Link 
                href={item.href}
                style={isActive && showActiveIndicator ? activeLinkStyle : linkBaseStyle}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--color-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--color-accent)';
                  }
                }}
                title={item.description}
              >
                {item.label}
                {/* Indicateur visuel pour la page active */}
                {isActive && showActiveIndicator && (
                  <span 
                    style={{
                      position: 'absolute',
                      right: '-8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '4px',
                      height: '4px',
                      backgroundColor: 'var(--color-primary)',
                      borderRadius: '50%'
                    }}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}