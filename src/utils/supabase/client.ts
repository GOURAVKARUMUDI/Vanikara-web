import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let clientInstance: any = null;

export const createClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or Anon Key is missing!');
  }
  if (typeof window === 'undefined') {
    return createBrowserClient(
      supabaseUrl!,
      supabaseKey!
    );
  }
  if (!clientInstance) {
    clientInstance = createBrowserClient(
      supabaseUrl!,
      supabaseKey!
    );
  }
  return clientInstance;
};
