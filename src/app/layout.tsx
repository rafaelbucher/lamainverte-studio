// src/app/layout.tsx - Version avec composant Logo
import type { Metadata } from 'next';
import { generateStructuredData } from '@/lib/metadata';
import Navigation from '@/components/organisms/Navigation/Navigation';
import './globals.css';
import '../styles/header.css';

export const metadata: Metadata = {
  title: 'La main verte Studio - Expertise numérique responsable',
  description: 'Studio de développement web spécialisé dans l\'éco-conception et l\'accessibilité. Cultivons ensemble un web inclusif et responsable pour une croissance durable.',
  keywords: 'développement web, éco-conception, accessibilité, numérique responsable, web design, développement durable',
  
  openGraph: {
    title: 'La main verte Studio - Expertise numérique responsable',
    description: 'Studio de développement web spécialisé dans l\'éco-conception et l\'accessibilité',
    url: process.env.NODE_ENV === 'production' ? 'https://lamainverte.studio' : 'http://localhost:3000',
    siteName: 'La main verte Studio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'La main verte Studio'
      }
    ],
    locale: 'fr_FR',
    type: 'website'
  },

  twitter: {
    card: 'summary_large_image',
    title: 'La main verte Studio - Expertise numérique responsable',
    description: 'Studio de développement web spécialisé dans l\'éco-conception et l\'accessibilité',
    images: ['/og-image.jpg']
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },

  authors: [{ name: 'La main verte Studio' }],
  creator: 'La main verte Studio',
  publisher: 'La main verte Studio',
  
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3EDC81',
  
  alternates: {
    canonical: process.env.NODE_ENV === 'production' 
      ? 'https://lamainverte.studio'
      : undefined
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Données structurées pour l'organisation
  const organizationSchema = generateStructuredData('Organization');
  const websiteSchema = generateStructuredData('WebSite');

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Favicon et icônes */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Données structurées */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />

        {/* Preconnect pour les performances */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      
      <body className="relative" suppressHydrationWarning>
        {/* Skip link pour l'accessibilité */}
        <a 
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded"
        >
          Aller au contenu principal
        </a>

        {/* Header avec Logo - visible sur toutes les pages */}
        <header>
          {/* Navigation - Composant externe */}
          <Navigation />
        </header>


        {/* Contenu principal */}
        <main id="main-content">
          {children}
        </main>

        {/* Analytics et scripts de performance (à ajouter si nécessaire) */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics, Plausible, ou autre solution respectueuse de la vie privée */}
          </>
        )}
      </body>
    </html>
  );
}