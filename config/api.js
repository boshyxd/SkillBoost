const isDev = process.env.NODE_ENV === 'development';

// In development, use local API routes
// In production, use the deployed API URL
export const API_BASE_URL = isDev 
  ? '/api' 
  : 'https://skillboost-api.vercel.app/api';

export const getApiUrl = (path) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
}; 