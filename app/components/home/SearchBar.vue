<template>
  <form @submit.prevent="handleSubmit" class="relative">
    <div class="flex gap-2">
      <div class="relative flex-1">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          v-model="query"
          type="text"
          :placeholder="placeholder"
          class="w-full pl-12 pr-4 h-14 text-base rounded-xl border border-border/50 bg-background shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <button
        v-if="showFilters"
        type="button"
        class="shrink-0 h-14 w-14 rounded-xl bg-background border border-border/50 shadow-lg flex items-center justify-center hover:bg-secondary transition-colors"
        @click="navigateTo('/explorar')"
      >
        <SlidersHorizontal class="h-5 w-5" />
      </button>
      <button
        type="submit"
        class="hidden sm:flex shrink-0 px-6 py-3 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 text-white font-medium hover:shadow-lg transition-all items-center justify-center"
      >
        Buscar
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Search, SlidersHorizontal } from 'lucide-vue-next'

interface Props {
  placeholder?: string
  showFilters?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Buscar restaurantes, produtos, promoções...',
  showFilters: true,
})

const emit = defineEmits<{
  search: [query: string]
}>()

const query = ref('')

const handleSubmit = () => {
  if (query.value) {
    emit('search', query.value)
    navigateTo(`/explorar?q=${encodeURIComponent(query.value)}`)
  }
}
</script>
