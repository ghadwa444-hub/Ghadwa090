import { env } from '../../config/env';
import type { Order } from '@/core/domain/entities';
import { logger } from '@/infrastructure/logging/logger';

export interface FormspreeNotificationResponse {
  success: boolean;
  error?: string;
}

export class FormspreeNotificationService {
  private readonly webhookUrl: string;

  constructor() {
    this.webhookUrl = env.emailWebhookUrl || '';
  }

  async sendOrderNotification(order: Order): Promise<FormspreeNotificationResponse> {
    if (!this.webhookUrl || !this.webhookUrl.includes('formspree.io')) {
      return {
        success: false,
        error: 'Formspree webhook URL not configured'
      };
    }

    const payloadData = this.createFormspreePayload(order);

    // Use URLSearchParams to mimic standard form submission (x-www-form-urlencoded)
    // This exactly matches how 'curl -d' works, which was confirmed to work.
    const params = new URLSearchParams();
    Object.keys(payloadData).forEach(key => {
      params.append(key, payloadData[key]);
    });

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString(),
      });

      if (response.ok) {
        logger.info('NOTIFICATIONS', '✅ Formspree email sent');
        return { success: true };
      } else {
        return {
          success: false,
          error: `HTTP ${response.status}: ${await response.text()}`
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private createFormspreePayload(order: Order): any {
    // Format items list properly
    const formattedItems = order.items.map(item =>
      `- ${item.product_name} (${item.quantity}x) - ${item.total_price} EGP`
    ).join('\n');

    const subject = `🍽️ طلب جديد - New Order #${order.id}`;

    const message = `
🍽️ طلب جديد - New Order

معلومات العميل - Customer Information:
👤 الاسم - Name: ${order.customer}
📱 الهاتف - Phone: ${order.phone}
📍 العنوان - Address: ${order.address}

تفاصيل الطلب - Order Details:
${formattedItems}

💰 الإجمالي - Total: ${order.total} EGP

معلومات إضافية - Additional Information:
🕐 تاريخ الطلب - Order Date: ${order.date}
🆔 رقم الطلب - Order ID: ${order.id}
📊 الحالة - Status: ${order.status}

---
تم إرسال هذا الإشعار تلقائياً من منصة غدوة
This notification was sent automatically from Ghadwa Platform
    `;

    return {
      _subject: subject,
      message: message,
      email: env.notificationEmail,
      _replyto: env.notificationEmail, // Use admin email as reply-to for now often ensures delivery
      customer_name: order.customer,
      phone: order.phone,
      address: order.address,
      items: formattedItems,
      price: order.total,
      order_id: order.id.toString(),
      timestamp: order.date
    };
  }
}

export const formspreeNotificationService = new FormspreeNotificationService();
