import { ReactNode, useState, useEffect } from 'react';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from 'next/dynamic';
import { useIsClient } from '@/hooks/useIsClient';

// Dynamic import for simple loading screen to avoid SSR issues
const SimpleLoadingScreen = dynamic(() => import('@/components/loading/SimpleLoadingScreen'), {
  ssr: false,
  loading: () => null
});

// Simple type for pages with custom layouts
type NextPageWithLayout = AppProps['Component'] & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const isClient = useIsClient();
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  useEffect(() => {
    if (!isClient) return;
    
    // Preload critical resources
    const preloadResources = async () => {
      // Add any resource preloading logic here if needed
    };
    
    preloadResources();
  }, [isClient]);

  // Always render the main content container to avoid hydration mismatch
  return (
    <div className="app-container min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      {isClient && isLoading && <SimpleLoadingScreen onComplete={handleLoadingComplete} />}
      
      {(!isClient || showContent) && getLayout(<Component {...pageProps} />)}
    </div>
  );
}
