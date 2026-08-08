// Supabase OAuth Auth & REST Data Sync Helpers for ResumeBuilder.ai
export const SUPABASE_URL = 'https://tvsijqhfqivaiodkokpf.supabase.co';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2c2lqcWhmcWl2YWlvZGtva3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMTM5MTksImV4cCI6MjEwMTc4OTkxOX0.-eRivSoYyhEztVXWV5Ekwp7ZLDf3RLOllfRlgCDR4KE';

export function signInWithGoogleSupabase() {
  const redirectUrl = encodeURIComponent(window.location.origin);
  const googleAuthUrl = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${redirectUrl}`;
  window.location.href = googleAuthUrl;
}

// Fetch user resume from Supabase REST API
export async function fetchUserResumeFromSupabase(email) {
  if (!email) return null;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/resumes?email=eq.${encodeURIComponent(email)}&select=*`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        return data[0].resume_data;
      }
    } else {
      const errText = await res.text();
      console.error('Supabase fetch error:', res.status, errText);
    }
  } catch (err) {
    console.error('Failed to fetch resume from Supabase:', err);
  }
  return null;
}

// Save/Upsert user resume to Supabase REST API
export async function saveUserResumeToSupabase(email, resumeData, template, accentColor) {
  if (!email) return;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/resumes?on_conflict=email`,
      {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({
          email,
          resume_data: resumeData,
          template,
          accent_color: accentColor,
          updated_at: new Date().toISOString()
        })
      }
    );
    if (!res.ok) {
      const errText = await res.text();
      console.error('Supabase save error:', res.status, errText);
    }
  } catch (err) {
    console.error('Failed to save resume to Supabase:', err);
  }
}
