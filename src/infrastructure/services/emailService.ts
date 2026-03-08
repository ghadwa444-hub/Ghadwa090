/**
 * Email Service for Order Notifications
 * Uses FormSubmit.co - Free email service for forms
 * 
 * Features:
 * - No registration required
 * - No API keys needed
 * - Just use your email address
 * - Free and unlimited
 */

// Admin email to receive order notifications
const ADMIN_EMAIL = 'ghadwa444@gmail.com';
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${ADMIN_EMAIL}`;

interface OrderEmailData {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    orderItems: { name: string; quantity: number; price: number }[];
    subtotal: number;
    discount: number;
    total: number;
    notes?: string;
    deliveryDate?: string;
    deliveryTime?: string;
}

/**
 * Format currency for display
 */
function formatCurrency(amount: number): string {
    return `${amount.toFixed(0)} ج.م`;
}

/**
 * Format order items as HTML table rows
 */
function formatOrderItemsHTML(items: { name: string; quantity: number; price: number }[]): string {
    return items
        .map(item => `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.name}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: left;">${formatCurrency(item.price * item.quantity)}</td>
            </tr>
        `)
        .join('');
}

/**
 * Generate order ID based on timestamp
 */
function generateOrderId(): string {
    return `#${Date.now().toString().slice(-6)}`;
}

/**
 * Format the complete order as HTML email
 */
function formatOrderHTML(orderData: OrderEmailData): string {
    const orderId = generateOrderId();
    const orderDate = new Date().toLocaleString('ar-EG', {
        dateStyle: 'long',
        timeStyle: 'short'
    });

    const deliveryInfo = orderData.deliveryDate && orderData.deliveryTime
        ? `${orderData.deliveryDate} - ${orderData.deliveryTime}`
        : 'توصيل فوري';

    return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <style>
        * { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; background: #fff; }
        .header { background: linear-gradient(135deg, #8B2525, #a63030); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
        .header h1 { margin: 0; font-size: 28px; }
        .header .order-id { font-size: 18px; opacity: 0.9; margin-top: 8px; }
        .content { padding: 25px; }
        .section { background: #f8f9fa; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
        .section-title { color: #8B2525; font-size: 16px; font-weight: bold; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; }
        .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .info-label { color: #666; }
        .info-value { font-weight: bold; color: #333; }
        .items-table { width: 100%; border-collapse: collapse; }
        .items-table th { background: #8B2525; color: white; padding: 12px; text-align: right; }
        .items-table th:last-child { text-align: left; }
        .total-section { background: #8B2525; color: white; border-radius: 12px; padding: 20px; text-align: center; }
        .total-amount { font-size: 32px; font-weight: bold; }
        .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
    </style>
</head>
<body style="background: #f0f0f0; padding: 20px;">
    <div class="container">
        <div class="header">
            <h1>🎉 طلب جديد من غدوة!</h1>
            <div class="order-id">رقم الطلب: ${orderId}</div>
        </div>
        
        <div class="content">
            <!-- Customer Info -->
            <div class="section">
                <div class="section-title">👤 بيانات العميل</div>
                <div class="info-row">
                    <span class="info-label">الاسم</span>
                    <span class="info-value">${orderData.customerName}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">رقم الهاتف</span>
                    <span class="info-value" dir="ltr">${orderData.customerPhone}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">العنوان</span>
                    <span class="info-value">${orderData.deliveryAddress}</span>
                </div>
            </div>

            <!-- Order Items -->
            <div class="section">
                <div class="section-title">🛒 تفاصيل الطلب</div>
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>الصنف</th>
                            <th style="text-align: center;">الكمية</th>
                            <th style="text-align: left;">السعر</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${formatOrderItemsHTML(orderData.orderItems)}
                    </tbody>
                </table>
            </div>

            <!-- Delivery Info -->
            <div class="section">
                <div class="section-title">🚚 التوصيل</div>
                <div class="info-row">
                    <span class="info-label">موعد التوصيل</span>
                    <span class="info-value">${deliveryInfo}</span>
                </div>
                ${orderData.notes ? `
                <div class="info-row">
                    <span class="info-label">ملاحظات</span>
                    <span class="info-value">${orderData.notes}</span>
                </div>
                ` : ''}
            </div>

            <!-- Totals -->
            <div class="section">
                <div class="section-title">💰 الحساب</div>
                <div class="info-row">
                    <span class="info-label">المجموع</span>
                    <span class="info-value">${formatCurrency(orderData.subtotal)}</span>
                </div>
                ${orderData.discount > 0 ? `
                <div class="info-row" style="color: #22c55e;">
                    <span class="info-label">الخصم</span>
                    <span class="info-value">- ${formatCurrency(orderData.discount)}</span>
                </div>
                ` : ''}
            </div>

            <!-- Total Amount -->
            <div class="total-section">
                <div style="font-size: 14px; opacity: 0.9;">الإجمالي النهائي</div>
                <div class="total-amount">${formatCurrency(orderData.total)}</div>
            </div>
        </div>

        <div class="footer">
            <p>تم الطلب في: ${orderDate}</p>
            <p>غدوة - أكل بيتي من شيفات موثوقين 🍽️</p>
        </div>
    </div>
</body>
</html>
    `.trim();
}

/**
 * Send order notification email to admin using FormSubmit
 */
export const sendOrderEmail = async (orderData: OrderEmailData): Promise<boolean> => {
    try {
        const orderId = generateOrderId();
        const htmlContent = formatOrderHTML(orderData);

        // Format items for plain text fallback
        const itemsText = orderData.orderItems
            .map(item => `${item.name} × ${item.quantity} = ${formatCurrency(item.price * item.quantity)}`)
            .join(' | ');

        // FormSubmit form data
        const formData = {
            _subject: `🎉 طلب جديد ${orderId} - ${orderData.customerName}`,
            _template: 'table',
            _captcha: 'false',
            _autoresponse: 'false',

            // Structured data for table template
            'رقم الطلب': orderId,
            'اسم العميل': orderData.customerName,
            'رقم الموبايل': orderData.customerPhone,
            'العنوان الكامل': orderData.deliveryAddress,
            'الأصناف': itemsText,
            'المجموع': formatCurrency(orderData.subtotal),
            'الخصم': orderData.discount > 0 ? formatCurrency(orderData.discount) : '—',
            'الإجمالي': `⭐ ${formatCurrency(orderData.total)}`,
            'موعد التوصيل': orderData.deliveryDate && orderData.deliveryTime
                ? `${orderData.deliveryDate} الساعة ${orderData.deliveryTime}`
                : '🚚 توصيل فوري',
            'ملاحظات': orderData.notes || '—',
        };

        const response = await fetch(FORMSUBMIT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            console.log('✅ تم إرسال إشعار الطلب بنجاح!');
            return true;
        } else {
            console.error('❌ فشل إرسال الإيميل:', await response.text());
            return false;
        }
    } catch (error) {
        console.error('❌ خطأ في إرسال الإيميل:', error);
        return false;
    }
};

/**
 * Format order for WhatsApp message
 */
export const formatOrderForWhatsApp = (orderData: OrderEmailData): string => {
    const orderId = generateOrderId();
    const itemsList = orderData.orderItems
        .map(item => `• ${item.name} ×${item.quantity} = ${formatCurrency(item.price * item.quantity)}`)
        .join('\n');

    return `
🎉 *طلب جديد ${orderId}*

👤 *العميل:* ${orderData.customerName}
📞 *الهاتف:* ${orderData.customerPhone}
📍 *العنوان:* ${orderData.deliveryAddress}

🛒 *الطلب:*
${itemsList}

💰 *الإجمالي:* ${formatCurrency(orderData.total)}
${orderData.discount > 0 ? `🎫 *الخصم:* ${formatCurrency(orderData.discount)}` : ''}

🚚 *التوصيل:* ${orderData.deliveryDate ? `${orderData.deliveryDate} - ${orderData.deliveryTime}` : 'فوري'}
${orderData.notes ? `📝 *ملاحظات:* ${orderData.notes}` : ''}
    `.trim();
};
