import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yiczxbaovvyjdmafgzag.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpY3p4YmFvdnZ5amRtYWZnemFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5Mjk3MzYsImV4cCI6MjA4ODUwNTczNn0.6su8dYO7Hb99_nlpwTap0IeT6rbArWN_eoVsYtxjeiw';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    console.log('Fetching chefs and menu items...');
    const { data: chefs } = await supabase.from('chefs').select('*');
    const { data: menu_items } = await supabase.from('menu_items').select('*');

    const enasList = chefs.filter(c => c.name && (c.name.includes('إيناس') || c.name.includes('ايناس') || c.name.includes('Enas')));

    console.log('Found Enas chefs:', enasList.map(c => ({ id: c.id, name: c.name })));

    if (enasList.length > 0) {
        const enas = enasList[0];

        // Find items that might belong to her
        const myItems = menu_items.filter(item =>
            (item.chef && (item.chef.includes('إيناس') || item.chef.includes('ايناس'))) ||
            (item.chef_id === enas.id)
        );

        console.log(`\nFound ${myItems.length} menu items possibly belonging to her:`);
        myItems.slice(0, 3).forEach(item => {
            console.log(`- Item Name: "${item.name}"`);
            console.log(`  item.chef: "${item.chef}" (Length: ${item.chef ? item.chef.length : 0})`);
            console.log(`  item.chef_id: "${item.chef_id}"`);
            console.log(`  chef.name (from DB): "${enas.name}" (Length: ${enas.name.length})`);
            console.log(`  Exact Match (toLowerCase): ${item.chef?.toLowerCase() === enas.name?.toLowerCase()}`);
            console.log(`  ID Match: ${item.chef_id === enas.id}`);
        });
    }
}

test().catch(console.error);
