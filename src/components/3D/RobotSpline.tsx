"use client";

import { Suspense, useEffect, useState } from 'react';

// Create a wrapper component that loads Spline dynamically
function SplineWrapper({ scene, className }: { scene: string; className?: string }) {
  const [SplineComponent, setSplineComponent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSpline = async () => {
      try {
        // Try different import paths for the Spline component
        let SplineModule;
        try {
          SplineModule = await import('@splinetool/react-spline');
        } catch (e) {
          // If the above fails, try the Next.js specific import
          SplineModule = await import('@splinetool/react-spline/next');
        }
        
        // Get the default export
        const SplineComp = SplineModule.default || SplineModule;
        setSplineComponent(() => SplineComp);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load Spline component:', err);
        setError('Failed to load 3D scene');
        setIsLoading(false);
      }
    };

    loadSpline();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !SplineComponent) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-muted-foreground mb-2">🤖</div>
          <p className="text-sm text-muted-foreground">3D Scene Loading...</p>
        </div>
      </div>
    );
  }

  return <SplineComponent scene={scene} className={className} />;
}

export default function RobotSpline() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px]">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        }>
          <SplineWrapper
            scene="https://prod.spline.design/GSDoWZ4buHBMH-X5/scene.splinecode"
            className="w-full h-full"
          />
        </Suspense>
      </div>
    </div>
  );
}
