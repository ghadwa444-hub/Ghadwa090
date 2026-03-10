const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env', 'utf-8');
const urlMatch = envFile.match(/VITE_SUPABASE_URL=(.+)/);
const keyMatch = envFile.match(/VITE_SUPABASE_ANON_KEY=(.+)/);

const SUPABASE_URL = urlMatch[1].trim();
const SUPABASE_ANON_KEY = keyMatch[1].trim();

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkOrderItems() {
    console.log("Fetching order_items table CSV to see headers...");
    const { data, error } = await supabase
        .from('order_items')
        .select('*')
        .limit(0)
        .csv();

    if (error) {
        console.error("❌ ERROR:", error);
    } else {
        console.log("✅ ORDER ITEMS COLUMNS:\n", data);
    }
}

checkOrderItems();
