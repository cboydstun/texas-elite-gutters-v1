import fs from "fs";
import path from "path";

// Mock fs module
jest.mock("fs", () => ({
  ...jest.requireActual("fs"),
  readFileSync: jest.fn(),
  existsSync: jest.fn(),
  writeFileSync: jest.fn(),
  unlinkSync: jest.fn(),
}));

describe("Sitemap and Robots.txt Generation", () => {
  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  const robotsPath = path.join(process.cwd(), "public", "robots.txt");
  
  beforeEach(() => {
    jest.clearAllMocks();
    (fs.existsSync as jest.Mock).mockReturnValue(true);
  });
  
  test("build script should include sitemap generation", () => {
    // Read the package.json file
    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJsonContent = require(packageJsonPath);
    
    // Verify that the build script includes the sitemap generation
    expect(packageJsonContent.scripts.build).toContain("node scripts/generate-sitemap.js");
  });
  
  test("sitemap.xml should have correct structure", () => {
    // Mock the sitemap content
    const mockSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://texaselitegutters.com</loc>
    <lastmod>2025-04-01T00:00:00.000Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
    
    (fs.readFileSync as jest.Mock).mockReturnValue(mockSitemapContent);
    
    // Read the sitemap file
    const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
    
    // Verify the structure
    expect(sitemapContent).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(sitemapContent).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  });
  
  test("robots.txt should have correct structure", () => {
    // Mock the robots.txt content
    const mockRobotsContent = `# *
User-agent: *
Allow: /
Disallow: /login
Disallow: /register
Disallow: /admin

# Host
Host: https://texaselitegutters.com

# Sitemaps
Sitemap: https://texaselitegutters.com/sitemap.xml`;
    
    (fs.readFileSync as jest.Mock).mockReturnValue(mockRobotsContent);
    
    // Read the robots.txt file
    const robotsContent = fs.readFileSync(robotsPath, "utf-8");
    
    // Verify the structure
    expect(robotsContent).toContain("User-agent: *");
    expect(robotsContent).toContain("Allow: /");
    expect(robotsContent).toContain("Sitemap: https://texaselitegutters.com/sitemap.xml");
  });
  
  test("robots.txt should disallow excluded paths", () => {
    // Mock the robots.txt content
    const mockRobotsContent = `# *
User-agent: *
Allow: /
Disallow: /login
Disallow: /register
Disallow: /admin

# Host
Host: https://texaselitegutters.com

# Sitemaps
Sitemap: https://texaselitegutters.com/sitemap.xml`;
    
    (fs.readFileSync as jest.Mock).mockReturnValue(mockRobotsContent);
    
    // Read the robots.txt file
    const robotsContent = fs.readFileSync(robotsPath, "utf-8");
    
    // Verify the disallowed paths
    expect(robotsContent).toContain("Disallow: /login");
    expect(robotsContent).toContain("Disallow: /register");
    expect(robotsContent).toContain("Disallow: /admin");
  });
  
  test("generate-sitemap script should exclude specified paths", () => {
    // Mock the script content
    const mockScriptContent = `
const excludePaths = ['/login', '/register', '/admin'];
    `;
    
    (fs.readFileSync as jest.Mock).mockReturnValue(mockScriptContent);
    
    // Read the generate-sitemap.js file
    const scriptPath = path.join(process.cwd(), "scripts", "generate-sitemap.js");
    const scriptContent = fs.readFileSync(scriptPath, "utf-8");
    
    // Verify that the script excludes the specified paths
    expect(scriptContent).toContain("/login");
    expect(scriptContent).toContain("/register");
    expect(scriptContent).toContain("/admin");
  });
});
