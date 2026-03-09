import { Chef, Product, Box, Order, PromoCode, ContactSettings } from '@/core/domain/entities';




export const MOCK_CHEFS: Chef[] = [
    {
        id: 'chef-1',
        chef_name: 'الشيف أميرة',
        specialty: 'أكل شرقي',
        description: 'أكلات بيتي أصيلة بنفس بتاع زمان',
        image_url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        cover_image_url: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        working_hours: 'يوميًا 10ص - 10م',
        delivery_time: '60 دقيقة',
        rating: 4.8,
        is_active: true
    },
    {
        id: 'chef-2',
        chef_name: 'الشيف هبة',
        specialty: 'معجنات و مخبوزات',
        description: 'أحلى المخبوزات والفطائر الطازة',
        image_url: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        working_hours: '9ص - 9م',
        delivery_time: '45 دقيقة',
        rating: 4.9,
        is_active: true
    },
    {
        id: 'chef-3',
        chef_name: 'الشيف فاطمة',
        specialty: 'محاشي وطواجن',
        description: 'متخصصة في جميع أنواع المحاشي والطواجن الفلاحي',
        image_url: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        working_hours: '11ص - 8م',
        delivery_time: '90 دقيقة',
        rating: 4.7,
        is_active: true
    }
];

export const MOCK_MENU: Product[] = [
    {
        id: 'meal-1',
        chef_id: 'chef-1',
        name: 'طاجن بامية باللحمة',
        description: 'بامية خضراء طازجة مع قطع اللحم الضاني',
        price: 150,
        image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'طواجن',
        is_available: true,
        is_featured: true,
        is_offer: false
    },
    {
        id: 'meal-2',
        chef_id: 'chef-1',
        name: 'ملوخية وفراخ محمرة',
        description: 'ملوخية خضراء مع نصف فرخة محمرة وأرز',
        price: 120,
        image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'طيور',
        is_available: true,
        is_featured: false,
        is_offer: true,
        original_price: 140,
        offer_price: 120
    },
    {
        id: 'meal-3',
        chef_id: 'chef-2',
        name: 'فطيرة مشلتت',
        description: 'فطير مشلتت بالسمنة البلدي والعسل',
        price: 80,
        image_url: 'https://images.unsplash.com/photo-1510696350360-1e5b8e950854?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'فطائر',
        is_available: true,
        is_featured: true,
        is_offer: false
    },
    {
        id: 'meal-4',
        chef_id: 'chef-3',
        name: 'محشي مشكل',
        description: 'كيلو محشي مشكل (كرنب، ورق عنب، كوسة، باذنجان)',
        price: 200,
        image_url: 'https://images.unsplash.com/photo-1541544744-378ca6e89762?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'محاشي',
        is_available: true,
        is_featured: true,
        is_offer: false
    },
    // Healthy Items
    {
        id: 'meal-healthy-1',
        chef_id: 'chef-1',
        name: 'صدور دجاج مشوية',
        description: 'صدور دجاج متبلة بالأعشاب ومشوية بدون زيوت',
        price: 130,
        image_url: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'healthy',
        is_available: true,
        is_featured: false,
        is_offer: false
    },
    {
        id: 'meal-healthy-2',
        chef_id: 'chef-2',
        name: 'سلطة كينوا',
        description: 'سلطة كينوا مع خضروات طازجة وصوص ليمون',
        price: 90,
        image_url: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'healthy',
        is_available: true,
        is_featured: false,
        is_offer: false
    },
    {
        id: 'meal-healthy-3',
        chef_id: 'chef-3',
        name: 'سمك فيليه مشوي',
        description: 'سمك فيليه طازج مشوي بالليمون والكمون',
        price: 160,
        image_url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a3a2b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'healthy',
        is_available: true,
        is_featured: false,
        is_offer: false
    },
    // Frozen Items
    {
        id: 'meal-frozen-1',
        chef_id: 'chef-1',
        name: 'ورق عنب مجمد',
        description: 'ورق عنب ملفوف جاهز على التسوية (طبق كيلو)',
        price: 180,
        image_url: 'https://images.unsplash.com/photo-1544025162-d76690b609caa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'frozen',
        is_available: true,
        is_featured: false,
        is_offer: false
    },
    {
        id: 'meal-frozen-2',
        chef_id: 'chef-2',
        name: 'كبة شامي مفرزة',
        description: 'كبة شامي محشوة لحم ومكسرات (12 قطعة)',
        price: 150,
        image_url: 'https://images.unsplash.com/photo-1606756209587-6e467d5ae3e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'frozen',
        is_available: true,
        is_featured: false,
        is_offer: false
    },
    {
        id: 'meal-frozen-3',
        chef_id: 'chef-3',
        name: 'برجر لحم بلدي',
        description: 'برجر لحم بلدي صافي متبل (6 قطع)',
        price: 190,
        image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'frozen',
        is_available: true,
        is_featured: false,
        is_offer: false
    },
    {
        id: 'meal-frozen-4',
        chef_id: 'chef-1',
        name: 'سمبوسك جبنة',
        description: 'سمبوسك بحشوة الجبنة المشكلة والنعناع (20 قطعة)',
        price: 85,
        image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        category: 'frozen',
        is_available: true,
        is_featured: false,
        is_offer: false
    }
];

export const MOCK_BOXES: Box[] = [
    {
        id: 1,
        name: 'بوكس العزومة',
        description: 'يكفي 4 أفراد - محشي، فراخ، جلاش، وأرز',
        price: 650,
        image_url: 'https://images.unsplash.com/photo-1544025162-d76690b609caa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        items_count: 4,
        is_active: true,
        chef_id: 'chef-1',
        chef: 'الشيف أميرة'
    },
    {
        id: 2,
        name: 'بوكس التوفير',
        description: 'وجبة اقتصادية متكاملة لفردين',
        price: 250,
        image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        items_count: 2,
        is_active: true,
        chef_id: 'chef-3',
        chef: 'الشيف فاطمة'
    }
];

export const MOCK_OFFERS: Product[] = MOCK_MENU.filter(item => item.is_offer);

export const MOCK_BEST_SELLERS: Product[] = MOCK_MENU.filter(item => item.is_featured);

export const MOCK_PROMOS: PromoCode[] = [
    {
        id: 'promo-1',
        code: 'WELCOME20',
        discount_type: 'percentage',
        discount_value: 20,
        min_order_amount: 100,
        current_uses: 50,
        is_active: true
    }
];

export const MOCK_SETTINGS: ContactSettings = {
    id: 'settings-1',
    phone: '01000000000',
    email: 'info@ghadwa.com',
    address: 'القاهرة، مصر',
    working_hours: 'يوميًا من 10 صباحًا حتى 10 مساءً'
};

export const MOCK_ORDERS: Order[] = [
    {
        id: 'order-1',
        customer_id: 'user-1',
        customer: 'أحمد محمد',
        customer_name: 'أحمد محمد',
        phone: '01012345678',
        customer_phone: '01012345678',
        address: 'القاهرة، مدينة نصر',
        delivery_address: 'القاهرة، مدينة نصر',
        status: 'pending',
        total: 270,
        total_amount: 270,
        subtotal: 250,
        discount_amount: 20,
        itemsDetails: [
            { ...MOCK_MENU[0]!, quantity: 1, product_name: MOCK_MENU[0]!.name, unit_price: MOCK_MENU[0]!.price, total_price: MOCK_MENU[0]!.price },
            { ...MOCK_MENU[1]!, quantity: 1, product_name: MOCK_MENU[1]!.name, unit_price: MOCK_MENU[1]!.price, total_price: MOCK_MENU[1]!.price }
        ],
        created_at: new Date().toISOString(),
        order_number: 'GHD-1001'
    },
    {
        id: 'order-2',
        customer_id: 'user-2',
        customer: 'سارة أحمد',
        customer_name: 'سارة أحمد',
        phone: '01112345678',
        customer_phone: '01112345678',
        address: 'الجيزة، الدقي',
        delivery_address: 'الجيزة، الدقي',
        status: 'delivered',
        total: 650,
        total_amount: 650,
        subtotal: 650,
        discount_amount: 0,
        itemsDetails: [
            { ...MOCK_BOXES[0]!, quantity: 1, product_name: MOCK_BOXES[0]!.name, unit_price: MOCK_BOXES[0]!.price, total_price: MOCK_BOXES[0]!.price }
        ],
        created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        order_number: 'GHD-1000'
    }
];
