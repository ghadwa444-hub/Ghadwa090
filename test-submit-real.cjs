const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env', 'utf-8');
const urlMatch = envFile.match(/VITE_SUPABASE_URL=(.+)/);
const keyMatch = envFile.match(/VITE_SUPABASE_ANON_KEY=(.+)/);

const SUPABASE_URL = urlMatch[1].trim();
const SUPABASE_ANON_KEY = keyMatch[1].trim();

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testSubmitOrderReal() {
    console.log("Simulating exact submitOrder transformation...");

    const order = {
        id: "some-uuid",
        chef_id: 1, // Number
        status: 'pending',
        subtotal: 1500,
        discount_amount: 0,
        total_amount: 1500,
        customer_name: "Hamaki",
        customer_phone: "01000000000",
        delivery_address: "Cairo",
        notes: "No onions",
        payment_method: 'cash',
        items: [
            {
                product_name: "وجبة كبيرة",
                quantity: 2,
                unit_price: 750,
                total_price: 1500,
                product_id: 4,
                image_url: "img.png",
                notes: ''
            }
        ],
        itemsDetails: [
            {
                name: "وجبة كبيرة",
                quantity: 2,
                price: 750,
                id: 4,
                image_url: "img.png"
            }
        ]
    };

    const { itemsDetails, items, ...orderData } = order;
    const orderItems = itemsDetails || items || [];

    // 1. Compute totals safely
    const subtotal = orderItems.reduce((sum, item) => sum + ((item.price || item.unit_price || 0) * (item.quantity || 1)), 0);
    const deliveryFee = orderData.delivery_fee || 0;
    const providedTotal = orderData.total_amount || orderData.total;
    const totalAmount = providedTotal ? Number(providedTotal) : (subtotal + deliveryFee);

    // 2. Insert parent order
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const chefIdVal = String(orderData.chef_id);
    const validChefId = uuidRegex.test(chefIdVal) ? chefIdVal : null;

    const dbOrder = {
        customer_name: orderData.customer_name || orderData.customer || orderData.name || 'عميل',
        customer_phone: orderData.customer_phone || orderData.phone || '',
        delivery_address: orderData.delivery_address || orderData.address || '',
        subtotal: subtotal,
        delivery_fee: deliveryFee,
        total_amount: totalAmount,
        discount_amount: orderData.discount_amount || 0,
        chef_id: validChefId,
        status: 'pending',
        payment_method: orderData.payment_method || 'cash',
        payment_status: 'pending',
        notes: orderData.notes || ''
    };

    console.log("\n--- ORDERS PAYLOAD ---");
    console.log(dbOrder);

    const { data: orderResult, error: orderError } = await supabase
        .from('orders')
        .insert(dbOrder)
        .select()
        .single();

    if (orderError || !orderResult) {
        console.error("❌ SUPABASE ORDERS ERROR:", JSON.stringify(orderError, null, 2));
        return;
    }

    // 3. Insert order items relation
    if (orderItems.length > 0) {
        const dbItems = orderItems.map((item) => ({
            order_id: orderResult.id,
            product_id: typeof item.id === 'string' && isNaN(Number(item.id)) ? null : (item.id || null),
            product_name: item.name || item.product_name || 'وجبة',
            quantity: item.quantity || 1,
            unit_price: item.price || item.unit_price || 0,
            total_price: (item.price || item.unit_price || 0) * (item.quantity || 1),
            image_url: item.img || item.image_url || '',
        }));

        console.log("\n--- ORDER ITEMS PAYLOAD ---");
        console.log(dbItems);

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(dbItems);

        if (itemsError) {
            console.error("❌ SUPABASE ITEMS ERROR:", JSON.stringify(itemsError, null, 2));
        } else {
            console.log("✅ FULL SUBMISSION SUCCESS");
        }
    }

    await supabase.from('orders').delete().eq('id', orderResult.id);
}

testSubmitOrderReal();
