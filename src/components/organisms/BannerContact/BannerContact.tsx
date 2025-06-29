// src/components/organisms/BannerContact/BannerContact.tsx
'use client';

import { ArrowRight } from 'lucide-react';

export interface BannerContactProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function BannerContact({ 
  className = '',
  style
}: BannerContactProps) {
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    padding: 'var(--space-16)',
    textAlign: 'left',
    transition: 'all var(--transition-normal)',
    borderRadius: '24px',
    ...style
  };

  return (
    <section 
      className={`banner-contact ${className}`}
      style={containerStyle}
    >
      <h3 style={{
        fontSize: 'var(--font-size-5xl)',
        fontWeight: 'var(--font-weight-bold)',
        fontFamily: 'var(--font-primary)',
        marginBottom: 'var(--space-6)',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
        lineHeight: 'var(--line-height-tight)'
      }}>
        <strong>Engagez votre transition numérique responsable</strong>
      </h3>
      
      <p style={{
        fontSize: 'var(--font-size-xl)',
        marginBottom: 'var(--space-10)',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
        lineHeight: 'var(--line-height-relaxed)',
        fontFamily: 'var(--font-primary)'
      }}>
        Notre équipe s'engage pour un numérique plus éthique, performant et respectueux de l'environnement. Découvrez notre vision, nos valeurs et notre expertise.
      </p>
      
      <a 
        href="/contact"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          padding: 'var(--space-4) var(--space-8)',
          maxWidth: '800px',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'var(--font-weight-semibold)',
          fontSize: 'var(--font-size-lg)',
          transition: 'all var(--transition-normal)',
          border: '2px solid transparent',
          fontFamily: 'var(--font-primary)',
          cursor: 'pointer'
        }}
        className="cta-button"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        Contactez-nous
        <ArrowRight 
          size={20} 
          style={{
            transition: 'transform var(--transition-normal)'
          }}
          className="arrow-icon"
        />
      </a>

      <style jsx>{`
        /* Mode Standard */
        .banner-contact {
          background-color: var(--color-black);
        }
        
        .banner-contact h3 {
          color: var(--color-white);
        }
        
        .banner-contact h3 strong {
          color: var(--color-green);
        }
        
        .banner-contact p {
          color: var(--color-white);
        }
        
        .cta-button {
          background-color: var(--color-green);
          color: var(--color-black) !important;
        }
        
        .cta-button:hover .arrow-icon {
          transform: translateX(4px);
        }

        /* Mode Éco */
        :global(.eco-mode) .banner-contact {
          background-color: var(--color-black);
        }

        :global(.eco-mode) .banner-contact h3 {
          color: var(--color-gray-light);
        }

        :global(.eco-mode) .banner-contact h3 strong {
          color: var(--color-white);
        }

        :global(.eco-mode) .banner-contact p {
          color: var(--color-white);
        }

        :global(.eco-mode) .cta-button {
          background-color: var(--color-gray-light);
          color: var(--color-black) !important;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .banner-contact {
            padding: var(--space-12) var(--space-6);
          }
          
          .banner-contact h3 {
            font-size: var(--font-size-4xl);
          }
          
          .banner-contact p {
            font-size: var(--font-size-lg);
          }
        }
      `}</style>
    </section>
  );
}