import { env } from '../../config/env';
import type { Order } from '@/core/domain/entities';
import { logger } from '@/infrastructure/logging/logger';

export interface EmailNotificationResponse {
  success: boolean;
  error?: string;
}

export class EmailNotificationService {
  private readonly emailWebhookUrl: string;

  constructor() {
    this.emailWebhookUrl = env.emailWebhookUrl || '';
  }

  async sendOrderNotification(order: Order): Promise<EmailNotificationResponse> {
    if (!this.emailWebhookUrl) {
      return {
        success: false,
        error: 'Email webhook URL not configured'
      };
    }

    const payload = this.createEmailPayload(order);
    
    try {
      const response = await fetch(this.emailWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        logger.info('NOTIFICATIONS', '✅ Email notification sent');
        return { success: true };
      } else {
        return {
          success: false,
          error: `HTTP ${response.status}`
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Network error'
      };
    }
  }

  private createEmailPayload(order: Order): any {
    return {
      service_id: env.emailServiceId,
      template_id: env.emailTemplateId,
      user_id: env.emailUserId,
      template_params: {
        from_name: 'Ghadwa Platform',
        to_email: env.notificationEmail,
        customer_name: order.customer,
        phone: order.phone,
        address: order.address,
        items: order.items,
        price: order.total,
        notes: 'لا توجد ملاحظات - No notes',
        order_id: order.id.toString(),
        timestamp: order.date
      }
    };
  }
}

export const emailNotificationService = new EmailNotificationService();
