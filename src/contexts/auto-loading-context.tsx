"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AutoLoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const AutoLoadingContext = createContext<AutoLoadingContextType | undefined>(undefined);

export function AutoLoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('madebywael-visited');
    if (hasVisited) {
      setIsFirstVisit(false);
      setIsLoading(false);
      return;
    }

    // Auto-detect when page is fully loaded
    const handlePageLoad = () => {
      // Wait for a minimum time to show the loader (for UX)
      setTimeout(() => {
        localStorage.setItem('madebywael-visited', 'true');
        setIsFirstVisit(false);
        setIsLoading(false);
      }, 2000); // 2 seconds minimum display time
    };

    // Check if document is already loaded
    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      // Wait for window load event
      window.addEventListener('load', handlePageLoad);
      return () => window.removeEventListener('load', handlePageLoad);
    }
  }, []);

  // Auto-detect fetch requests and show loading
  useEffect(() => {
    if (!isFirstVisit) return;

    let activeRequests = 0;
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      // Only track API requests to our own endpoints
      const url = args[0]?.toString() || '';
      if (url.startsWith('/api/')) {
        activeRequests++;
        setIsLoading(true);
      }

      try {
        const response = await originalFetch(...args);
        return response;
      } finally {
        if (url.startsWith('/api/')) {
          activeRequests--;
          if (activeRequests === 0) {
            // Small delay to prevent flickering
            setTimeout(() => {
              if (activeRequests === 0) {
                setIsLoading(false);
              }
            }, 500);
          }
        }
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [isFirstVisit]);

  const setLoading = (loading: boolean) => {
    if (isFirstVisit) {
      setIsLoading(loading);
    }
  };

  return (
    <AutoLoadingContext.Provider value={{ isLoading: isFirstVisit && isLoading, setLoading }}>
      {children}
    </AutoLoadingContext.Provider>
  );
}

export function useAutoLoading() {
  const context = useContext(AutoLoadingContext);
  if (context === undefined) {
    throw new Error('useAutoLoading must be used within an AutoLoadingProvider');
  }
  return context;
}
