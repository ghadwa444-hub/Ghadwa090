const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env', 'utf-8');
const urlMatch = envFile.match(/VITE_SUPABASE_URL=(.+)/);
const keyMatch = envFile.match(/VITE_SUPABASE_ANON_KEY=(.+)/);

const SUPABASE_URL = urlMatch[1].trim();
const SUPABASE_ANON_KEY = keyMatch[1].trim();

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkLatestOrder() {
    console.log("Fetching latest orders from DB...");
    const { data, error } = await supabase
        .from('orders')
        .select('*, items:order_items(*)')
        .order('created_at', { ascending: false })
        .limit(3);

    if (error) {
        console.error("❌ ERROR:", error);
    } else {
        console.log("✅ LATEST ORDERS:");
        console.dir(data, { depth: null });
    }
}

checkLatestOrder();
