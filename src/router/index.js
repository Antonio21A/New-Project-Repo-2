import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Employees from '../views/Employees.vue'
import EmployeeDetails from '../views/EmployeeDetails.vue'
import Attendance from '../views/Attendance.vue'
import Payroll from '../views/Payroll.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },

  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },

  { path: '/employees', component: Employees, meta: { requiresAuth: true } },
  { path: '/employees/:id', component: EmployeeDetails, meta: { requiresAuth: true } },

  { path: '/attendance', component: Attendance, meta: { requiresAuth: true } },
  { path: '/payroll', component: Payroll, meta: { requiresAuth: true } },

  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.path === '/login' && authStore.isAuthenticated) return '/dashboard'
  if (to.meta.requiresAuth && !authStore.isAuthenticated) return '/login'
})

export default router
