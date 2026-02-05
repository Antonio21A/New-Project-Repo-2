<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-sm" style="width: 350px;">
      <h3 class="mb-3 text-center">ModernTech HR Login</h3>

      <div class="mb-3">
        <label class="form-label">Username</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          placeholder="Enter username"
        >
      </div>

      <div class="mb-3">
        <label class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Enter password"
        >
      </div>

      <button
        class="btn btn-primary w-100"
        :disabled="authStore.loading"
        @click="handleLogin"
      >
        {{ authStore.loading ? 'Logging in…' : 'Login' }}
      </button>

      <div v-if="authStore.error" class="alert alert-danger mt-3 mb-0 py-2">
        {{ authStore.error }}
      </div>

      <div class="mt-3 text-center">
        <small class="text-muted">Test credentials: admin / admin123</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const success = await authStore.login(username.value, password.value)
    if (success) {
      router.push('/dashboard')
    }
  } catch {
    // error handled in store
  }
}
</script>

<style>
body {
  background-color: #f0f2f5;
}
</style>
