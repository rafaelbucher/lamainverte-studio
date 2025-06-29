// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://lamainverte.studio' // À remplacer par votre domaine
    : 'http://localhost:3000';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',          // Routes API privées
        '/admin/',        // Interface admin si elle existe
        '/_next/',        // Fichiers Next.js
        '/.*\\?',         // URLs avec paramètres de requête
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}