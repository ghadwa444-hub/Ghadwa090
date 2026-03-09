/**
 * WhatsApp Notification System - Message Formatter
 * Creates formatted messages for different notification types
 */

import {
  OrderNotification,
  CustomerUpdateNotification,
  ChefNotification,
  MessageTemplate
} from './types'

/**
 * Format an order created notification for admin
 * @param order - Order details
 * @returns Formatted message
 */
export function formatOrderCreatedMessage(order: OrderNotification): string {
  const itemsList = order.items
    .map(item => `• ${item.name} x${item.quantity} - EGP ${item.price}`)
    .join('\n')

  const message = `🎉 *NEW ORDER #${order.orderId}*

*Customer:* ${order.customerName}
${order.customerPhone ? `*Phone:* ${order.customerPhone}\n` : ''}*Total:* EGP ${order.total}
*Chef:* ${order.chefName}
${order.deliveryAddress ? `*Address:* ${order.deliveryAddress}\n` : ''}
*Items:*
${itemsList}
${order.notes ? `\n*Notes:* ${order.notes}` : ''}

⏰ Please prepare the order. Customer is waiting!`

  return message
}

/**
 * Format an order confirmed message for admin
 * @param order - Order details
 * @returns Formatted message
 */
export function formatOrderConfirmedMessage(order: OrderNotification): string {
  const message = `✅ *ORDER CONFIRMED #${order.orderId}*

*Chef:* ${order.chefName}
*Total:* EGP ${order.total}
*Items:* ${order.items.length} ${order.items.length === 1 ? 'item' : 'items'}

Start preparing now! Estimated time: 30-45 minutes`

  return message
}

/**
 * Format a preparing status update for customer
 * @param notification - Update details
 * @returns Formatted message
 */
export function formatPreparingMessage(
  notification: CustomerUpdateNotification
): string {
  const message = `👨‍🍳 *Order #${notification.orderId} is being prepared*

*Chef:* ${notification.chefName}
*Status:* Your food is being freshly prepared
${notification.estimatedTime ? `*Est. Ready:* ${notification.estimatedTime}` : '*Est. Ready:* 30-45 minutes'}

Thank you for your patience!`

  return message
}

/**
 * Format an out for delivery status update for customer
 * @param notification - Update details
 * @returns Formatted message
 */
export function formatOutForDeliveryMessage(
  notification: CustomerUpdateNotification
): string {
  const message = `🚗 *Order #${notification.orderId} is out for delivery*

*Chef:* ${notification.chefName}
${notification.driverName ? `*Driver:* ${notification.driverName}\n` : ''}${notification.driverPhone ? `*Driver Phone:* ${notification.driverPhone}\n` : ''}${notification.estimatedTime ? `*Arriving in:* ${notification.estimatedTime}\n` : ''}
Keep an eye out! Your delicious meal is on the way! 🍽️`

  return message
}

/**
 * Format a delivered status update for customer
 * @param notification - Update details
 * @returns Formatted message
 */
export function formatDeliveredMessage(
  notification: CustomerUpdateNotification
): string {
  const message = `✅ *Order #${notification.orderId} has been delivered*

*Chef:* ${notification.chefName}
Enjoy your delicious meal! 😋

Please rate your experience to help us improve!`

  return message
}

/**
 * Format a cancelled order message for customer
 * @param orderId - Order ID
 * @param chefName - Chef name
 * @param reason - Cancellation reason
 * @returns Formatted message
 */
export function formatCancelledMessage(
  orderId: number,
  chefName: string,
  reason?: string
): string {
  const message = `❌ *Order #${orderId} has been cancelled*

*Chef:* ${chefName}
${reason ? `*Reason:* ${reason}\n` : ''}
Your payment has been refunded to your original payment method.

We hope to serve you again soon!`

  return message
}

/**
 * Format a chef new order notification
 * @param notification - Chef notification
 * @returns Formatted message
 */
export function formatChefNewOrderMessage(notification: ChefNotification): string {
  const itemsList = notification.items
    .map(item => `• ${item.name} (${item.quantity})`)
    .join('\n')

  const message = `📦 *NEW ORDER #${notification.orderId}*

*Customer:* ${notification.customerName}
${notification.deliveryAddress ? `*Deliver to:* ${notification.deliveryAddress}\n` : ''}
*Items to prepare:*
${itemsList}
${notification.specialInstructions ? `\n*Special Instructions:*\n${notification.specialInstructions}` : ''}

⏱️ Please start preparing immediately!`

  return message
}

/**
 * Get message formatter function for a template
 * @param template - Message template type
 * @returns Formatter function or null if template not found
 */
export function getMessageFormatter(
  template: MessageTemplate
): ((data: any) => string) | null {
  switch (template) {
    case MessageTemplate.ORDER_CREATED:
      return formatOrderCreatedMessage
    case MessageTemplate.ORDER_CONFIRMED:
      return formatOrderConfirmedMessage
    case MessageTemplate.PREPARING:
      return formatPreparingMessage
    case MessageTemplate.OUT_FOR_DELIVERY:
      return formatOutForDeliveryMessage
    case MessageTemplate.DELIVERED:
      return formatDeliveredMessage
    case MessageTemplate.CANCELLED:
      return (data: any) =>
        formatCancelledMessage(data.orderId, data.chefName, data.reason)
    default:
      return null
  }
}

/**
 * Utilities for message formatting
 */

/**
 * Escape special characters for WhatsApp markdown
 * WhatsApp supports basic markdown: *bold*, _italic_, ~strikethrough~
 * @param text - Text to escape
 * @returns Safe text
 */
export function escapeWhatsAppText(text: string): string {
  return text.replace(/[*_~`]/g, '\\$&')
}

/**
 * Create a safe WhatsApp message with character limit
 * @param message - Message to create
 * @param maxLength - Maximum length (default: 4096)
 * @returns Safe message
 */
export function createSafeMessage(message: string, maxLength: number = 4096): string {
  if (message.length <= maxLength) {
    return message
  }

  // Truncate and add indicator
  return message.substring(0, maxLength - 4) + '...'
}

/**
 * Format time duration for display
 * @param minutes - Number of minutes
 * @returns Formatted time (e.g., "30-45 minutes", "1 hour")
 */
export function formatEstimatedTime(minutes: number): string {
  if (minutes < 60) {
    const range = Math.ceil(minutes * 1.5)
    return `${minutes}-${range} minutes`
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (remainingMinutes === 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`
  }

  return `${hours}h ${remainingMinutes}m`
}

/**
 * Format currency for display
 * @param amount - Amount in EGP
 * @returns Formatted amount (e.g., "EGP 150.50")
 */
export function formatCurrency(amount: number): string {
  return `EGP ${amount.toFixed(2)}`
}

/**
 * Format phone number for display
 * @param phone - Phone number with country code
 * @returns Formatted phone (e.g., "+20 1109 318581")
 */
export function formatPhoneForDisplay(phone: string): string {
  if (!phone.startsWith('+')) return phone

  // For Egypt numbers: +20 XXXX XXXXXX
  if (phone.startsWith('+20')) {
    const num = phone.substring(3)
    return `+20 ${num.substring(0, 4)} ${num.substring(4)}`
  }

  // For other numbers: keep as is
  return phone
}
