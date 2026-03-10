const fs = require('fs');

const envFile = fs.readFileSync('.env', 'utf-8');
const urlMatch = envFile.match(/VITE_SUPABASE_URL=(.+)/);
const keyMatch = envFile.match(/VITE_SUPABASE_ANON_KEY=(.+)/);

const SUPABASE_URL = urlMatch[1].trim();
const SUPABASE_ANON_KEY = keyMatch[1].trim();

async function getSchema() {
    console.log("Fetching PostgREST OpenAPI schema...");
    const res = await fetch(`${SUPABASE_URL}/rest/v1/?apikey=${SUPABASE_ANON_KEY}`);
    const data = await res.json();

    console.log("Orders columns:", Object.keys(data.definitions.orders.properties));
    if (data.definitions.order_items) {
        console.log("Order items columns:", Object.keys(data.definitions.order_items.properties));
    }
}

getSchema();
