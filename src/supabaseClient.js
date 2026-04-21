import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kxquotukaarcvecrtzhs.supabase.co"
const supabaseAnonKey = "sb_publishable_O_o6TbbCDrhk1yNGFywBYA_uqJdn8Wa"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)