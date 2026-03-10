const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env', 'utf-8');
const urlMatch = envFile.match(/VITE_SUPABASE_URL=(.+)/);
const keyMatch = envFile.match(/VITE_SUPABASE_ANON_KEY=(.+)/);

const SUPABASE_URL = urlMatch[1].trim();
const SUPABASE_ANON_KEY = keyMatch[1].trim();

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testSubmitOrder() {
    console.log("Simulating submitOrder payload with UUID fix...");

    // 1. Insert parent order
    const dbOrder = {
        customer_name: 'عميل',
        customer_phone: '01000000000',
        delivery_address: 'العنوان',
        subtotal: 100,
        delivery_fee: 0,
        total_amount: 100,
        discount_amount: 0,
        chef_id: null,
        status: 'pending',
        payment_method: 'cash',
        payment_status: 'pending',
        notes: ''
    };

    const { data: orderResult, error: orderError } = await supabase
        .from('orders')
        .insert(dbOrder)
        .select()
        .single();

    if (orderError) {
        console.error("❌ ERROR ON ORDER INSERT:", JSON.stringify(orderError, null, 2));
        return;
    }

    console.log("✅ ORDER CREATED:", orderResult.id);

    // 2. Insert items
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const idStr = "4";
    const isValidUuid = uuidRegex.test(idStr);

    const dbItems = [{
        order_id: orderResult.id,
        product_id: isValidUuid ? idStr : null,
        product_name: 'وجبة',
        quantity: 1,
        unit_price: 100,
        total_price: 100,
        image_url: '',
    }];

    const { error: itemsError } = await supabase
        .from('order_items')
        .insert(dbItems);

    if (itemsError) {
        console.error("❌ ERROR ON ITEMS INSERT:", JSON.stringify(itemsError, null, 2));
    } else {
        console.log("✅ ITEMS CREATED");
    }

    // Cleanup
    await supabase.from('orders').delete().eq('id', orderResult.id);
}

testSubmitOrder();
