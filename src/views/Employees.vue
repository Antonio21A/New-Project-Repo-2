<template>
  <div class="container py-4">
    <div class="d-flex flex-wrap align-items-end justify-content-between gap-2 mb-3">
      <div>
        <h2 class="mb-1">Employees</h2>
        <p class="text-muted mb-0">Manage employee profiles and view detailed info.</p>
      </div>

      <div class="d-flex gap-2">
        <input
          v-model="search"
          class="form-control"
          style="max-width: 260px;"
          placeholder="Search name / department…"
        />
      </div>
    </div>

    <!-- Add Employee -->
    <div class="card bank-card mb-3">
      <div class="card-body">
        <h5 class="mb-3">Add Employee</h5>

        <div class="row g-2">
          <div class="col-md-3">
            <input v-model="newEmployee.name" type="text" class="form-control" placeholder="Name">
          </div>
          <div class="col-md-2">
            <input v-model="newEmployee.position" type="text" class="form-control" placeholder="Position">
          </div>
          <div class="col-md-2">
            <input v-model="newEmployee.department" type="text" class="form-control" placeholder="Department">
          </div>
          <div class="col-md-2">
            <input v-model.number="newEmployee.salary" type="number" class="form-control" placeholder="Salary">
          </div>
          <div class="col-md-3 d-grid">
            <button class="btn bank-primary" @click="addEmployee">Add Employee</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="card bank-card">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <h5 class="mb-0">Employee List</h5>
          <span class="text-muted small">{{ filteredEmployees.length }} employees</span>
        </div>

        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead>
              <tr class="text-muted small">
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Contact</th>
                <th class="text-end">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="emp in filteredEmployees" :key="emp.employeeId">
                <td class="fw-semibold">{{ emp.name }}</td>
                <td>{{ emp.position }}</td>
                <td>{{ emp.department }}</td>
                <td>{{ money(emp.salary) }}</td>
                <td class="text-muted">{{ emp.contact || '—' }}</td>
                <td class="text-end">
                  <router-link
                    class="btn btn-sm btn-outline-secondary"
                    :to="`/employees/${emp.employeeId}`"
                  >
                    View
                  </router-link>
                </td>
              </tr>

              <tr v-if="filteredEmployees.length === 0">
                <td colspan="6" class="text-muted py-4 text-center">No results.</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useEmployeeStore } from '../stores/employeeStore'

const employeeStore = useEmployeeStore()
const employees = employeeStore.employees

const search = ref('')

const newEmployee = ref({
  employeeId: 0,
  name: '',
  position: '',
  department: '',
  salary: 0,
  contact: '',
  employmentHistory: ''
})

const nextId = computed(() => {
  const ids = employees.map(e => Number(e.employeeId) || 0)
  return (ids.length ? Math.max(...ids) : 0) + 1
})

const addEmployee = () => {
  if (!newEmployee.value.name?.trim()) {
    alert('Please enter a name')
    return
  }

  newEmployee.value.employeeId = nextId.value
  employeeStore.addEmployee({ ...newEmployee.value })

  Object.assign(newEmployee.value, {
    employeeId: 0,
    name: '',
    position: '',
    department: '',
    salary: 0,
    contact: '',
    employmentHistory: ''
  })
}

const filteredEmployees = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return employees
  return employees.filter(e =>
    (e.name || '').toLowerCase().includes(q) ||
    (e.department || '').toLowerCase().includes(q) ||
    (e.position || '').toLowerCase().includes(q)
  )
})

const money = (n) => Number(n || 0).toLocaleString(undefined, { style: 'currency', currency: 'USD' })
</script>

<style scoped>
.bank-primary{
  background: var(--bank-teal);
  border: 1px solid var(--bank-teal);
  color: #fff;
  font-weight: 600;
}
.bank-primary:hover{
  filter: brightness(.95);
  color:#fff;
}
</style>
