// src/components/organisms/Navigation/Navigation.tsx - Version complète finale
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { X, Menu } from 'lucide-react';
import { Logo } from '@/components/atoms/Logo';

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
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fermer le menu mobile quand on change de page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Gestion de l'animation d'ouverture/fermeture
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.setProperty('--mobile-menu-opacity', '0.3');
      document.body.classList.add('mobile-menu-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('--mobile-menu-opacity');
      document.body.classList.remove('mobile-menu-open');
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.removeProperty('--mobile-menu-opacity');
      document.body.classList.remove('mobile-menu-open');
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  if (!mounted) {
    return null;
  }

  // Obtenir le nom de la page courante
  const getCurrentPageName = () => {
    const pathMap: { [key: string]: string } = {
      '/offres': 'offres',
      '/demarche': 'demarche',
      '/references': 'references',
      '/a-propos': 'a-propos',
      '/blog': 'blog',
      '/contact': 'contact'
    };
    
    return pathMap[pathname] || 'page';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const baseStyle: React.CSSProperties = {
    position: 'fixed',
    width: '100%',
    height: '100svh',
    padding: 'var(--space-10)',
    zIndex: 'var(--z-dropdown)' as any
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

  const mobileLinkStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    color: 'var(--color-accent)',
    cursor: 'pointer',
    textDecoration: 'none',
    fontFamily: 'var(--font-primary)',
    fontSize: 'var(--font-size-base)',
    fontStyle: 'italic',
    transition: 'color var(--transition-normal)',
    marginBottom: 'var(--space-4)'
  };

  const mobileActiveLinkStyle: React.CSSProperties = {
    ...mobileLinkStyle,
    color: 'var(--color-primary)',
    fontWeight: 'var(--font-weight-medium)'
  };

  // Navigation pour la page d'accueil
  if (isHomePage) {
    return (
      <>
        <nav style={baseStyle} className={className}>
          {/* Navigation desktop - horizontale à droite */}
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
            gap: 'var(--space-4)',
            textAlign: 'right'
          }}
          className="hidden-xs"
          >
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
                        const target = e.currentTarget as HTMLElement;
                        target.style.color = 'var(--color-hover)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        const target = e.currentTarget as HTMLElement;
                        target.style.color = 'var(--color-accent)';
                      }
                    }}
                    title={item.description}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bouton hamburger mobile pour page d'accueil */}
        <button
          onClick={toggleMobileMenu}
          style={{
            position: 'fixed',
            top: 'var(--space-6)',
            right: 'var(--space-10)',
            background: 'none',
            border: 'none',
            color: 'var(--color-accent)',
            cursor: 'pointer',
            padding: 'var(--space-2)',
            zIndex: 'var(--z-modal)' as any
          }}
          className="visible-xs"
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Overlay mobile home */}
        <div
          data-mobile-menu
          style={{
            position: 'fixed',
            top: 0,
            left: isMobileMenuOpen ? 0 : '-100%',
            width: '100%',
            height: '100vh',
            backgroundColor: 'var(--color-bg-primary)',
            zIndex: '100' as any,
            transition: 'left 250ms ease-in-out',
            padding: 'var(--space-6)',
            paddingTop: 'calc(var(--space-6) + 60px)',
            boxShadow: isMobileMenuOpen ? '4px 0 20px rgba(0,0,0,0.1)' : 'none'
          }}
          className="visible-xs"
        >
          <nav>
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)'
            }}>
              {navigationItems.map((item, index) => {
                const isActive = pathname === item.href || 
                                (item.href !== '/' && pathname.startsWith(item.href));
                
                return (
                  <li key={index} style={{ margin: 0, padding: 0 }}>
                    <Link 
                      href={item.href}
                      style={isActive && showActiveIndicator ? mobileActiveLinkStyle : mobileLinkStyle}
                      onClick={() => setIsMobileMenuOpen(false)}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          const target = e.currentTarget as HTMLElement;
                          target.style.color = 'var(--color-hover)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          const target = e.currentTarget as HTMLElement;
                          target.style.color = isActive ? 'var(--color-primary)' : 'var(--color-accent)';
                        }
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </>
    );
  }

  // Navigation pour les pages internes
  return (
    <>
      <nav style={{
        ...baseStyle,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start'
      }} className={`${className} hidden-xs internal-nav`}>
        {/* Logo + nom de page à gauche - Desktop */}
        <div style={{
          display: 'flex',
          alignItems: 'end',
        }}>
          <Logo 
            href="/"
            size="medium"
            showHover={true}
            title="Retour à l'accueil"
            style={{ flexShrink: 0 }}
          />

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

        {/* Navigation horizontale à droite - Desktop */}
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
                      const target = e.currentTarget as HTMLElement;
                      target.style.color = 'var(--color-hover)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      const target = e.currentTarget as HTMLElement;
                      target.style.color = 'var(--color-accent)';
                    }
                  }}
                  title={item.description}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Navigation mobile pour pages internes */}
      <div 
        style={{
          position: 'fixed',
          width: '100%',
          height: '100svh',
          padding: 'var(--space-10)',
          paddingLeft: 'var(--space-6)',
          paddingRight: 'var(--space-6)',
          zIndex: 'var(--z-dropdown)' as any,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'start'
        }} 
        className={`${className} visible-xs`}
      >
        {/* Logo + séparateur + page courante à gauche */}
        <div style={{
          display: 'flex',
          alignItems: 'end',
        }}>
          <Logo 
            href="/"
            size="medium"
            showHover={false}
            style={{ flexShrink: 0 }}
          />

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
      </div>

      {/* Bouton hamburger mobile pour pages internes */}
      <button
        onClick={toggleMobileMenu}
        style={{
          position: 'fixed',
          top: 'var(--space-6)',
          right: 'var(--space-10)',
          background: 'none',
          border: 'none',
          color: 'var(--color-accent)',
          cursor: 'pointer',
          padding: 'var(--space-2)',
          zIndex: '100' as any
        }}
        className="visible-xs"
        aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay mobile pour pages internes */}
      <div
        data-mobile-menu
        style={{
          position: 'fixed',
          top: 0,
          left: isMobileMenuOpen ? 0 : '-100%',
          width: '100%',
          height: '100vh',
          backgroundColor: 'var(--color-bg-primary)',
          zIndex: '100' as any,
          transition: 'left 250ms ease-in-out',
          padding: 'var(--space-6)',
          paddingTop: 'calc(var(--space-6) + 60px)',
          boxShadow: isMobileMenuOpen ? '4px 0 20px rgba(0,0,0,0.1)' : 'none'
        }}
        className="visible-xs"
      >
        <nav>
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)'
          }}>
            {navigationItems.map((item, index) => {
              const isActive = pathname === item.href || 
                              (item.href !== '/' && pathname.startsWith(item.href));
              
              return (
                <li key={index} style={{ margin: 0, padding: 0 }}>
                  <Link 
                    href={item.href}
                    style={isActive && showActiveIndicator ? mobileActiveLinkStyle : mobileLinkStyle}
                    onClick={() => setIsMobileMenuOpen(false)}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        const target = e.currentTarget as HTMLElement;
                        target.style.color = 'var(--color-hover)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        const target = e.currentTarget as HTMLElement;
                        target.style.color = isActive ? 'var(--color-primary)' : 'var(--color-accent)';
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}