/**
 * WhatsApp Notification System - Type Definitions
 * Defines interfaces and types for WhatsApp message sending
 */

/**
 * Options for sending a WhatsApp message
 */
export interface SendWhatsAppOptions {
  /** Recipient WhatsApp phone number with country code (e.g., +201109318581) */
  phone: string

  /** Message content (will be automatically URL-encoded) */
  message: string

  /** Optional: Custom API key (defaults to CALLMEBOT_API_KEY env variable) */
  apiKey?: string

  /** Optional: Custom API base URL (defaults to CallMeBot endpoint) */
  baseUrl?: string
}

/**
 * Result of sending a WhatsApp message
 */
export interface SendWhatsAppResult {
  /** Whether message was sent successfully */
  success: boolean

  /** Recipient phone number (masked for security) */
  phone: string

  /** Message length in characters */
  messageLength: number

  /** ISO timestamp when message was sent */
  timestamp: string

  /** Raw API response (if available) */
  apiResponse?: {
    status?: number
    statusText?: string
    body?: string
  }
}

/**
 * Configuration for WhatsApp service
 */
export interface WhatsAppConfig {
  /** Default recipient phone number */
  phone: string

  /** CallMeBot API key */
  apiKey: string

  /** CallMeBot API base URL */
  baseUrl: string

  /** Whether to log requests (development only) */
  debug: boolean
}

/**
 * Order details for admin notification
 */
export interface OrderNotification {
  /** Unique order ID */
  orderId: number

  /** Customer's full name */
  customerName: string

  /** Customer's phone number */
  customerPhone?: string

  /** Order total amount */
  total: number

  /** Chef's name */
  chefName: string

  /** Delivery address */
  deliveryAddress?: string

  /** Order items */
  items: Array<{
    name: string
    quantity: number
    price: number
  }>

  /** Additional notes */
  notes?: string
}

/**
 * Customer update notification
 */
export interface CustomerUpdateNotification {
  /** Order ID */
  orderId: number

  /** New status (pending, preparing, out_for_delivery, delivered) */
  status: 'pending' | 'preparing' | 'out_for_delivery' | 'delivered'

  /** Chef's name */
  chefName: string

  /** Delivery estimated time */
  estimatedTime?: string

  /** Driver info (if applicable) */
  driverName?: string
  driverPhone?: string
}

/**
 * Chef notification for new order
 */
export interface ChefNotification {
  /** Order ID */
  orderId: number

  /** Customer name */
  customerName: string

  /** Items to prepare */
  items: Array<{
    name: string
    quantity: number
  }>

  /** Delivery address */
  deliveryAddress?: string

  /** Special instructions */
  specialInstructions?: string
}

/**
 * Error thrown by WhatsApp service
 */
export class WhatsAppError extends Error {
  /** Error code for specific handling */
  code: string

  /** HTTP status code (if applicable) */
  statusCode?: number

  /** Additional error details */
  details?: any

  constructor(message: string, code: string, statusCode?: number, details?: any) {
    super(message)
    this.name = 'WhatsAppError'
    this.code = code
    this.statusCode = statusCode
    this.details = details
  }
}

/**
 * API response type from CallMeBot
 */
export interface CallMeBotResponse {
  success: boolean
  message: string
  [key: string]: any
}

/**
 * Message template types
 */
export enum MessageTemplate {
  ORDER_CREATED = 'ORDER_CREATED',
  ORDER_CONFIRMED = 'ORDER_CONFIRMED',
  PREPARING = 'PREPARING',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}
