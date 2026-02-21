'use client';

import { useEffect } from 'react';

export default function AnimatedFavicon() {
  useEffect(() => {
    let isVisible = true;

    const animate = () => {
      // Toggle visibility
      isVisible = !isVisible;

      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
          <defs>
            <radialGradient id="grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style="stop-color:#22C55E;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#16A34A;stop-opacity:1" />
            </radialGradient>
          </defs>
          
          <!-- Outer circle -->
          <circle 
            cx="32" 
            cy="32" 
            r="25" 
            fill="url(#grad)"
            opacity="${isVisible ? '1' : '0.1'}"
          />
          
          <!-- Inner circle -->
          <circle 
            cx="32" 
            cy="32" 
            r="18" 
            fill="#00ff0d"
            opacity="${isVisible ? '1' : '0.1'}"
          />
        </svg>
      `;

      // Convert SVG to data URI
      const svgDataUri = `data:image/svg+xml,${encodeURIComponent(svg)}`;

      // Update favicon
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (link) {
        link.href = svgDataUri;
      }
    };

    // Run animation every 0.6 seconds (600ms)
    const interval = setInterval(animate, 600);

    // Initial render
    animate();

    return () => {
      clearInterval(interval);
      // Reset to default
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (link) {
        link.href = '/favicon.ico';
      }
    };
  }, []);

  return null;
}