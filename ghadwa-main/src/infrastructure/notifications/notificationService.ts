import { env } from '../../config/env';
import type { Order } from '@/core/domain/entities';
import { logger } from '@/infrastructure/logging/logger';

export interface NotificationPayload {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  items: string;
  totalPrice: number;
  notes?: string;
  timestamp: string;
}

export interface NotificationResponse {
  success: boolean;
  error?: string;
  retryAfter?: number;
}

export class NotificationService {
  private readonly webhookUrl: string;
  private readonly maxRetries: number = 3;
  private readonly baseDelay: number = 1000;

  constructor() {
    this.webhookUrl = env.webhookUrl || '';
  }

  async sendOrderNotification(order: Order): Promise<NotificationResponse> {
    if (!this.webhookUrl) {
      return {
        success: false,
        error: 'Webhook URL not configured'
      };
    }

    const payload = this.createNotificationPayload(order);
    return this.sendWithRetry(payload);
  }

  private createNotificationPayload(order: Order): NotificationPayload {
    return {
      orderId: order.id.toString(),
      customerName: order.customer,
      phoneNumber: order.phone,
      address: order.address,
      items: Array.isArray(order.items)
        ? order.items.map((i: any) => i.product_name || i.name || '').join(', ')
        : (String(order.items || '')),
      totalPrice: order.total,
      notes: '',
      timestamp: order.date,
    };
  }

  private async sendWithRetry(payload: NotificationPayload, attempt: number = 1): Promise<NotificationResponse> {
    try {
      const response = await this.sendWebhook(payload);

      if (response.success) {
        return response;
      }

      if (attempt < this.maxRetries && this.isRetryableError(response)) {
        const delay = this.calculateDelay(attempt);
        await this.sleep(delay);
        return this.sendWithRetry(payload, attempt + 1);
      }

      return response;
    } catch (error) {
      if (attempt < this.maxRetries) {
        const delay = this.calculateDelay(attempt);
        await this.sleep(delay);
        return this.sendWithRetry(payload, attempt + 1);
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private async sendWebhook(payload: NotificationPayload): Promise<NotificationResponse> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Ghadwa-Platform/1.0',
        },
        body: JSON.stringify({
          text: this.formatNotificationMessage(payload),
          ...payload,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        logger.info('NOTIFICATIONS', '✅ Webhook notification sent');
        return { success: true };
      }

      if (response.status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After') || '60');
        return {
          success: false,
          error: 'Rate limited',
          retryAfter,
        };
      }

      const errorText = await response.text().catch(() => 'Unknown error');
      return {
        success: false,
        error: `HTTP ${response.status}: ${errorText}`,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === 'AbortError') {
        return {
          success: false,
          error: 'Request timeout',
        };
      }

      throw error;
    }
  }

  private formatNotificationMessage(payload: NotificationPayload): string {
    const lines = [
      '🍽️ **طلب جديد - New Order**',
      '',
      `👤 **العميل - Customer:** ${payload.customerName}`,
      `📱 **الهاتف - Phone:** ${payload.phoneNumber}`,
      `📍 **العنوان - Address:** ${payload.address}`,
      '',
      `🍲 **الطلب - Order:** ${payload.items}`,
      `💰 **الإجمالي - Total:** ${payload.totalPrice} EGP`,
    ];

    if (payload.notes) {
      lines.push(`📝 **ملاحظات - Notes:** ${payload.notes}`);
    }

    lines.push('');
    lines.push(`🕐 **الوقت - Time:** ${payload.timestamp}`);
    lines.push(`🆔 **رقم الطلب - Order ID:** ${payload.orderId}`);

    return lines.join('\n');
  }

  private isRetryableError(response: NotificationResponse): boolean {
    if (!response.error) return false;

    const retryableErrors = [
      'Request timeout',
      'Rate limited',
      'Service temporarily unavailable',
    ];

    return retryableErrors.some(error =>
      response.error?.toLowerCase().includes(error.toLowerCase())
    ) || response.error.startsWith('HTTP 5');
  }

  private calculateDelay(attempt: number): number {
    return Math.min(this.baseDelay * Math.pow(2, attempt - 1), 30000);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const notificationService = new NotificationService();
