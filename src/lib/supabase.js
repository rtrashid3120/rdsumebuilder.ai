// Supabase OAuth Auth Helpers for ResumeBuilder.ai
export const SUPABASE_URL = 'https://tvsijqhfqivaiodkokpf.supabase.co';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

export function signInWithGoogleSupabase() {
  const redirectUrl = encodeURIComponent(window.location.origin);
  const googleAuthUrl = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${redirectUrl}`;
  window.location.href = googleAuthUrl;
}
