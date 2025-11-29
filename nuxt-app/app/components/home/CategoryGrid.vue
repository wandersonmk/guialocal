<template>
  <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
    <NuxtLink
      v-for="(category, index) in categories"
      :key="category.id"
      :to="`/explorar?categoria=${category.slug}`"
      :class="cn(
        'flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group'
      )"
      :style="{ animationDelay: `${index * 50}ms` }"
    >
      <div 
        class="text-3xl sm:text-4xl transform group-hover:scale-110 transition-transform duration-300"
      >
        {{ category.icon }}
      </div>
      <span class="text-xs sm:text-sm font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors line-clamp-1">
        {{ category.name }}
      </span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { categories } from '~/utils/mockData'
import { cn } from '~/utils/cn'
</script>
