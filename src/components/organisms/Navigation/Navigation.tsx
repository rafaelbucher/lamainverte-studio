// src/components/organisms/Navigation/Navigation.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

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

  const baseStyle: React.CSSProperties = {
    position: 'fixed',
    top: 'var(--space-6)',
    right: 'var(--space-10)',
    zIndex: 'var(--z-dropdown)' as any
  };

  const mergedStyle = { ...baseStyle, ...style };

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

  return (
    <nav style={mergedStyle} className={className}>
      <ul style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
        gap: 'var(--space-4)',
        textAlign: vertical ? 'right' : 'left'
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