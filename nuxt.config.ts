// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  
  css: ['~/assets/css/tailwind.css'],
  
  nitro: {
    preset: 'vercel',
    externals: {
      inline: ['@supabase/supabase-js']
    }
  },
  
  vite: {
    optimizeDeps: {
      include: ['@supabase/supabase-js']
    }
  },
  
  app: {
    head: {
      title: 'GuiaLocal - Descubra os melhores lugares',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Encontre os melhores restaurantes, lojas e serviços perto de você' 
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap' 
        },
      ],
    },
  },
  
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
  },

  runtimeConfig: {
    public: {
      supabaseUrl: 'https://mbsdcridxahlsqvvmufb.supabase.co',
      supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ic2RjcmlkeGFobHNxdnZtdWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNDkyNzksImV4cCI6MjA3ODcyNTI3OX0.WnMjd78KXfWmW895aM3NxIoUEOrby_f5JWhSKGbaWBo'
    }
  }
})