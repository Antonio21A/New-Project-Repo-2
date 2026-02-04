<template>
  <div class="container py-4">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
      <div>
        <h2 class="mb-1">Employee Profile</h2>
        <p class="text-muted mb-0">Detailed employee information.</p>
      </div>

      <router-link class="btn btn-outline-secondary" to="/employees">
        ← Back to Employees
      </router-link>
    </div>

    <div v-if="!employee" class="card bank-card">
      <div class="card-body">
        <h5 class="mb-1">Employee not found</h5>
        <p class="text-muted mb-0">This ID doesn’t match any employee in your dataset.</p>
      </div>
    </div>

    <div v-else class="row g-3">
      <div class="col-12 col-lg-4">
        <div class="card bank-card h-100">
          <div class="card-body">
            <div class="bank-avatar mb-3">
              {{ initials(employee.name) }}
            </div>

            <h4 class="mb-1">{{ employee.name }}</h4>
            <div class="text-muted">{{ employee.position }} • {{ employee.department }}</div>

            <hr class="my-3"/>

            <div class="small text-muted">Employee ID</div>
            <div class="fw-semibold mb-2">{{ employee.employeeId }}</div>

            <div class="small text-muted">Contact</div>
            <div class="fw-semibold">{{ employee.contact || '—' }}</div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-8">
        <div class="card bank-card">
          <div class="card-body">
            <h5 class="mb-3">Employment Details</h5>

            <div class="row g-3">
              <div class="col-md-6">
                <div class="text-muted small">Position</div>
                <div class="fw-semibold">{{ employee.position || '—' }}</div>
              </div>
              <div class="col-md-6">
                <div class="text-muted small">Department</div>
                <div class="fw-semibold">{{ employee.department || '—' }}</div>
              </div>
              <div class="col-md-6">
                <div class="text-muted small">Salary</div>
                <div class="fw-semibold">{{ money(employee.salary) }}</div>
              </div>
              <div class="col-md-6">
                <div class="text-muted small">History / Notes</div>
                <div class="fw-semibold">{{ employee.employmentHistory || '—' }}</div>
              </div>
            </div>

            <hr class="my-3"/>

            <div class="text-muted small mb-2">Quick Actions</div>
            <div class="d-flex flex-wrap gap-2">
              <router-link class="btn btn-sm btn-outline-secondary" to="/attendance">
                View Attendance
              </router-link>
              <router-link class="btn btn-sm btn-outline-secondary" to="/payroll">
                View Payroll
              </router-link>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useEmployeeStore } from '../stores/employeeStore'

const route = useRoute()
const employeeStore = useEmployeeStore()

const employee = computed(() => {
  const id = Number(route.params.id)
  return employeeStore.getEmployeeById(id)
})

const money = (n) => Number(n || 0).toLocaleString(undefined, { style: 'currency', currency: 'USD' })

const initials = (name = '') => {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] || ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}
</script>

<style scoped>
.bank-avatar{
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight: 800;
  color:#fff;
  background: linear-gradient(135deg, var(--bank-teal), var(--bank-navy));
}
</style>
