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
    const handleNavigation = async () => {
      if (!loading && !isNavigating) {
        setIsNavigating(true);
        try {
          const path = user ? '/explore' : '/login';
          await router.replace(path, undefined, { shallow: true });
        } catch (error) {
          console.error('Navigation error:', error);
          setIsNavigating(false);
        }
      }
    };

    handleNavigation();
  }, [user, loading, router, isNavigating]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <LoadingSpinner />
    </div>
  );
}

export default Home; 