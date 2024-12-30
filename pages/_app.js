import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Handle base path redirection
    if (window.location.pathname.startsWith('/SkillBoost/')) {
      const newPath = window.location.pathname.replace('/SkillBoost', '');
      router.replace(newPath);
    }
  }, [router]);

  return (
    <ErrorBoundary>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  );
}

export default MyApp;