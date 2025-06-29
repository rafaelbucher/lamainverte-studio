// src/lib/metadata.ts - Version complète avec toutes les exports
import type { Metadata } from 'next';

interface BaseMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

const siteConfig = {
  name: 'La main verte Studio',
  description: 'Studio de développement web spécialisé dans l\'éco-conception et l\'accessibilité. Cultivons ensemble un web inclusif et responsable pour une croissance durable.',
  url: process.env.NODE_ENV === 'production' 
    ? 'https://lamainverte.studio' // À remplacer par votre domaine
    : 'http://localhost:3000',
  ogImage: '/og-image.jpg',
  locale: 'fr_FR'
};

export function createMetadata({
  title,
  description,
  keywords = [],
  image,
  noIndex = false
}: BaseMetadata): Metadata {
  const fullTitle = title.includes('La main verte Studio') 
    ? title 
    : `${title} - La main verte Studio`;

  const defaultKeywords = ['développement web', 'éco-conception', 'accessibilité', 'numérique responsable'];
  const allKeywords = [...defaultKeywords, ...keywords];
  const ogImage = image || siteConfig.ogImage;

  return {
    title: fullTitle,
    description,
    keywords: allKeywords.join(', '),
    
    openGraph: {
      title: fullTitle,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: siteConfig.locale,
      type: 'website'
    },

    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage]
    },

    robots: {
      index: !noIndex,
      follow: !noIndex
    },

    alternates: {
      canonical: siteConfig.url
    }
  };
}

// Export de la fonction avec l'ancien nom pour compatibilité
export const generatePageMetadata = createMetadata;

// Configuration des métadonnées par page
export const pageMetadata = {
  home: {
    title: 'La main verte Studio - Expertise numérique responsable',
    description: siteConfig.description,
    keywords: ['accueil', 'studio web', 'développement responsable']
  },
  
  offres: {
    title: 'Nos offres',
    description: 'Découvrez nos services de développement web responsable : éco-conception, accessibilité, performance et solutions numériques durables.',
    keywords: ['services web', 'éco-conception', 'développement sur mesure', 'accessibilité web']
  },
  
  demarche: {
    title: 'Notre démarche',
    description: 'Notre approche responsable du développement web : méthodologie éco-conçue, accessibilité universelle et engagement durable.',
    keywords: ['démarche responsable', 'méthodologie', 'engagement durable', 'éthique numérique']
  },
  
  references: {
    title: 'Nos références',
    description: 'Découvrez nos réalisations web responsables et les projets que nous avons menés avec nos clients.',
    keywords: ['portfolio', 'réalisations', 'projets web', 'références clients']
  },
  
  about: {
    title: 'À propos',
    description: 'Découvrez l\'histoire de La main verte Studio, notre équipe passionnée et nos valeurs pour un web responsable.',
    keywords: ['équipe', 'histoire', 'valeurs', 'studio', 'à propos']
  },
  
  blog: {
    title: 'Blog',
    description: 'Actualités, réflexions et conseils sur le développement web responsable, l\'éco-conception et l\'accessibilité numérique.',
    keywords: ['blog', 'actualités', 'conseils web', 'éco-conception', 'accessibilité']
  },
  
  contact: {
    title: 'Contact',
    description: 'Contactez La main verte Studio pour échanger sur votre projet web responsable et obtenir un devis personnalisé.',
    keywords: ['contact', 'devis', 'projet web', 'échange', 'consultation']
  }
} as const;

// Fonction pour générer les données structurées
export function generateStructuredData(type: 'Organization' | 'WebSite' | 'Article', data?: any) {
  const baseSchema = {
    '@context': 'https://schema.org'
  };

  switch (type) {
    case 'Organization':
      return {
        ...baseSchema,
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        logo: `${siteConfig.url}/logo.png`,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'FR'
        }
      };

    case 'WebSite':
      return {
        ...baseSchema,
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name
        }
      };

    case 'Article':
      return {
        ...baseSchema,
        '@type': 'Article',
        headline: data?.title,
        description: data?.description,
        author: {
          '@type': 'Organization',
          name: siteConfig.name
        },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          logo: {
            '@type': 'ImageObject',
            url: `${siteConfig.url}/logo.png`
          }
        },
        datePublished: data?.publishedAt,
        dateModified: data?.publishedAt,
        url: `${siteConfig.url}${data?.slug}`,
        image: data?.image || siteConfig.ogImage
      };

    default:
      return baseSchema;
  }
}

// Export par défaut pour faciliter l'import
export default {
  createMetadata,
  generatePageMetadata,
  pageMetadata,
  generateStructuredData,
  siteConfig
};