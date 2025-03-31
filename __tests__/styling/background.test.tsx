import fs from 'fs';
import path from 'path';

describe("Background Color", () => {
  it("should have a light blue background defined in globals.css", () => {
    // Read the globals.css file
    const cssFilePath = path.join(process.cwd(), 'src', 'app', 'globals.css');
    const cssContent = fs.readFileSync(cssFilePath, 'utf8');
    
    // Check if the CSS contains the light blue background variable
    expect(cssContent).toContain('--background: #e6f2ff');
    
    // Check if the dark mode has a darker blue
    expect(cssContent).toContain('--background: #0a4f8c');
  });
});
