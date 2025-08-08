// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/supabase'],
  css: ['~/assets/css/main.css'],
  supabase: {
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnaWl2ZHNuenNsb2d0YmJycWhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NzczNzQsImV4cCI6MjA3MDE1MzM3NH0.56Zcg-1RrsNRWYfXkSxvREbUVqQ0DljprwjFDdibjgQ',
    url: 'https://dgiivdsnzslogtbbrqho.supabase.co',
    redirect: false,
  },
})
