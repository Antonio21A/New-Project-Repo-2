<template>
  <div class="app-shell">
    <nav v-if="authStore.isAuthenticated" class="navbar navbar-expand-lg bank-nav">
      <div class="container">
        <router-link class="navbar-brand bank-brand" to="/dashboard">
          ModernTech HR
        </router-link>

        <button
          class="navbar-toggler bank-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li class="nav-item">
              <router-link class="nav-link bank-link" to="/dashboard">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link bank-link" to="/employees">Employees</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link bank-link" to="/attendance">Attendance</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link bank-link" to="/payroll">Payroll</router-link>
            </li>

            <li class="nav-item ms-lg-2">
              <button class="btn btn-sm bank-logout" @click="doLogout">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const doLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style>
:root{
  --bank-navy:#0b1f3a;
  --bank-navy-2:#0d2a4d;
  --bank-teal:#0ea5a4;
  --bank-bg:#f6f8fb;
  --bank-card:#ffffff;
  --bank-border: rgba(10,35,66,.10);
}

body{
  background: var(--bank-bg);
}

.app-main{
  min-height: calc(100vh - 64px);
}

.bank-nav{
  background: linear-gradient(90deg, var(--bank-navy), var(--bank-navy-2));
  border-bottom: 1px solid rgba(255,255,255,.10);
}

.bank-brand{
  color:#fff !important;
  font-weight:800;
  letter-spacing:.2px;
}

.bank-link{
  color: rgba(255,255,255,.86) !important;
  border-radius: 999px;
  padding: .45rem .9rem !important;
}

.bank-link.router-link-active{
  color:#fff !important;
  background: rgba(255,255,255,.10);
  font-weight:600;
}

.bank-toggler{
  border-color: rgba(255,255,255,.35) !important;
}
.navbar-toggler-icon{
  filter: invert(1);
}

.bank-logout{
  color:#fff;
  border: 1px solid rgba(255,255,255,.35);
  background: rgba(255,255,255,.10);
}
.bank-logout:hover{
  background: rgba(255,255,255,.18);
}

.bank-card{
  background: var(--bank-card);
  border: 1px solid var(--bank-border);
  border-radius: 16px;
  box-shadow: 0 10px 24px rgba(10,35,66,.06);
}
</style>
