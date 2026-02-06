import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      isAuthenticated.value = true
      return true
    }
    return false
  }

  const logout = () => {
    isAuthenticated.value = false
  }

  return { isAuthenticated, login, logout }
})
