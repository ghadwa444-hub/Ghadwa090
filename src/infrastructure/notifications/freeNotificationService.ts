import { env } from '../../config/env';
import type { Order } from '@/core/domain/entities';
import { emailNotificationService } from './emailNotificationService';
import { formspreeNotificationService } from './formspreeNotificationService';
import { notificationService } from './notificationService';
import { logger } from '@/infrastructure/logging/logger';

export interface FreeNotificationResponse {
  success: boolean;
  error?: string;
  service?: string;
}

export class FreeNotificationService {
  /**
   * Send notification using the first available free service
   */
  async sendOrderNotification(order: Order): Promise<FreeNotificationResponse> {
    const services = [
      {
        name: 'Formspree Email',
        enabled: !!env.emailWebhookUrl && env.emailWebhookUrl.includes('formspree.io'),
        service: formspreeNotificationService
      },
      {
        name: 'EmailJS',
        enabled: !!env.emailWebhookUrl && env.emailWebhookUrl.includes('emailjs.com') && !!env.emailUserId,
        service: emailNotificationService
      },
      {
        name: 'Generic Webhook',
        enabled: !!env.webhookUrl,
        service: notificationService
      }
    ];

    // Try each service in order until one succeeds
    for (const { name, enabled, service } of services) {
      if (!enabled) continue;

      try {
        const result = await service.sendOrderNotification(order);
        if (result.success) {
          logger.info('NOTIFICATIONS', `✅ Notification sent via ${name}`);
          return {
            success: true,
            service: name
          };
        }
      } catch (error) {
        logger.debug('NOTIFICATIONS', `⚠️ ${name} failed, trying next service`);
      }
    }

    logger.warn('NOTIFICATIONS', '⚠️ All notification services failed or not configured');
    return {
      success: false,
      error: 'All notification services failed or are not configured'
    };
  }

  /**
   * Send notification to all configured services
   */
  async sendToAllServices(order: Order): Promise<{
    results: Array<{ service: string; success: boolean; error?: string }>;
    overallSuccess: boolean;
  }> {
    const services = [
      {
        name: 'Formspree',
        enabled: !!env.emailWebhookUrl && env.emailWebhookUrl.includes('formspree.io'),
        service: formspreeNotificationService
      },
      {
        name: 'EmailJS',
        enabled: !!env.emailWebhookUrl && env.emailWebhookUrl.includes('emailjs.com'),
        service: emailNotificationService
      },
      {
        name: 'Webhook',
        enabled: !!env.webhookUrl,
        service: notificationService
      }
    ];

    const results = [];
    let successCount = 0;

    for (const { name, enabled, service } of services) {
      if (!enabled) {
        results.push({
          service: name,
          success: false,
          error: 'Service not configured'
        });
        continue;
      }

      try {
        const result = await service.sendOrderNotification(order);
        results.push({
          service: name,
          success: result.success,
          error: result.error
        });

        if (result.success) {
          successCount++;
        }
      } catch (error) {
        results.push({
          service: name,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return {
      results,
      overallSuccess: successCount > 0
    };
  }

  /**
   * Get available notification services
   */
  getAvailableServices(): Array<{ name: string; configured: boolean; url?: string }> {
    return [
      {
        name: 'EmailJS',
        configured: !!env.emailWebhookUrl && env.emailWebhookUrl.includes('emailjs.com') && !!env.emailUserId,
        url: env.emailWebhookUrl ? 'Configured' : undefined
      },
      {
        name: 'Formspree Email',
        configured: !!env.emailWebhookUrl && env.emailWebhookUrl.includes('formspree.io'),
        url: env.emailWebhookUrl ? 'Configured' : undefined
      },
      {
        name: 'Generic Webhook',
        configured: !!env.webhookUrl,
        url: env.webhookUrl ? 'Configured' : undefined
      }
    ];
  }

  /**
   * Test all configured services
   */
  async testAllServices(): Promise<Array<{ service: string; success: boolean; error?: string }>> {
    const testOrder: Order = {
      id: String(Date.now()),
      customer: 'Test Customer - عميل تجريبي',
      phone: '+201234567890',
      address: 'Test Address, Tanta, Egypt - عنوان تجريبي، طنطا، مصر',
      items: [{
        id: 'test-item-1',
        order_id: String(Date.now()),
        product_name: 'Test Meal - وجبة تجريبية',
        quantity: 1,
        unit_price: 50,
        total_price: 50
      }],
      total_amount: 50,
      subtotal: 50,
      discount_amount: 0,
      status: 'pending',
      itemsDetails: []
    };

    const result = await this.sendToAllServices(testOrder);
    return result.results;
  }
}

export const freeNotificationService = new FreeNotificationService();
