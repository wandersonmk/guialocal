<template>
  <div>
    <LayoutAppHeader />
    <main>
      <NuxtPage />
    </main>
    <LayoutAppFooter />
  </div>
</template>

<script setup lang="ts">
// Global configuration
useHead({
  htmlAttrs: {
    lang: 'pt-BR'
  }
})
</script>
