export const useFavorites = () => {
  const { $supabase } = useNuxtApp()
  const user = useState<any>('user', () => null)
  const favorites = useState<string[]>('favorites', () => [])
  const isLoading = useState('favoritesLoading', () => false)

  // Load favorites from localStorage initially
  const loadLocalFavorites = () => {
    if (process.client) {
      const saved = localStorage.getItem('guialocal_favorites')
      favorites.value = saved ? JSON.parse(saved) : []
    }
  }

  // Sync local favorites to Supabase after login
  const syncLocalToSupabase = async () => {
    if (!user.value || favorites.value.length === 0) return

    try {
      const promises = favorites.value.map(storeId =>
        $supabase
          .from('favorites')
          .upsert({ user_id: user.value.id, store_id: storeId }, { onConflict: 'user_id,store_id' })
      )
      await Promise.all(promises)
    } catch (error) {
      console.error('Error syncing favorites:', error)
    }
  }

  // Load favorites from Supabase
  const loadSupabaseFavorites = async () => {
    if (!user.value) return

    try {
      isLoading.value = true
      const { data, error } = await $supabase
        .from('favorites')
        .select('store_id')
        .eq('user_id', user.value.id)

      if (error) throw error
      favorites.value = data?.map((f: any) => f.store_id) || []
      
      // Update localStorage with Supabase data
      if (process.client) {
        localStorage.setItem('guialocal_favorites', JSON.stringify(favorites.value))
      }
    } catch (error) {
      console.error('Error loading favorites:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Check auth state and load favorites
  const initializeFavorites = async () => {
    // Load local favorites first
    loadLocalFavorites()

    // Check if user is logged in
    const { data: { user: currentUser } } = await $supabase.auth.getUser()
    
    if (currentUser) {
      user.value = currentUser
      // Sync local favorites to Supabase
      await syncLocalToSupabase()
      // Load all favorites from Supabase
      await loadSupabaseFavorites()
    }
  }

  // Toggle favorite (hybrid approach)
  const toggleFavorite = async (storeId: string) => {
    const index = favorites.value.indexOf(storeId)
    const isRemoving = index > -1

    // Update local state immediately for better UX
    if (isRemoving) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(storeId)
    }

    // Update localStorage
    if (process.client) {
      localStorage.setItem('guialocal_favorites', JSON.stringify(favorites.value))
    }

    // If user is logged in, sync with Supabase
    if (user.value) {
      try {
        if (isRemoving) {
          await $supabase
            .from('favorites')
            .delete()
            .match({ user_id: user.value.id, store_id: storeId })
        } else {
          await $supabase
            .from('favorites')
            .upsert({ user_id: user.value.id, store_id: storeId }, { onConflict: 'user_id,store_id' })
        }
      } catch (error) {
        console.error('Error syncing favorite:', error)
        // Revert local state on error
        if (isRemoving) {
          favorites.value.push(storeId)
        } else {
          const idx = favorites.value.indexOf(storeId)
          if (idx > -1) favorites.value.splice(idx, 1)
        }
        if (process.client) {
          localStorage.setItem('guialocal_favorites', JSON.stringify(favorites.value))
        }
      }
    }
  }

  const isFavorite = (storeId: string) => {
    return favorites.value.includes(storeId)
  }

  // Login anonymously
  const loginAnonymously = async () => {
    try {
      const { data, error } = await $supabase.auth.signInAnonymously()
      if (error) throw error
      
      user.value = data.user
      await syncLocalToSupabase()
      await loadSupabaseFavorites()
      
      return { success: true }
    } catch (error) {
      console.error('Error logging in:', error)
      return { success: false, error }
    }
  }

  const logout = async () => {
    try {
      await $supabase.auth.signOut()
      user.value = null
      // Keep local favorites
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return {
    favorites: readonly(favorites),
    user: readonly(user),
    isLoading: readonly(isLoading),
    toggleFavorite,
    isFavorite,
    initializeFavorites,
    loginAnonymously,
    logout,
  }
}
