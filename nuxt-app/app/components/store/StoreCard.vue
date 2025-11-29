<template>
  <NuxtLink
    :to="`/loja/${store.slug}`"
    class="group block bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
  >
    <!-- Image -->
    <div class="relative h-40 sm:h-48 overflow-hidden">
      <img
        :src="store.coverImage"
        :alt="store.name"
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
      
      <!-- Badges -->
      <div class="absolute top-3 left-3 flex gap-2">
        <span v-if="store.openNow" class="px-2 py-1 rounded-md bg-green-500 text-white text-xs flex items-center gap-1">
          <Clock class="h-3 w-3" />
          Aberto
        </span>
        <span v-else class="px-2 py-1 rounded-md bg-secondary text-foreground text-xs">
          Fechado
        </span>
        <span v-if="store.promotions.length > 0" class="px-2 py-1 rounded-md bg-red-500 text-white text-xs">
          Promoção
        </span>
      </div>

      <!-- Favorite Button -->
      <button
        :class="cn(
          'absolute top-3 right-3 h-8 w-8 rounded-md bg-card/90 backdrop-blur hover:bg-card flex items-center justify-center transition-colors',
          isFavorite && 'text-destructive'
        )"
        @click.prevent="$emit('toggleFavorite', store.id)"
      >
        <Heart :class="cn('h-4 w-4', isFavorite && 'fill-current')" />
      </button>

      <!-- Logo -->
      <div class="absolute bottom-3 left-3 flex items-end gap-3">
        <img
          :src="store.logo"
          :alt="`${store.name} logo`"
          class="h-14 w-14 rounded-xl object-cover border-2 border-card shadow-lg"
        />
        <div class="text-card mb-1">
          <h3 class="font-display font-semibold text-lg leading-tight line-clamp-1">
            {{ store.name }}
          </h3>
          <p class="text-card/80 text-sm">{{ store.category }}</p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 space-y-3">
      <p class="text-sm text-muted-foreground line-clamp-2">
        {{ store.description }}
      </p>

      <div class="flex items-center justify-between text-sm">
        <div class="flex items-center gap-3 text-muted-foreground">
          <span class="flex items-center gap-1">
            <Star class="h-4 w-4 text-primary fill-current" />
            <span class="font-medium text-foreground">{{ store.rating }}</span>
            <span class="text-xs">({{ store.reviewCount }})</span>
          </span>
          <span v-if="store.distance" class="flex items-center gap-1">
            <MapPin class="h-4 w-4" />
            {{ store.distance }} km
          </span>
        </div>

        <div class="flex gap-1">
          <div v-if="store.hasDelivery" class="h-6 w-6 rounded-md bg-accent/10 flex items-center justify-center" title="Delivery">
            <Truck class="h-3.5 w-3.5 text-accent" />
          </div>
          <div v-if="store.hasPickup" class="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center" title="Retirada">
            <StoreIcon class="h-3.5 w-3.5 text-primary" />
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { MapPin, Star, Clock, Truck, Store as StoreIcon, Heart } from 'lucide-vue-next'
import type { Store } from '~/types'
import { cn } from '~/utils/cn'

interface Props {
  store: Store
  isFavorite?: boolean
}

defineProps<Props>()
defineEmits<{
  toggleFavorite: [storeId: string]
}>()
</script>
