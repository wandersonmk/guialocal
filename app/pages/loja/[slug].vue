<template>
  <div v-if="store" class="min-h-screen flex flex-col bg-background">
    <main class="flex-1">
      <!-- Hero Section -->
      <div class="relative h-80 md:h-96">
        <img
          :src="store.coverImage"
          :alt="store.name"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        
        <!-- Back Button -->
        <button
          @click="$router.back()"
          class="absolute top-4 left-4 md:top-6 md:left-6 h-10 w-10 rounded-full bg-white/90 backdrop-blur hover:bg-white flex items-center justify-center transition-all shadow-lg"
        >
          <ArrowLeft class="h-5 w-5 text-foreground" />
        </button>

        <!-- Favorite Button -->
        <button
          :class="cn(
            'absolute top-4 right-4 md:top-6 md:right-6 h-10 w-10 rounded-full bg-white/90 backdrop-blur hover:bg-white flex items-center justify-center transition-all shadow-lg',
            isFavorite(store.id) && 'text-red-500'
          )"
          @click="toggleFavorite(store.id)"
        >
          <Heart :class="cn('h-5 w-5', isFavorite(store.id) && 'fill-current')" />
        </button>

        <!-- Store Info Overlay -->
        <div class="absolute bottom-0 left-0 right-0 pb-6">
          <div class="w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <div class="flex items-end gap-4">
              <img
                :src="store.logo"
                :alt="`${store.name} logo`"
                class="h-20 w-20 md:h-24 md:w-24 rounded-2xl object-cover border-4 border-white shadow-xl"
              />
              <div class="flex-1 pb-1">
                <div class="flex items-center gap-2 mb-1">
                  <span v-if="store.openNow" class="px-2 py-1 rounded-md bg-green-500 text-white text-xs font-medium">
                    Aberto
                  </span>
                  <span v-if="store.promotions.length > 0" class="px-2 py-1 rounded-md bg-red-500 text-white text-xs font-medium">
                    Promoção
                  </span>
                </div>
                <h1 class="font-display text-2xl md:text-3xl font-bold text-white drop-shadow-lg">{{ store.name }}</h1>
                <p class="text-white/90 text-sm drop-shadow-md">{{ store.category }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Bar -->
      <div class="bg-card border-b border-border/50 sticky top-16 z-40">
        <div class="w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-4">
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <Star class="h-5 w-5 text-primary fill-current" />
                <span class="font-semibold text-foreground">{{ store.rating }}</span>
                <span class="text-sm text-muted-foreground">({{ store.reviewCount }} avaliações)</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin class="h-4 w-4" />
                <span>{{ store.distance }} km</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <a
                :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address + ', ' + store.city)}`"
                target="_blank"
                class="px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Navigation class="h-4 w-4" />
                Traçar rota
              </a>
              <a
                v-if="store.whatsapp"
                :href="`https://wa.me/${store.whatsapp}`"
                target="_blank"
                class="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors text-sm font-medium flex items-center gap-2"
              >
                <MessageCircle class="h-4 w-4" />
                WhatsApp
              </a>
              <a
                :href="`tel:${store.phone}`"
                class="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Phone class="h-4 w-4" />
                Ligar
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- About Section -->
            <section>
              <h2 class="font-display text-2xl font-bold mb-4">Sobre</h2>
              <p class="text-foreground leading-relaxed mb-4">{{ store.description }}</p>
              <div class="flex gap-2">
                <span v-if="store.hasDelivery" class="px-3 py-1.5 rounded-lg border border-border text-foreground text-sm font-medium flex items-center gap-1.5">
                  <Truck class="h-4 w-4" />
                  Delivery
                </span>
                <span v-if="store.hasPickup" class="px-3 py-1.5 rounded-lg border border-border text-foreground text-sm font-medium flex items-center gap-1.5">
                  <StoreIcon class="h-4 w-4" />
                  Retirada
                </span>
              </div>
            </section>

            <!-- Video Section -->
            <section v-if="store.videoUrl">
              <h2 class="font-display text-2xl font-bold mb-4">Vídeo</h2>
              <div 
                @click="showVideoModal = true"
                class="relative aspect-video rounded-xl overflow-hidden bg-secondary cursor-pointer group"
              >
                <img 
                  :src="store.coverImage" 
                  :alt="`${store.name} vídeo`"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div class="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div class="h-16 w-16 rounded-full bg-primary flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play class="h-8 w-8 text-primary-foreground ml-1" />
                  </div>
                </div>
              </div>
            </section>

            <!-- Video Modal -->
            <Teleport to="body">
              <div 
                v-if="showVideoModal"
                @click="showVideoModal = false"
                class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
              >
                <div 
                  @click.stop
                  class="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
                >
                  <button
                    @click="showVideoModal = false"
                    class="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
                  >
                    <X class="h-5 w-5 text-foreground" />
                  </button>
                  <iframe
                    :src="store.videoUrl"
                    class="w-full h-full"
                    allowfullscreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </div>
            </Teleport>

            <!-- Photos Section -->
            <section v-if="store.images.length > 0">
              <h2 class="font-display text-2xl font-bold mb-4">Fotos</h2>
              <div class="grid grid-cols-2 gap-4">
                <div
                  v-for="(image, index) in store.images"
                  :key="index"
                  class="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <img :src="image" :alt="`${store.name} foto ${index + 1}`" class="w-full h-full object-cover" />
                </div>
              </div>
            </section>

            <!-- Products & Services -->
            <section v-if="store.products.length > 0">
              <h2 class="font-display text-2xl font-bold mb-6">Produtos & Serviços</h2>
              <div class="grid sm:grid-cols-2 gap-6">
                <div
                  v-for="product in store.products"
                  :key="product.id"
                  class="group cursor-pointer"
                >
                  <div class="relative overflow-hidden rounded-xl mb-3">
                    <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div class="space-y-1">
                    <p class="text-sm text-muted-foreground">{{ store.category }}</p>
                    <h4 class="font-display font-semibold text-lg">{{ product.name }}</h4>
                    <p class="text-sm text-muted-foreground line-clamp-2">{{ product.description }}</p>
                    <p class="font-display font-bold text-primary text-lg pt-1">
                      R$ {{ product.price.toFixed(2).replace('.', ',') }}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Active Promotions -->
            <section v-if="store.promotions.length > 0">
              <h2 class="font-display text-2xl font-bold mb-6">Promoções Ativas</h2>
              <div class="space-y-4">
                <div
                  v-for="promo in store.promotions"
                  :key="promo.id"
                  class="border border-border/50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div class="relative h-48">
                    <img :src="promo.image" :alt="promo.title" class="w-full h-full object-cover" />
                    <span class="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-bold">
                      {{ promo.discount }}
                    </span>
                  </div>
                  <div class="p-4">
                    <h3 class="font-display font-bold text-lg mb-2">{{ promo.title }}</h3>
                    <p class="text-sm text-muted-foreground mb-3">{{ promo.description }}</p>
                    <div v-if="promo.couponCode" class="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
                      <span class="text-xs text-muted-foreground">Cupom:</span>
                      <span class="font-mono font-bold text-foreground">{{ promo.couponCode }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Info Card -->
            <div class="bg-card rounded-2xl border border-border/50 overflow-hidden sticky top-32">
              <div class="p-6 space-y-5">
                <h3 class="font-display text-lg font-bold">Informações</h3>
                
                <div class="space-y-4">
                  <div class="flex items-start gap-3">
                    <Clock class="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p class="text-sm font-medium text-muted-foreground mb-1">Horário</p>
                      <p class="text-foreground">{{ store.openHours }}</p>
                    </div>
                  </div>

                  <div class="flex items-start gap-3">
                    <MapPin class="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p class="text-sm font-medium text-muted-foreground mb-1">Endereço</p>
                      <p class="text-foreground">{{ store.address }}</p>
                      <p class="text-foreground">{{ store.city }}</p>
                    </div>
                  </div>

                  <div class="flex items-start gap-3">
                    <Phone class="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p class="text-sm font-medium text-muted-foreground mb-1">Telefone</p>
                      <a :href="`tel:${store.phone}`" class="text-foreground hover:text-primary font-medium">
                        {{ store.phone }}
                      </a>
                    </div>
                  </div>

                  <div v-if="store.instagram" class="flex items-start gap-3">
                    <Instagram class="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p class="text-sm font-medium text-muted-foreground mb-1">Instagram</p>
                      <a 
                        :href="`https://instagram.com/${store.instagram}`"
                        target="_blank"
                        class="text-foreground hover:text-primary font-medium"
                      >
                        @{{ store.instagram }}
                      </a>
                    </div>
                  </div>

                  <div v-if="store.website" class="flex items-start gap-3">
                    <Globe class="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p class="text-sm font-medium text-muted-foreground mb-1">Site</p>
                      <a 
                        :href="store.website"
                        target="_blank"
                        class="text-primary hover:underline font-medium"
                      >
                        Visitar site
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Map -->
              <div class="relative h-48 bg-secondary">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <MapPin class="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <a 
                      :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address + ', ' + store.city)}`"
                      target="_blank"
                      class="text-sm text-primary hover:underline font-medium"
                    >
                      Abrir no Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-2">Loja não encontrada</h1>
      <NuxtLink to="/" class="text-primary hover:underline">
        Voltar para o início
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MapPin, Star, Clock, Phone, MessageCircle, Truck, Store as StoreIcon, Heart, ArrowLeft, Navigation, Instagram, Globe, Play, X } from 'lucide-vue-next'
import { stores, cities } from '~/utils/mockData'
import { cn } from '~/utils/cn'

const route = useRoute()
const selectedCity = ref(cities[0])
const { toggleFavorite, isFavorite } = useFavorites()
const showVideoModal = ref(false)

const store = computed(() => stores.find(s => s.slug === route.params.slug))

useHead({
  title: store.value ? `${store.value.name} - GuiaLocal` : 'Loja não encontrada',
})
</script>
