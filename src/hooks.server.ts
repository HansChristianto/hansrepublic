import type { Handle } from '@sveltejs/kit';

/**
 * Security headers for the application
 * https://kit.svelte.dev/docs/hooks#handle
 */
export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  // Content Security Policy
  // Restrict resources to same origin and trusted sources
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Svelte needs unsafe-inline for inline scripts
      "style-src 'self' 'unsafe-inline'", // Tailwind needs unsafe-inline
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://*", // Allow API calls
      "frame-ancestors 'none'", // Prevent clickjacking
      "form-action 'self'", // Prevent form redirection
      "base-uri 'self'",
    ].join('; ')
  );

  // X-Content-Type-Options
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // X-Frame-Options
  response.headers.set('X-Frame-Options', 'DENY');

  // X-XSS-Protection (legacy but still useful)
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Referrer Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions Policy
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  return response;
};
