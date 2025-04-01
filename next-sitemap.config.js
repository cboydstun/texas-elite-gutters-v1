/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://texaselitegutters.com",
  generateRobotsTxt: true,
  exclude: ["/login", "/register", "/admin"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/register", "/admin"],
      },
    ],
    additionalSitemaps: [],
  },
  sitemapSize: 50000, // Set a large number to ensure all URLs are in one file
  generateIndexSitemap: false, // Disable index sitemap generation
  outDir: "public",
  transform: (config, url) => {
    // Custom transform function to rename the output file
    return {
      loc: url,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
