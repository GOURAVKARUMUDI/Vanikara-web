/**
 * getURL: Returns the absolute base URL for the current environment.
 * Priority: 
 * 1. NEXT_PUBLIC_SITE_URL (e.g., https://vanikara-web.vercel.app)
 * 2. window.location.origin (Client-side)
 * 3. Fallback to production domain
 */
export const getURL = () => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    'https://vanikara-web.vercel.app';

  // Ensure 'http://' or 'https://' is included
  url = url.includes('http') ? url : `https://${url}`;
  
  // Remove trailing slash
  url = url.charAt(url.length - 1) === '/' ? url.slice(0, -1) : url;
  
  return url;
};
