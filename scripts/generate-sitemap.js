#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Configuration
const siteUrl = process.env.SITE_URL || 'https://texaselitegutters.com';
const excludePaths = ['/login', '/register', '/admin'];
const outputDir = path.join(process.cwd(), 'public');
const sitemapPath = path.join(outputDir, 'sitemap.xml');
const robotsPath = path.join(outputDir, 'robots.txt');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all pages from the .next/server/pages directory
const getPages = async () => {
  const pagesDir = path.join(process.cwd(), '.next', 'server', 'app');
  
  // Skip if the directory doesn't exist (e.g., during tests)
  if (!fs.existsSync(pagesDir)) {
    console.warn('Pages directory not found. Using mock data for testing.');
    return [
      '/',
      '/contact',
      '/gutter-services',
      '/gutter-installation',
      '/exterior-services',
      '/login',
      '/register',
      '/admin'
    ];
  }
  
  // Get all page paths
  const pageFiles = await glob('**/*.html', { cwd: pagesDir });
  
  // Convert file paths to URL paths
  return pageFiles.map(file => {
    let urlPath = '/' + file.replace(/\.html$/, '');
    // Handle index pages
    urlPath = urlPath.replace(/\/index$/, '/');
    return urlPath;
  });
};

// Filter out excluded paths
const filterPages = (pages) => {
  return pages.filter(page => {
    return !excludePaths.some(excludePath => page === excludePath || page.startsWith(excludePath + '/'));
  });
};

// Generate sitemap XML
const generateSitemap = (pages) => {
  const timestamp = new Date().toISOString();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  pages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${siteUrl}${page}</loc>\n`;
    xml += `    <lastmod>${timestamp}</lastmod>\n`;
    xml += '    <changefreq>daily</changefreq>\n';
    xml += '    <priority>0.7</priority>\n';
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};

// Generate robots.txt
const generateRobots = () => {
  let content = '# *\n';
  content += 'User-agent: *\n';
  content += 'Allow: /\n';
  
  // Add disallow rules
  excludePaths.forEach(path => {
    content += `Disallow: ${path}\n`;
  });
  
  content += '\n# Host\n';
  content += `Host: ${siteUrl}\n`;
  
  content += '\n# Sitemaps\n';
  content += `Sitemap: ${siteUrl}/sitemap.xml\n`;
  
  return content;
};

// Main function
const main = async () => {
  try {
    // Get and filter pages
    const allPages = await getPages();
    const filteredPages = filterPages(allPages);
    
    // Generate sitemap
    const sitemapXml = generateSitemap(filteredPages);
    fs.writeFileSync(sitemapPath, sitemapXml);
    console.log(`Sitemap generated at ${sitemapPath}`);
    
    // Generate robots.txt
    const robotsTxt = generateRobots();
    fs.writeFileSync(robotsPath, robotsTxt);
    console.log(`Robots.txt generated at ${robotsPath}`);
    
    console.log('Generation completed successfully!');
  } catch (error) {
    console.error('Error generating sitemap and robots.txt:', error);
    process.exit(1);
  }
};

// Run the script
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
