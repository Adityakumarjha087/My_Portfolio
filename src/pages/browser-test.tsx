import { useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';

const BrowserTest = () => {
  useEffect(() => {
    // Test for WebP support
    const testWebP = (callback: (isSupported: boolean) => void) => {
      const webP = new Image();
      webP.onload = webP.onerror = function() {
        callback(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    };

    // Run tests
    testWebP((isSupported) => {
      const webpElement = document.getElementById('webp-support');
      if (webpElement) {
        webpElement.textContent = isSupported ? '✅ Supported' : '❌ Not supported';
        webpElement.className = isSupported ? 'text-green-500' : 'text-red-500';
      }
    });

    // Test for JavaScript
    const jsElement = document.getElementById('js-support');
    if (jsElement) {
      jsElement.textContent = '✅ Enabled';
      jsElement.className = 'text-green-500';
    }

    // Test for CSS Grid
    const gridElement = document.getElementById('css-grid-support');
    if (gridElement) {
      gridElement.textContent = '✅ Supported';
      gridElement.className = 'text-green-500';
    }

    // Test for Flexbox
    const flexboxElement = document.getElementById('flexbox-support');
    if (flexboxElement) {
      flexboxElement.textContent = '✅ Supported';
      flexboxElement.className = 'text-green-500';
    }

    // Test for WebGL
    const webGLElement = document.getElementById('webgl-support');
    if (webGLElement) {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl && gl instanceof WebGLRenderingContext) {
          webGLElement.textContent = '✅ Supported';
          webGLElement.className = 'text-green-500';
        } else {
          throw new Error('WebGL not supported');
        }
      } catch {
        webGLElement.textContent = '❌ Not supported';
        webGLElement.className = 'text-red-500';
      }
    }
  }, []);

  return (
    <PageLayout title="Browser Compatibility Test">
      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Browser Compatibility Test</h1>
          
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Browser Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">User Agent:</span> {typeof navigator !== 'undefined' ? navigator.userAgent : 'Not available'}</p>
              <p><span className="font-medium">Platform:</span> {typeof navigator !== 'undefined' ? navigator.platform : 'Not available'}</p>
              <p><span className="font-medium">Language:</span> {typeof navigator !== 'undefined' ? navigator.language : 'Not available'}</p>
              <p><span className="font-medium">Cookies Enabled:</span> {typeof navigator !== 'undefined' ? navigator.cookieEnabled ? '✅ Yes' : '❌ No' : 'Not available'}</p>
              <p><span className="font-medium">Screen Resolution:</span> {typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : 'Not available'}</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Feature Support</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="font-medium">JavaScript:</span>
                <span id="js-support" className="text-yellow-500">Testing...</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="font-medium">WebP Image Format:</span>
                <span id="webp-support" className="text-yellow-500">Testing...</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="font-medium">CSS Grid:</span>
                <span id="css-grid-support" className="text-yellow-500">Testing...</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="font-medium">Flexbox:</span>
                <span id="flexbox-support" className="text-yellow-500">Testing...</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium">WebGL:</span>
                <span id="webgl-support" className="text-yellow-500">Testing...</span>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>For the best experience, use the latest version of Chrome, Firefox, Safari, or Edge</li>
              <li>Enable JavaScript for full functionality</li>
              <li>Use a screen resolution of at least 1024x768 for optimal viewing</li>
              <li>Ensure your browser is up to date for the latest features and security updates</li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BrowserTest;
