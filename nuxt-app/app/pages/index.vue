<template>
  <div class="min-h-screen flex flex-col bg-background">
    <LayoutAppHeader v-model="selectedCity" />

    <main class="flex-1">
      <!-- Hero Section -->
      <section class="w-full mb-8">
        <div class="w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <HomeHeroBanner />
        </div>
      </section>

      <!-- Search Bar -->
      <section class="w-full mb-8">
        <div class="w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div class="max-w-4xl mx-auto">
            <HomeSearchBar />
          </div>
        </div>
      </section>

      <!-- Categories -->
      <section class="w-full py-8 bg-background">
        <div class="w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-display text-2xl font-bold">Categorias</h2>
            <NuxtLink
              to="/explorar"
              class="text-primary text-sm font-medium hover:underline flex items-center gap-1"
            >
              Ver todas
              <ArrowRight class="h-4 w-4" />
            </NuxtLink>
          </div>
          <HomeCategoryGrid />
        </div>
      </section>

      <!-- Featured Stores -->
      <section class="w-full py-8 bg-background">
        <div class="w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="font-display text-2xl font-bold flex items-center gap-2">
                <Sparkles class="h-6 w-6 text-primary" />
                Destaques
              </h2>
              <p class="text-muted-foreground text-sm mt-1">
                Os estabelecimentos mais populares perto de você
              </p>
            </div>
            <NuxtLink
              to="/explorar"
              class="text-primary text-sm font-medium hover:underline flex items-center gap-1"
            >
              Ver todos
              <ArrowRight class="h-4 w-4" />
            </NuxtLink>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StoreCard
              v-for="store in featuredStores"
              :key="store.id"
              :store="store"
              :is-favorite="isFavorite(store.id)"
              @toggle-favorite="toggleFavorite"
            />
          </div>
        </div>
      </section>

      <!-- Promotions -->
      <section v-if="promotionsData.length > 0" class="w-full py-8 bg-background">
        <div class="w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="font-display text-2xl font-bold flex items-center gap-2">
                <TrendingUp class="h-6 w-6 text-primary" />
                Promoções Ativas
              </h2>
              <p class="text-muted-foreground text-sm mt-1">
                Aproveite as melhores ofertas
              </p>
            </div>
            <NuxtLink
              to="/promocoes"
              class="text-primary text-sm font-medium hover:underline flex items-center gap-1"
            >
              Ver todas
              <ArrowRight class="h-4 w-4" />
            </NuxtLink>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </main>

    <LayoutAppFooter />
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-vue-next'
import { stores } from '~/utils/mockData'

const selectedCity = ref(cities[0])
const { toggleFavorite, isFavorite } = useFavorites()

const featuredStores = computed(() => stores.slice(0, 4))
const promotionsData = computed(() => 
  stores
    .flatMap((store) =>
      store.promotions.map((promo) => ({ promotion: promo, store }))
    )
    .slice(0, 3)
)

useHead({
  title: 'GuiaLocal - Descubra os melhores lugares',
  meta: [
    { name: 'description', content: 'Encontre os melhores restaurantes, lojas e serviços perto de você' }
  ]
})
</script>
