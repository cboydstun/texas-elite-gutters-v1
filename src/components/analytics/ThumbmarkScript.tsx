"use client";

import Script from "next/script";

export default function ThumbmarkScript() {
  return (
    <>
      <Script
        id="thumbmark-js"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Create a script element
              var script = document.createElement('script');
              script.src = 'https://cdn.jsdelivr.net/npm/@thumbmarkjs/thumbmarkjs@0.12.1/dist/thumbmarkjs.min.js';
              script.async = true;
              script.onload = function() {
                // Initialize ThumbmarkJS with options
                if (window.ThumbmarkJS && typeof window.ThumbmarkJS.setOption === 'function') {
                  // Exclude some components for better performance
                  window.ThumbmarkJS.setOption('exclude', ['webgl']);
                  
                  // Disable logging for privacy
                  window.ThumbmarkJS.setOption('logging', false);
                  
                  console.log('ThumbmarkJS initialized');
                }
              };
              
              // Append the script to the document
              document.head.appendChild(script);
            })();
          `,
        }}
      />
    </>
  );
}
