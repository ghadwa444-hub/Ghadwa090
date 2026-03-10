const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env', 'utf-8');
const urlMatch = envFile.match(/VITE_SUPABASE_URL=(.+)/);
const keyMatch = envFile.match(/VITE_SUPABASE_ANON_KEY=(.+)/);

const SUPABASE_URL = urlMatch[1].trim();
const SUPABASE_ANON_KEY = keyMatch[1].trim();

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkOrderItems() {
    console.log("Inserting empty order item...");
    const { data, error } = await supabase
        .from('order_items')
        .insert({})
        .select();

    if (error) {
        console.error("❌ ERROR:", error);
    } else {
        console.log("✅ DATA:", data);
    }
}

checkOrderItems();
