
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://szfoxvvqqtfzbwbuacgk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6Zm94dnZxcXRmemJ3YnVhY2drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwOTQ1MjYsImV4cCI6MjA4NDY3MDUyNn0.HOb0Qn3I0QisisyHGGN-koR4Ac6tL9pPVz4jxNKEFRk';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testConnection() {
    console.log('--- Testing Supabase Connection ---');

    // 1. Test Chefs Table
    console.log('\n1. Fetching Chefs (table: chefs)...');
    const { data: chefs, error: chefsError } = await supabase.from('chefs').select('*');
    if (chefsError) {
        console.error('❌ Error fetching chefs:', chefsError.message);
        if (chefsError.code === '42P01') console.error('   Hint: Table "chefs" does not exist.');
    } else {
        console.log(`✅ Success! Found ${chefs.length} chefs.`);
        if (chefs.length > 0) console.log('   Sample:', chefs[0]);
    }

    // 2. Test Products Table
    console.log('\n2. Fetching Products (table: products)...');
    const { data: products, error: productsError } = await supabase.from('products').select('*');
    if (productsError) {
        console.error('❌ Error fetching products:', productsError.message);
        if (productsError.code === '42P01') console.error('   Hint: Table "products" does not exist.');
    } else {
        console.log(`✅ Success! Found ${products.length} products.`);
    }

    // 3. Test Legacy Menu Items Table
    console.log('\n3. Fetching Menu Items (table: menu_items)...');
    const { data: menuItems, error: menuItemsError } = await supabase.from('menu_items').select('*');
    if (menuItemsError) {
        console.error('❌ Error fetching menu_items:', menuItemsError.message);
    } else {
        console.log(`✅ Success! Found ${menuItems.length} menu items.`);
        if (menuItems.length > 0) console.log('   Sample:', menuItems[0]);
    }
}

testConnection();
