import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'
import router from '@/router' // make sure you have your router setup

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref(null)

  const login = async (username, password) => {
    loading.value = true
    error.value = null

    try {
      const res = await api.login({ username, password })
      
      if (res.data.success) {
        isAuthenticated.value = true
        router.push('/dashboard')
        return true
      } else {
        error.value = res.data.error || 'Invalid credentials'
        isAuthenticated.value = false
        return false
      }
    } catch (e) {
      error.value = e?.response?.data?.error || 'Login failed'
      isAuthenticated.value = false
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    router.push('/login')
  }

  return {
    isAuthenticated,
    loading,
    error,
    login,
    logout
  }
})
