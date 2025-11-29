<template>
  <footer class="border-t border-border/50 bg-card mt-auto">
    <div class="w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo & Description -->
        <div class="md:col-span-2">
          <NuxtLink to="/" class="flex items-center gap-2 mb-4">
            <div class="h-9 w-9 rounded-xl gradient-warm flex items-center justify-center shadow-soft">
              <MapPin class="h-5 w-5 text-primary-foreground" />
            </div>
            <span class="font-display font-bold text-xl">GuiaLocal</span>
          </NuxtLink>
          <p class="text-muted-foreground text-sm max-w-md">
            O guia completo de estabelecimentos da sua cidade. Encontre restaurantes, 
            lojas, serviços e aproveite as melhores promoções.
          </p>
          <div class="flex gap-3 mt-4">
            <a
              href="#"
              class="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
            >
              <Instagram class="h-4 w-4" />
            </a>
            <a
              href="#"
              class="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
            >
              <Facebook class="h-4 w-4" />
            </a>
            <a
              href="#"
              class="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
            >
              <Mail class="h-4 w-4" />
            </a>
          </div>
        </div>

        <!-- Links -->
        <div>
          <h4 class="font-display font-semibold mb-4">Navegação</h4>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li>
              <NuxtLink to="/" class="hover:text-primary transition-colors">
                Início
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/explorar" class="hover:text-primary transition-colors">
                Explorar
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/promocoes" class="hover:text-primary transition-colors">
                Promoções
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/favoritos" class="hover:text-primary transition-colors">
                Favoritos
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-display font-semibold mb-4">Contato</h4>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li>contato@guialocal.com.br</li>
            <li>(11) 91460-0243</li>
            <li class="pt-2">
              <NuxtLink to="/para-comerciantes" class="text-primary hover:underline font-medium">
                Cadastre sua loja →
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-border/50 mt-8 pt-6 text-center text-sm text-muted-foreground">
        © {{ new Date().getFullYear() }} GuiaLocal. Todos os direitos reservados.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { MapPin, Instagram, Facebook, Mail } from 'lucide-vue-next'
</script>
