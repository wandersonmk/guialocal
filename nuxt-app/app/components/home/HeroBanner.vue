<template>
  <div class="relative overflow-hidden rounded-2xl shadow-lg">
    <div class="relative h-[280px] sm:h-[340px] md:h-[400px]">
      <div
        v-for="(banner, index) in banners"
        :key="banner.id"
        :class="cn(
          'absolute inset-0 transition-all duration-700 ease-out',
          index === currentBanner
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-105'
        )"
      >
        <img
          :src="banner.image"
          :alt="banner.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" />
        <div class="absolute inset-0 flex items-center">
          <div class="container">
            <div class="max-w-md space-y-4">
              <h2 class="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-card leading-tight">
                {{ banner.title }}
              </h2>
              <p class="text-card/90 text-lg">
                {{ banner.subtitle }}
              </p>
              <NuxtLink :to="banner.link">
                <button class="mt-2 px-6 py-3 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 text-white font-medium hover:shadow-lg transition-all">
                  Explorar agora
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <button
      class="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-md bg-card/20 backdrop-blur hover:bg-card/40 flex items-center justify-center transition-colors"
      @click="prevBanner"
    >
      <ChevronLeft class="h-5 w-5" />
    </button>
    <button
      class="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-md bg-card/20 backdrop-blur hover:bg-card/40 flex items-center justify-center transition-colors"
      @click="nextBanner"
    >
      <ChevronRight class="h-5 w-5" />
    </button>

    <!-- Dots -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <button
        v-for="(_, index) in banners"
        :key="index"
        :class="cn(
          'h-2 rounded-full transition-all duration-300',
          index === currentBanner
            ? 'w-8 bg-card'
            : 'w-2 bg-card/50 hover:bg-card/70'
        )"
        @click="currentBanner = index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { banners } from '~/utils/mockData'
import { cn } from '~/utils/cn'

const currentBanner = ref(0)

const nextBanner = () => {
  currentBanner.value = (currentBanner.value + 1) % banners.length
}

const prevBanner = () => {
  currentBanner.value = (currentBanner.value - 1 + banners.length) % banners.length
}

// Auto-rotate banners
onMounted(() => {
  const timer = setInterval(() => {
    nextBanner()
  }, 5000)

  onUnmounted(() => {
    clearInterval(timer)
  })
})
</script>
