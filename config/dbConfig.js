import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

export default async function conectarAoBanco() {
    dotenv.config();

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase URL ou Key nao foram configurados corretamente.");
    }

    try{
        const supabase = createClient(supabaseUrl, supabaseKey);
        console.log("Conectado ao SupaBase!")
        return supabase
    } catch (e){
        console.error('Falha na conexão com o banco!', e);
        process.exit();
    }
}
