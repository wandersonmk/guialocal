<template>
  <div class="min-h-screen flex flex-col bg-background">
    <main class="flex-1">
      <div class="w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8">
      <div class="mb-8">
        <h1 class="font-display text-3xl font-bold mb-2">Explorar</h1>
        <p class="text-muted-foreground">
          Encontre estabelecimentos em {{ selectedCity }}
        </p>
      </div>

      <HomeSearchBar class="mb-8" />

      <!-- Categories Filter -->
      <div class="mb-8">
        <HomeCategoryGrid />
      </div>

      <!-- Stores Grid -->
      <div v-if="filteredStores.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StoreCard
          v-for="store in filteredStores"
          :key="store.id"
          :store="store"
          :is-favorite="isFavorite(store.id)"
          @toggle-favorite="toggleFavorite"
        />
      </div>
      
      <div v-else class="text-center py-12">
        <p class="text-muted-foreground">Nenhum estabelecimento encontrado</p>
      </div>
      </div>
    </main>
  </div>
</template><script setup lang="ts">
import { stores } from '~/utils/mockData'

const route = useRoute()
const selectedCity = ref(cities[0])
const { toggleFavorite, isFavorite } = useFavorites()

const selectedCategory = computed(() => route.query.categoria as string | undefined)

const filteredStores = computed(() => {
  if (!selectedCategory.value) return stores
  return stores.filter(store => 
    store.category.toLowerCase() === selectedCategory.value?.toLowerCase()
  )
})

useHead({
  title: 'Explorar - GuiaLocal',
})
</script>
