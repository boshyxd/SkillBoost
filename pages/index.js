'use strict';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    let mounted = true;

    const handleNavigation = async () => {
      if (!loading && !isNavigating && mounted) {
        setIsNavigating(true);
        try {
          const path = user ? '/explore' : '/login';
          // Add a small delay to prevent rapid navigation
          await new Promise(resolve => setTimeout(resolve, 100));
          if (mounted) {
            await router.replace(path, undefined, { 
              shallow: true,
              scroll: false 
            });
          }
        } catch (error) {
          console.error('Navigation error:', error);
          if (mounted) {
            setIsNavigating(false);
          }
        }
      }
    };

    handleNavigation();

    return () => {
      mounted = false;
    };
  }, [user, loading, router, isNavigating]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <LoadingSpinner />
    </div>
  );
}

export default Home; 