/**
 * WhatsApp Notification System - Configuration
 * Loads and validates environment variables
 */

import { WhatsAppConfig } from './types'

/**
 * Default CallMeBot API endpoint
 */
const DEFAULT_CALLMEBOT_URL = 'https://api.callmebot.com/whatsapp.php'

/**
 * Load and validate WhatsApp configuration from environment
 */
export function loadWhatsAppConfig(): WhatsAppConfig {
  const apiKey = process.env.CALLMEBOT_API_KEY
  const phone = process.env.CALLMEBOT_PHONE
  const baseUrl = process.env.CALLMEBOT_BASE_URL || DEFAULT_CALLMEBOT_URL
  const debug = process.env.DEBUG_WHATSAPP === 'true'

  // Validate required environment variables
  if (!apiKey) {
    throw new Error(
      'Missing CALLMEBOT_API_KEY environment variable. ' +
        'Please set it in your .env file.'
    )
  }

  if (!phone) {
    throw new Error(
      'Missing CALLMEBOT_PHONE environment variable. ' +
        'Please set it in your .env file with format: +{countryCode}{number}'
    )
  }

  // Validate phone format
  if (!isValidPhoneNumber(phone)) {
    throw new Error(
      `Invalid phone number format: ${phone}. ` +
        'Phone must start with + and contain country code (e.g., +201109318581)'
    )
  }

  return {
    apiKey,
    phone,
    baseUrl,
    debug
  }
}

/**
 * Validate phone number format
 * @param phone - Phone number to validate
 * @returns true if valid
 */
export function isValidPhoneNumber(phone: string): boolean {
  // Check format: +{country_code}{number}
  // Examples: +201109318581, +33612345678, +447911123456
  const phoneRegex = /^\+\d{1,3}\d{6,14}$/
  return phoneRegex.test(phone)
}

/**
 * Validate API key format (at least 10 characters)
 * @param apiKey - API key to validate
 * @returns true if valid
 */
export function isValidApiKey(apiKey: string): boolean {
  return apiKey && apiKey.length >= 10
}

/**
 * Get masked phone number for logging (security)
 * @param phone - Phone number to mask
 * @returns Masked phone (e.g., +201109****81)
 */
export function maskPhoneNumber(phone: string): string {
  if (!phone || phone.length < 8) return '***'
  const start = phone.substring(0, 7)
  const end = phone.substring(phone.length - 2)
  return `${start}****${end}`
}

/**
 * Get masked API key for logging (security)
 * @param apiKey - API key to mask
 * @returns Masked key (e.g., abc****xyz)
 */
export function maskApiKey(apiKey: string): string {
  if (!apiKey || apiKey.length < 6) return '***'
  const start = apiKey.substring(0, 3)
  const end = apiKey.substring(apiKey.length - 3)
  return `${start}****${end}`
}

/**
 * Message length limit for WhatsApp
 * Some carriers have limits, we use 4096 as safe max
 */
export const MAX_MESSAGE_LENGTH = 4096

/**
 * Check if message exceeds max length
 * @param message - Message to check
 * @returns true if message is too long
 */
export function isMessageTooLong(message: string): boolean {
  return message.length > MAX_MESSAGE_LENGTH
}

/**
 * Retry configuration
 */
export const RETRY_CONFIG = {
  maxAttempts: 3,
  delayMs: 1000,
  backoffMultiplier: 2
}

/**
 * Timeout for API requests (seconds)
 */
export const API_TIMEOUT_MS = 30000
