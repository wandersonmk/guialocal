export default defineNuxtRouteMiddleware(async () => {
  const { initializeFavorites } = useFavorites()
  
  // Initialize favorites on app load
  if (process.client) {
    await initializeFavorites()
  }
})
