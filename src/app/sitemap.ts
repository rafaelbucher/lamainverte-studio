// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://lamainverte.studio' // À remplacer par votre domaine
    : 'http://localhost:3000';

  // Pages principales
  const routes = [
    '',           // Accueil
    '/offres',
    '/demarche', 
    '/references',
    '/a-propos',
    '/blog',
    '/contact'
  ];

  // Articles de blog (exemple)
  const blogPosts = [
    '/blog/eco-conception-web',
    '/blog/accessibilite-numerique'
  ];

  const staticPages = routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1 : 0.8
  }));

  const blogPages = blogPosts.map(post => ({
    url: `${baseUrl}${post}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6
  }));

  return [...staticPages, ...blogPages];
}