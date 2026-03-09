export const env = {
    // Email / Formspree Configuration
    emailWebhookUrl: import.meta.env.VITE_EMAIL_WEBHOOK_URL,
    emailServiceId: import.meta.env.VITE_EMAIL_SERVICE_ID,
    emailTemplateId: import.meta.env.VITE_EMAIL_TEMPLATE_ID,
    emailUserId: import.meta.env.VITE_EMAIL_USER_ID,
    notificationEmail: import.meta.env.VITE_NOTIFICATION_EMAIL,

    // Supabase Configuration
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,

    // General Webhook
    webhookUrl: import.meta.env.VITE_WEBHOOK_URL,
};
