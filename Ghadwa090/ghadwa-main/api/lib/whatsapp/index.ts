/**
 * WhatsApp Notification System - Main Module
 * Sends WhatsApp messages via CallMeBot API
 *
 * Usage:
 *   const whatsapp = new WhatsAppService()
 *   const result = await whatsapp.send({
 *     phone: '+201109318581',
 *     message: 'Hello World!'
 *   })
 */

import {
  SendWhatsAppOptions,
  SendWhatsAppResult,
  WhatsAppError,
  CallMeBotResponse
} from './types'

import {
  loadWhatsAppConfig,
  isValidPhoneNumber,
  isValidApiKey,
  maskPhoneNumber,
  maskApiKey,
  isMessageTooLong,
  API_TIMEOUT_MS,
  RETRY_CONFIG
} from './config'

import { createSafeMessage } from './formatter'

/**
 * WhatsApp Service - Handles sending messages via CallMeBot
 */
export class WhatsAppService {
  private apiKey: string
  private phone: string
  private baseUrl: string
  private debug: boolean

  constructor() {
    try {
      const config = loadWhatsAppConfig()
      this.apiKey = config.apiKey
      this.phone = config.phone
      this.baseUrl = config.baseUrl
      this.debug = config.debug
    } catch (error) {
      if (this.debug) {
        console.error('[WhatsApp] Config error:', error)
      }
      throw error
    }
  }

  /**
   * Send a WhatsApp message
   * @param options - Message options
   * @returns Send result
   */
  async send(options: SendWhatsAppOptions): Promise<SendWhatsAppResult> {
    return this.sendWithRetry(options, 0)
  }

  /**
   * Send with automatic retry on failure
   * @private
   */
  private async sendWithRetry(
    options: SendWhatsAppOptions,
    attemptNumber: number
  ): Promise<SendWhatsAppResult> {
    try {
      const result = await this.sendDirect(options)

      if (this.debug) {
        console.log(
          `[WhatsApp] Message sent to ${maskPhoneNumber(result.phone)} (${result.messageLength} chars)`
        )
      }

      return result
    } catch (error) {
      // Retry logic
      if (attemptNumber < RETRY_CONFIG.maxAttempts - 1) {
        const delayMs = RETRY_CONFIG.delayMs * Math.pow(RETRY_CONFIG.backoffMultiplier, attemptNumber)

        if (this.debug) {
          console.log(
            `[WhatsApp] Attempt ${attemptNumber + 1} failed, retrying in ${delayMs}ms...`
          )
        }

        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, delayMs))

        // Retry
        return this.sendWithRetry(options, attemptNumber + 1)
      }

      // Final failure
      if (this.debug) {
        console.error(
          `[WhatsApp] Failed after ${RETRY_CONFIG.maxAttempts} attempts:`,
          error
        )
      }

      throw error
    }
  }

  /**
   * Send message directly (single attempt)
   * @private
   */
  private async sendDirect(options: SendWhatsAppOptions): Promise<SendWhatsAppResult> {
    const phone = options.phone
    const message = options.message
    const apiKey = options.apiKey || this.apiKey

    // Validation
    if (!isValidPhoneNumber(phone)) {
      throw new WhatsAppError(
        `Invalid phone number: ${phone}`,
        'INVALID_PHONE',
        undefined,
        { phone }
      )
    }

    if (!message || message.trim().length === 0) {
      throw new WhatsAppError('Message cannot be empty', 'EMPTY_MESSAGE')
    }

    if (isMessageTooLong(message)) {
      throw new WhatsAppError(
        `Message exceeds 4096 character limit (${message.length} chars)`,
        'MESSAGE_TOO_LONG',
        undefined,
        { length: message.length }
      )
    }

    if (!isValidApiKey(apiKey)) {
      throw new WhatsAppError(
        'Invalid API key format',
        'INVALID_API_KEY'
      )
    }

    // Build request
    const safeMessage = createSafeMessage(message)
    const encodedMessage = encodeURIComponent(safeMessage)
    const url = `${this.baseUrl}?phone=${phone}&text=${encodedMessage}&apikey=${apiKey}`

    if (this.debug) {
      console.log(`[WhatsApp] Sending to ${maskPhoneNumber(phone)}...`)
      console.log(`[WhatsApp] API Key: ${maskApiKey(apiKey)}`)
      console.log(`[WhatsApp] Message length: ${safeMessage.length}`)
    }

    // Make API request
    const response = await this.makeRequest(url)

    // Parse response
    const result: SendWhatsAppResult = {
      success: response.status === 200 || response.success === true,
      phone: maskPhoneNumber(phone),
      messageLength: safeMessage.length,
      timestamp: new Date().toISOString(),
      apiResponse: {
        status: response.status,
        statusText: response.statusText,
        body: typeof response.body === 'string' ? response.body : JSON.stringify(response.body)
      }
    }

    if (!result.success) {
      throw new WhatsAppError(
        `API returned ${response.status}: ${response.statusText}`,
        'API_ERROR',
        response.status,
        response
      )
    }

    return result
  }

  /**
   * Make HTTP request to CallMeBot API
   * @private
   */
  private async makeRequest(url: string): Promise<any> {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS)

      const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'User-Agent': 'GhadwaApp/1.0'
        }
      })

      clearTimeout(timeoutId)

      const contentType = response.headers.get('content-type') || ''
      let body: any

      if (contentType.includes('application/json')) {
        body = await response.json()
      } else {
        body = await response.text()
      }

      return {
        status: response.status,
        statusText: response.statusText,
        success: response.ok,
        body
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new WhatsAppError(
          `Request timeout (${API_TIMEOUT_MS}ms)`,
          'REQUEST_TIMEOUT'
        )
      }

      if (error instanceof Error) {
        throw new WhatsAppError(
          `Network error: ${error.message}`,
          'NETWORK_ERROR',
          undefined,
          { originalError: error.message }
        )
      }

      throw error
    }
  }

  /**
   * Get service status
   */
  async getStatus(): Promise<boolean> {
    try {
      // Try sending a minimal test message
      const testUrl = `${this.baseUrl}?phone=${this.phone}&text=test&apikey=${this.apiKey}`
      const response = await this.makeRequest(testUrl)
      return response.status === 200 || response.status === 400 // 400 is expected for test
    } catch {
      return false
    }
  }

  /**
   * Get configuration summary (masked for security)
   */
  getConfig(): {
    phone: string
    apiKey: string
    baseUrl: string
    ready: boolean
  } {
    return {
      phone: maskPhoneNumber(this.phone),
      apiKey: maskApiKey(this.apiKey),
      baseUrl: this.baseUrl,
      ready: isValidPhoneNumber(this.phone) && isValidApiKey(this.apiKey)
    }
  }
}

/**
 * Singleton instance for use throughout app
 */
let whatsappInstance: WhatsAppService | null = null

/**
 * Get or create WhatsApp service instance
 */
export function getWhatsAppService(): WhatsAppService {
  if (!whatsappInstance) {
    whatsappInstance = new WhatsAppService()
  }
  return whatsappInstance
}

/**
 * Send WhatsApp message using singleton instance
 * @param options - Message options
 * @returns Send result
 */
export async function sendWhatsAppMessage(
  options: SendWhatsAppOptions
): Promise<SendWhatsAppResult> {
  const service = getWhatsAppService()
  return service.send(options)
}

/**
 * Export all types and utilities
 */
export { WhatsAppError } from './types'
export type {
  SendWhatsAppOptions,
  SendWhatsAppResult,
  OrderNotification,
  CustomerUpdateNotification,
  ChefNotification,
  WhatsAppConfig
} from './types'
export { MessageTemplate } from './types'
export * from './config'
export * from './formatter'
