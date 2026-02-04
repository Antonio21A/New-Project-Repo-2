<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-sm" style="width: 350px;">
      <h3 class="mb-3 text-center">ModernTech HR Login</h3>

      <div class="mb-3">
        <label>Username</label>
        <input v-model="username" type="text" class="form-control" placeholder="Enter username">
      </div>

      <div class="mb-3">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" placeholder="Enter password">
      </div>

      <button @click="handleLogin" class="btn btn-primary w-100">Login</button>

      <div class="mt-3 text-center">
        <small>Test credentials: admin / admin123</small>
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

const handleLogin = () => {
  const success = authStore.login(username.value, password.value)
  if (success) {
    router.push('/dashboard')
  } else {
    alert('Invalid credentials')
  }
}
</script>

<style>
body {
  background-color: #f0f2f5;
}
</style>

