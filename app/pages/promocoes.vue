<template>
  <div class="min-h-screen flex flex-col bg-background">
    <main class="flex-1">
      <div class="w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8">
      <div class="mb-8">
        <h1 class="font-display text-3xl font-bold mb-2">Promoções</h1>
        <p class="text-muted-foreground">
          As melhores ofertas da semana
        </p>
      </div>

      <!-- Promotions Grid -->
      <div v-if="promotionsData.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in promotionsData"
          :key="item.promotion.id"
          class="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-lg transition-all"
        >
          <NuxtLink :to="`/loja/${item.store.slug}`">
            <img :src="item.promotion.image" :alt="item.promotion.title" class="w-full h-48 object-cover" />
            <div class="p-4">
              <span class="text-sm text-primary font-medium">{{ item.promotion.discount }}</span>
              <h3 class="font-display font-semibold mt-1">{{ item.promotion.title }}</h3>
              <p class="text-sm text-muted-foreground mt-2">{{ item.promotion.description }}</p>
              <p class="text-xs text-muted-foreground mt-2">{{ item.store.name }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
      
      <div v-else class="text-center py-12">
        <p class="text-muted-foreground">Nenhuma promoção ativa no momento</p>
      </div>
      </div>
    </main>
  </div>
</template><script setup lang="ts">
import { stores } from '~/utils/mockData'

const selectedCity = ref(cities[0])

const promotionsData = computed(() => 
  stores.flatMap((store) =>
    store.promotions.map((promo) => ({ promotion: promo, store }))
  )
)

useHead({
  title: 'Promoções - GuiaLocal',
})
</script>
