import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Keep crawlers out of your route handlers
    },
    sitemap: 'https://stepfault.ai/sitemap.xml',
  };
}