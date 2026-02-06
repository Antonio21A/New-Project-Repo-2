<template>
  <div class="container py-4">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
      <div>
        <h2 class="mb-1">Employee Profile</h2>
        <p class="text-muted mb-0">Detailed employee information.</p>
      </div>

      <div class="d-flex gap-2">
        <router-link class="btn btn-outline-secondary" to="/employees">
          ← Back to Employees
        </router-link>

        <button v-if="employee" class="btn btn-outline-primary" @click="toggleEdit">
          {{ isEditing ? 'Cancel Edit' : 'Edit' }}
        </button>

        <button v-if="employee" class="btn btn-outline-danger" @click="handleDelete" :disabled="employeeStore.loading">
          Delete
        </button>
      </div>
    </div>

    <div v-if="employeeStore.error" class="alert alert-danger">
      {{ employeeStore.error }}
    </div>

    <div v-if="employeeStore.loading" class="text-muted mb-3">
      Loading employee…
    </div>

    <div v-if="!employee && !employeeStore.loading" class="card bank-card">
      <div class="card-body">
        <h5 class="mb-1">Employee not found</h5>
        <p class="text-muted mb-0">This ID doesn’t match any employee in your dataset.</p>
      </div>
    </div>

    <div v-else-if="employee" class="row g-3">
      <div class="col-12 col-lg-4">
        <div class="card bank-card h-100">
          <div class="card-body">
            <div class="bank-avatar mb-3">
              {{ initials(employee.name) }}
            </div>

            <h4 class="mb-1">{{ employee.name }}</h4>
            <div class="text-muted">
              {{ employee.position || '—' }} • {{ employee.department || '—' }}
            </div>

            <hr class="my-3"/>

            <div class="small text-muted">Employee ID</div>
            <div class="fw-semibold mb-2">{{ employeeId }}</div>

            <div class="small text-muted">Contact</div>
            <div class="fw-semibold">{{ employee.contact || '—' }}</div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-8">
        <div class="card bank-card">
          <div class="card-body">
            <h5 class="mb-3">Employment Details</h5>

            <!-- VIEW MODE -->
            <div v-if="!isEditing" class="row g-3">
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
                <div class="fw-semibold">
                  {{ employee.employmentHistory || employee.employment_history || '—' }}
                </div>
              </div>
            </div>

            <!-- EDIT MODE -->
            <div v-else class="row g-3">
              <div class="col-md-6">
                <div class="text-muted small mb-1">Name</div>
                <input v-model="editForm.name" class="form-control" type="text">
              </div>
              <div class="col-md-6">
                <div class="text-muted small mb-1">Contact</div>
                <input v-model="editForm.contact" class="form-control" type="text">
              </div>
              <div class="col-md-6">
                <div class="text-muted small mb-1">Position</div>
                <input v-model="editForm.position" class="form-control" type="text">
              </div>
              <div class="col-md-6">
                <div class="text-muted small mb-1">Department</div>
                <input v-model="editForm.department" class="form-control" type="text">
              </div>
              <div class="col-md-6">
                <div class="text-muted small mb-1">Salary (ZAR)</div>
                <input v-model.number="editForm.salary" class="form-control" type="number">
              </div>
              <div class="col-md-6">
                <div class="text-muted small mb-1">History / Notes</div>
                <input v-model="editForm.employmentHistory" class="form-control" type="text">
              </div>

              <div class="col-12 d-flex justify-content-end gap-2 mt-2">
                <button class="btn btn-outline-secondary" @click="toggleEdit" :disabled="employeeStore.loading">
                  Cancel
                </button>
                <button class="btn bank-primary" @click="handleUpdate" :disabled="employeeStore.loading">
                  {{ employeeStore.loading ? 'Saving…' : 'Save Changes' }}
                </button>
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
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmployeeStore } from '../stores/employeeStore'

const route = useRoute()
const router = useRouter()
const employeeStore = useEmployeeStore()

const routeId = computed(() => Number(route.params.id))

const employee = computed(() => {
  return employeeStore.getEmployeeById(routeId.value) || employeeStore.selectedEmployee
})

const employeeId = computed(() => {
  if (!employee.value) return '—'
  return employee.value.employeeId ?? employee.value.employee_id ?? '—'
})

const money = (n) =>
  Number(n || 0).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })

const initials = (name = '') => {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] || ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

// --- Edit / Update ---
const isEditing = ref(false)
const editForm = ref({
  name: '',
  position: '',
  department: '',
  salary: 0,
  contact: '',
  employmentHistory: ''
})

const fillForm = () => {
  if (!employee.value) return
  editForm.value = {
    name: employee.value.name || '',
    position: employee.value.position || '',
    department: employee.value.department || '',
    salary: Number(employee.value.salary || 0),
    contact: employee.value.contact || '',
    employmentHistory: employee.value.employmentHistory || employee.value.employment_history || ''
  }
}

watch(employee, fillForm)

const toggleEdit = () => {
  isEditing.value = !isEditing.value
  if (isEditing.value) fillForm()
}

const handleUpdate = async () => {
  if (!editForm.value.name?.trim()) {
    alert('Name is required')
    return
  }
  await employeeStore.updateEmployee(employeeId.value, { ...editForm.value })
  isEditing.value = false
}

const handleDelete = async () => {
  const ok = confirm(`Delete ${employee.value?.name}? This cannot be undone.`)
  if (!ok) return
  const success = await employeeStore.deleteEmployee(employeeId.value)
  if (success) router.push('/employees')
}

onMounted(async () => {
  if (employeeStore.employees.length === 0) {
    await employeeStore.fetchEmployees()
  }
  await employeeStore.fetchEmployee(routeId.value)
})
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
