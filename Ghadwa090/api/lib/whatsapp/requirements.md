# WhatsApp Notification System - Requirements & Implementation

## 📋 Overview

This module provides a reusable Node.js library to send WhatsApp messages via the **CallMeBot Free API**. It enables automated notifications to admins, customers, and chefs when orders are placed, updated, or delivered.

### What This Feature Does
- Sends WhatsApp text messages programmatically
- Triggered by order events (placement, status updates, delivery)
- Supports multiple recipient phone numbers
- Handles message formatting and encoding
- Provides error handling and logging
- Works with serverless functions (Vercel, AWS Lambda, etc.)
- Can be used for webhooks, background jobs, and REST endpoints

---

## 🔌 External Service: CallMeBot WhatsApp API

### Service Description
CallMeBot provides a **personal-use-only free HTTP API** that sends WhatsApp messages directly to your phone or other WhatsApp contacts. No heavy library dependencies like `puppeteer` or `whatsapp-web.js` needed.

### How It Works
1. **Setup Phase (One-time):**
   - User saves the bot's WhatsApp contact: **+34 623 78 95 80**
   - Send the message: "I allow callmebot to send me messages"
   - Bot replies with a unique `apikey` tied to your WhatsApp number
   - Process takes ~2 minutes (if not received, retry after 24 hours)

2. **Sending Phase (Automated):**
   - Call the HTTP endpoint with: phone number, message, and API key
   - Message is delivered to the recipient's WhatsApp
   - Simple GET request, no authentication headers needed

### API Endpoint
```
https://api.callmebot.com/whatsapp.php
```

### Query Parameters
| Parameter | Description | Example |
|-----------|---|---|
| `phone` | WhatsApp number with country code | `+201109318581` |
| `text` | URL-encoded message | `Order+123+placed` |
| `apikey` | API key from activation | `1234567890` |

### Example URL
```
https://api.callmebot.com/whatsapp.php?phone=%2B201109318581&text=Order%20123%20placed%21&apikey=abc123def456
```

### Message Formatting Rules
- **Spaces:** Encoded as `%20` or `+`
- **Line breaks:** Encoded as `%0A`
- **Max length:** ~1000 characters per message
- **Special chars:** Standard WhatsApp formatting supported (emoji, links, etc.)

---

## 🔑 Environment Variables

Add these to your `.env.local` (development) and Vercel environment dashboard:

```env
# .env
CALLMEBOT_PHONE=+201109318581
CALLMEBOT_API_KEY=YOUR_API_KEY_HERE
CALLMEBOT_BASE_URL=https://api.callmebot.com/whatsapp.php
ADMIN_PHONE=+201109318581
NODE_ENV=development
```

### Variable Descriptions
| Variable | Purpose | Format | Required |
|----------|---------|--------|----------|
| `CALLMEBOT_PHONE` | Default recipient phone for notifications | `+[country_code][number]` | Yes |
| `CALLMEBOT_API_KEY` | Authentication key from CallMeBot | Alphanumeric string | Yes |
| `CALLMEBOT_BASE_URL` | API endpoint URL | Full HTTPS URL | No (defaults to CallMeBot) |
| `ADMIN_PHONE` | Admin's WhatsApp for order alerts | `+[country_code][number]` | Yes |
| `NODE_ENV` | Environment (development/production) | `development` or `production` | No |

---

## 📦 Dependencies

### npm Packages Required

```json
{
  "dependencies": {
    "node-fetch": "^3.x" // If using Node.js < 18
  }
}
```

**Note:** Node.js 18+ has native `fetch` support. Use `node-fetch` for older versions.

### Why These Dependencies?
- **fetch API:** Lightweight HTTP client for making requests to CallMeBot
  - No heavy libraries like `axios` needed
  - Native in modern Node.js
  - ~1KB footprint
  - Perfect for serverless functions (cold start optimization)

---

## 📁 Folder Structure

```
api/
├── lib/
│   └── whatsapp/
│       ├── index.ts                 # Main module: sendWhatsAppMessage()
│       ├── types.ts                 # TypeScript interfaces
│       ├── config.ts                # Configuration & validation
│       ├── formatter.ts             # Message formatting utilities
│       ├── requirements.md          # This file
│       └── README.md                # Usage guide
├── notify-admin.ts                  # Vercel API endpoint
├── notify-customer.ts               # Customer notification endpoint
└── test-whatsapp.ts                 # Testing utility
```

---

## 💻 Usage Examples

### Basic Example (Import & Call)

```typescript
// Import the module
import { sendWhatsAppMessage } from './lib/whatsapp'

// Simple message
await sendWhatsAppMessage({
  phone: '+201109318581',
  message: 'Order #123 has been placed!'
})

// With custom API key
await sendWhatsAppMessage({
  phone: '+201234567890',
  message: 'Your order is being prepared',
  apiKey: 'custom-key-123'
})

// In a try-catch
try {
  const result = await sendWhatsAppMessage({
    phone: '+201109318581',
    message: 'Order confirmed'
  })
  console.log('Message sent:', result)
} catch (error) {
  console.error('Failed to send message:', error.message)
}
```

### Vercel API Endpoint Example

```typescript
// File: api/notify-admin.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sendWhatsAppMessage } from '../lib/whatsapp'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { orderId, items, total, customerName } = req.body
    
    const message = `
🎉 NEW ORDER
Order ID: #${orderId}
Customer: ${customerName}
Total: EGP ${total}
Items: ${items.join(', ')}
    `.trim()

    const result = await sendWhatsAppMessage({
      phone: process.env.ADMIN_PHONE!,
      message
    })

    return res.status(200).json({ success: true, result })
  } catch (error) {
    console.error('Notification error:', error)
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
```

### From React Component (CheckoutPage)

```typescript
// In your React component
const handlePlaceOrder = async (orderData) => {
  try {
    // 1. Create order in database
    const order = await api.createOrder(orderData)

    // 2. Notify admin via WhatsApp
    await fetch('/api/notify-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: order.id,
        items: order.items.map(i => `${i.name}(x${i.qty})`),
        total: order.total,
        customerName: order.customerName
      })
    })

    // 3. Show success to user
    setOrderSuccess({ isOpen: true, orderId: order.id })
  } catch (error) {
    console.error('Order placement failed:', error)
  }
}
```

---

## ⚙️ Function Signature

### sendWhatsAppMessage()

```typescript
interface WhatsAppOptions {
  phone: string              // Recipient WhatsApp number (e.g., +201109318581)
  message: string            // Message text (auto-encoded)
  apiKey?: string            // Optional: custom API key (defaults to env)
}

interface SendResult {
  success: boolean
  phone: string
  messageLength: number
  timestamp: string
  apiResponse?: any
}

async function sendWhatsAppMessage(
  options: WhatsAppOptions
): Promise<SendResult>
```

### Error Handling

The function throws `WhatsAppError` with detailed information:

```typescript
class WhatsAppError extends Error {
  code: string              // e.g., 'INVALID_PHONE', 'API_FAILED'
  statusCode?: number       // HTTP status if applicable
  details?: any
}

// Usage
try {
  await sendWhatsAppMessage({ phone, message })
} catch (error) {
  if (error.code === 'INVALID_PHONE') {
    // Handle invalid phone number
  } else if (error.code === 'API_FAILED') {
    // Handle CallMeBot API error
  }
}
```

---

## 🧪 Testing

### Manual Testing
```bash
# Test with a sample message
node api/lib/whatsapp/test.ts

# With custom phone
CALLMEBOT_PHONE=+201234567890 node api/lib/whatsapp/test.ts
```

### Unit Tests (Example)
```typescript
import { sendWhatsAppMessage } from './index'

describe('sendWhatsAppMessage', () => {
  it('should send a message successfully', async () => {
    const result = await sendWhatsAppMessage({
      phone: '+201109318581',
      message: 'Test message'
    })
    expect(result.success).toBe(true)
  })

  it('should throw on invalid phone', async () => {
    expect(async () => {
      await sendWhatsAppMessage({
        phone: 'invalid',
        message: 'Test'
      })
    }).rejects.toThrow('INVALID_PHONE')
  })
})
```

---

## 🚀 Integration Points

This module can be triggered from:

1. **REST API Endpoints** (Vercel functions)
   - `/api/notify-admin` - Admin order alerts
   - `/api/notify-customer` - Customer order updates
   - `/api/notify-chef` - Chef new orders

2. **React Components** (Browser)
   - `CheckoutPage.tsx` - Order placement
   - `TrackOrderPage.tsx` - Status updates

3. **Background Jobs** (Future)
   - Cron jobs for daily summaries
   - Scheduled reminders
   - Bulk notifications

4. **Webhooks** (Future)
   - Payment gateway callbacks
   - Inventory updates
   - Customer service triggers

---

## 🔐 Security Considerations

1. **API Key Protection:**
   - Never expose API key in client-side code
   - Always use environment variables
   - Rotate key if compromised

2. **Phone Number Privacy:**
   - Don't log full phone numbers
   - Mask in logs: `+2011xxxxxxx81`
   - Validate before sending

3. **Rate Limiting:**
   - CallMeBot free tier has limits
   - Implement queue system for bulk messages
   - Cache to avoid duplicate sends

4. **Message Content:**
   - Validate message length
   - Sanitize user input
   - Don't include sensitive data

---

## 📊 Feature Roadmap

### Phase 1 (Current)
- [x] Send text messages to admin
- [x] Basic error handling
- [x] Environment configuration

### Phase 2 (Next)
- [ ] Customer notification template
- [ ] Chef notification template
- [ ] Message queue system
- [ ] Rate limiting
- [ ] Delivery status tracking

### Phase 3 (Future)
- [ ] Multi-language support
- [ ] Message scheduling
- [ ] Webhook integration
- [ ] Analytics dashboard
- [ ] Fallback SMS service

---

## ❓ FAQ

**Q: Is CallMeBot free?**
A: Yes, completely free for personal use. No credit card required.

**Q: How long does API key setup take?**
A: Usually 2 minutes. If not received, wait 24 hours and try again.

**Q: Can I send to multiple numbers?**
A: Yes, make multiple calls to `sendWhatsAppMessage()`. Consider using a queue for bulk sends.

**Q: What's the message character limit?**
A: ~1000 characters per message. Longer messages are split automatically by WhatsApp.

**Q: Will this work in production?**
A: Yes, it works with Vercel, AWS Lambda, and any Node.js environment.

**Q: What if CallMeBot API goes down?**
A: The function returns an error. Implement fallback (SMS, email) or queue for retry.

**Q: Can I use this from the browser?**
A: No, API key would be exposed. Always send from backend (Vercel function, Node.js server).

---

## 📚 References

- CallMeBot Documentation: https://www.callmebot.com/blog/free-api-whatsapp-messages/
- Node.js Fetch API: https://nodejs.org/api/fetch.html
- Vercel Functions: https://vercel.com/docs/functions/serverless-functions
- WhatsApp Best Practices: https://www.whatsapp.com/business/

---

**Status:** Ready for implementation  
**Created:** December 12, 2025  
**Version:** 1.0
