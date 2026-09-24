import { MetadataRoute } from 'next';

const API_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000").replace(/\/+$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://awc.lk'; 

  // 1. Core AWC Static Routes with custom priority & frequency
  const staticPages = [
    { route: '', priority: 1.0, changeFrequency: 'daily' as const },
    { route: '/about', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/projects', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/shop', priority: 0.8, changeFrequency: 'daily' as const },
    { route: '/resources', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/stories', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/news', priority: 0.8, changeFrequency: 'daily' as const },
    { route: '/gallery', priority: 0.7, changeFrequency: 'weekly' as const },
    { route: '/donate', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/volunteer', priority: 0.7, changeFrequency: 'monthly' as const },
    { route: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
  ].map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  // 2. Dynamic Backend Routes (News dispatches, products, events, resources)
  let dynamicEntries: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE}/api/sitemap-urls`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      
      const dynamicItems = [
        ...(data.activities || data.news || []),
        ...(data.events || []),
        ...(data.products || []),
        ...(data.resources || []),
      ];

      dynamicEntries = dynamicItems.map((item: { url: string; lastmod?: string }) => ({
        url: item.url.startsWith('http')
          ? item.url
          : `${baseUrl}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
        lastModified: item.lastmod ? new Date(item.lastmod) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    }
  } catch (err) {
    console.warn("Using static sitemap fallback (API offline):", err);
  }

  return [...staticPages, ...dynamicEntries];
}