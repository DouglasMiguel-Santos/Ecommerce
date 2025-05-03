import { createClient } from "@supabase/supabase-js";

// criando conexão com o banco de dados atravez da variavel supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key são necessários.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
