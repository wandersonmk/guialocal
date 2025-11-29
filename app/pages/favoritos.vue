<template>
  <div class="min-h-screen flex flex-col bg-background">
    <main class="flex-1">
      <div class="w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8">
        <div class="mb-8">
        <h1 class="font-display text-3xl font-bold mb-2 flex items-center gap-2">
          <Heart class="h-8 w-8 text-primary fill-current" />
          Favoritos
        </h1>
        <p class="text-muted-foreground">
          Seus estabelecimentos salvos
        </p>
        </div>

        <!-- Favorites Grid -->
        <div v-if="favoriteStores.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StoreCard
          v-for="store in favoriteStores"
          :key="store.id"
          :store="store"
          :is-favorite="true"
          @toggle-favorite="toggleFavorite"
        />
        </div>
        
        <div v-else class="text-center py-12">
        <Heart class="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <p class="text-muted-foreground text-lg mb-2">Nenhum favorito ainda</p>
        <NuxtLink to="/explorar" class="text-primary hover:underline">
          Explorar estabelecimentos
        </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template><script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import { stores } from '~/utils/mockData'

const selectedCity = ref(cities[0])
const { favorites, toggleFavorite, isFavorite } = useFavorites()

const favoriteStores = computed(() => 
  stores.filter(store => isFavorite(store.id))
)

useHead({
  title: 'Favoritos - GuiaLocal',
})
</script>
