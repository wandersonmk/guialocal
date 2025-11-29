export const useIsMobile = () => {
  const isMobile = ref(false)

  const checkIsMobile = () => {
    if (process.client) {
      isMobile.value = window.innerWidth < 768
    }
  }

  onMounted(() => {
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
  })

  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('resize', checkIsMobile)
    }
  })

  return { isMobile: readonly(isMobile) }
}
