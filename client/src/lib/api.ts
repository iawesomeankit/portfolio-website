// Base URL for the Express API.
// Dev: empty (Vite proxies /api → localhost:5000).
// Prod: set VITE_API_URL=https://your-backend.onrender.com (no trailing slash).
export const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ?? "";

export const api = (path: string) => `${API_BASE}${path}`;
