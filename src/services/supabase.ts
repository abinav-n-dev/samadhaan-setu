import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export function isSupabaseConfigured(): boolean {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  const cleanUrl = supabaseUrl.trim();
  const cleanKey = supabaseAnonKey.trim();
  if (!cleanUrl || !cleanKey) return false;
  if (cleanUrl.includes('your-project-id') || cleanKey.includes('eyJhbGciOiJIUzI1NiIs...')) return false;
  try {
    const parsed = new URL(cleanUrl);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

let clientInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!clientInstance) {
    try {
      clientInstance = createClient(supabaseUrl!.trim(), supabaseAnonKey!.trim(), {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });
    } catch (err) {
      console.warn('[SamadhanSetu] Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return clientInstance;
}

export async function testSupabaseConnection(): Promise<{ success: boolean; message: string; latencyMs?: number }> {
  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      message: 'Supabase credentials not configured. Running in local/offline storage mode.',
    };
  }

  const start = performance.now();
  try {
    const { error } = await client.from('challenges').select('id').limit(1);
    const latency = Math.round(performance.now() - start);

    if (error) {
      return {
        success: false,
        message: `Database query error: ${error.message} (${error.code || 'UNKNOWN'})`,
        latencyMs: latency,
      };
    }

    return {
      success: true,
      message: 'Connected to Supabase PostgreSQL database successfully.',
      latencyMs: latency,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Network error connecting to Supabase endpoint.',
    };
  }
}
