// Environment configuration
export const env = {
  // Supabase
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  supabaseSecretKey: import.meta.env.VITE_SUPABASE_SECRET_KEY || '',
  
  // Environment
  isProduction: import.meta.env.VITE_ENV === 'production',
  isDevelopment: import.meta.env.VITE_ENV === 'development',
  
  // Email Notifications (EmailJS)
  emailWebhookUrl: import.meta.env.VITE_EMAIL_WEBHOOK_URL || '',
  emailServiceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  emailTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  emailUserId: import.meta.env.VITE_EMAILJS_USER_ID || '',
  notificationEmail: import.meta.env.VITE_NOTIFICATION_EMAIL || 'admin@ghadwa.com',
  
  // WhatsApp Notifications (CallMeBot)
  callmebotPhone: import.meta.env.VITE_CALLMEBOT_PHONE || '',
  callmebotApiKey: import.meta.env.VITE_CALLMEBOT_API_KEY || '',
  callmebotBaseUrl: import.meta.env.VITE_CALLMEBOT_BASE_URL || 'https://api.callmebot.com/whatsapp.php',
  debugWhatsApp: import.meta.env.VITE_DEBUG_WHATSAPP === 'true',
  
  // Generic webhook (for Discord, Slack, etc.)
  webhookUrl: import.meta.env.VITE_WEBHOOK_URL || '',
};
