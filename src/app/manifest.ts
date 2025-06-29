// src/app/manifest.ts - Pour PWA (optionnel)
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'La main verte Studio',
    short_name: 'LMVS',
    description: 'Studio de développement web responsable et accessible',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#3EDC81',
    orientation: 'portrait',
    scope: '/',
    lang: 'fr',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512.png', 
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    categories: ['business', 'productivity', 'development']
  };
}