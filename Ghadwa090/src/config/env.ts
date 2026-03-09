export const env = {
    // Email / Formspree Configuration
    emailWebhookUrl: import.meta.env.VITE_EMAIL_WEBHOOK_URL,
    emailServiceId: import.meta.env.VITE_EMAIL_SERVICE_ID,
    emailTemplateId: import.meta.env.VITE_EMAIL_TEMPLATE_ID,
    emailUserId: import.meta.env.VITE_EMAIL_USER_ID,
    notificationEmail: import.meta.env.VITE_NOTIFICATION_EMAIL,

    // Supabase Configuration - تعديل يدوي مباشر
    supabaseUrl: "https://szfoxvvqqtfzbwuacgck.supabase.co",
    supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6Zm94dnZxcXRmemJ3YnVhY2drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwOTQ1MjYsImV4cCI6MjA4NDY3MDUyNn0.HOb0Qn3I0QisisyHGGN-koR4Ac6tL9pPVz4jxNKEFRk",

    // General Webhook
    webhookUrl: import.meta.env.VITE_WEBHOOK_URL,
};