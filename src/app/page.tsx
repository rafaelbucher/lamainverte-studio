// src/app/page.tsx - Version nettoyée sans footer ni EcoModeSwitch
'use client';

import { useState, useEffect } from 'react';
import ChiffresSlider from '@/components/organisms/ChiffresSlider';
import BannerContact from '@/components/organisms/BannerContact';
import { Logo } from '@/components/atoms/Logo';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
            <Logo 
              size="auto"
              priority={true}
              showHover={false}
              title="La main verte Studio - Expertise numérique responsable"
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
            
            <p className="text-xl leading-relaxed text-secondary">
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

      {/* Le Footer avec EcoModeSwitch est maintenant géré par le layout */}
    </div>
  );
}