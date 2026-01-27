import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://eventbeegit-32070598.web.app'; // Replace with your actual domain

  // For now, we'll only include static pages.
  // Dynamic event pages would require access to your event data source here.
  const staticRoutes = [
    '/',
    '/dashboard',
    '/find-events',
    '/create-event',
    '/profile',
    '/admin',
    '/analytics',
    '/login',
    '/signup',
    '/share',
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
