<template>
  <header class="sticky top-0 z-50 w-full border-b border-border/50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
    <div class="w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 flex h-16 items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <div class="h-9 w-9 rounded-xl gradient-warm flex items-center justify-center shadow-soft">
          <MapPin class="h-5 w-5 text-primary-foreground" />
        </div>
        <span class="font-display font-bold text-xl hidden sm:block">
          GuiaLocal
        </span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.href"
          :to="link.href"
          :class="cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors font-display',
            route.path === link.href
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
          )"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Right Section -->
      <div class="flex items-center gap-3">
        <!-- City Selector -->
        <select
          v-model="selectedCity"
          class="h-9 px-3 rounded-md text-sm border border-border/50 bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option v-for="city in cities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>

        <!-- Favorites Button -->
        <NuxtLink to="/favoritos">
          <button class="hidden sm:flex h-9 w-9 items-center justify-center rounded-md hover:bg-secondary transition-colors">
            <Heart class="h-4 w-4" />
          </button>
        </NuxtLink>

        <!-- Mobile Menu Toggle -->
        <button
          class="md:hidden h-9 w-9 flex items-center justify-center hover:bg-secondary rounded-md transition-colors"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <X v-if="mobileMenuOpen" class="h-5 w-5" />
          <Menu v-else class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="mobileMenuOpen" class="md:hidden border-t border-border/50 bg-card">
      <nav class="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4 flex flex-col gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.href"
          :to="link.href"
          :class="cn(
            'px-4 py-3 rounded-lg text-sm font-medium transition-colors font-display',
            route.path === link.href
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
          )"
          @click="mobileMenuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { MapPin, Heart, Menu, X } from 'lucide-vue-next'
import { cities } from '~/utils/mockData'
import { cn } from '~/utils/cn'

const route = useRoute()
const mobileMenuOpen = ref(false)
const selectedCity = defineModel<string>({ default: 'São Paulo' })

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/explorar', label: 'Explorar' },
  { href: '/promocoes', label: 'Promoções' },
  { href: '/favoritos', label: 'Favoritos' },
]
</script>
