// Centralized environment wrapper for client code
// Use import.meta.env for build-time vars, and allow an optional runtime override via window.__APP_CONFIG__

const runtime = typeof window !== 'undefined' ? (window as any).__APP_CONFIG__ || {} : {};

// No hardcoded fallback: the build must be run with --mode dev or --mode prod (see vite.config.ts).
export const API_BASE: string = runtime.API_BASE || (import.meta.env.VITE_API_BASE as string);

if (!API_BASE) {
  throw new Error('API_BASE is not configured. Build/run with --mode dev or --mode prod.');
}

export const IS_DEV = import.meta.env.DEV === true;
export const IS_PROD = import.meta.env.PROD === true;

export function getApiBase(): string {
  return API_BASE.replace(/\/$/, '');
}

export default {
  API_BASE,
  IS_DEV,
  IS_PROD,
  getApiBase,
};
