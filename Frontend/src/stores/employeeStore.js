import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref([])
  const selectedEmployee = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const getEmployeeById = (id) => {
    const numId = Number(id)
    return employees.value.find(emp =>
      Number(emp.employeeId ?? emp.employee_id) === numId
    )
  }

  const fetchEmployees = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await api.getEmployees()
      employees.value = res.data
    } catch (e) {
      error.value = e?.response?.data?.error || 'Failed to load employees'
      employees.value = []
    } finally {
      loading.value = false
    }
  }

  const fetchEmployee = async (id) => {
    loading.value = true
    error.value = null
    try {
      const res = await api.getEmployee(id)
      selectedEmployee.value = res.data
      return res.data
    } catch (e) {
      error.value = e?.response?.data?.error || 'Failed to load employee'
      selectedEmployee.value = null
      return null
    } finally {
      loading.value = false
    }
  }

  const addEmployee = async (employee) => {
    loading.value = true
    error.value = null
    try {
      const res = await api.addEmployee(employee)
      employees.value.unshift(res.data)
      return res.data
    } catch (e) {
      error.value = e?.response?.data?.error || 'Failed to add employee'
      return null
    } finally {
      loading.value = false
    }
  }

  // ✅ NEW: Update
  const updateEmployee = async (id, data) => {
    loading.value = true
    error.value = null
    try {
      const res = await api.updateEmployee(id, data)
      const updated = res.data

      // update in list
      const idx = employees.value.findIndex(e =>
        Number(e.employeeId ?? e.employee_id) === Number(id)
      )
      if (idx !== -1) employees.value[idx] = updated

      // update selected if currently viewed
      if (
        selectedEmployee.value &&
        Number(selectedEmployee.value.employeeId ?? selectedEmployee.value.employee_id) === Number(id)
      ) {
        selectedEmployee.value = updated
      }

      return updated
    } catch (e) {
      error.value = e?.response?.data?.error || 'Failed to update employee'
      return null
    } finally {
      loading.value = false
    }
  }

  // ✅ NEW: Delete
  const deleteEmployee = async (id) => {
    loading.value = true
    error.value = null
    try {
      await api.deleteEmployee(id)

      employees.value = employees.value.filter(e =>
        Number(e.employeeId ?? e.employee_id) !== Number(id)
      )

      if (
        selectedEmployee.value &&
        Number(selectedEmployee.value.employeeId ?? selectedEmployee.value.employee_id) === Number(id)
      ) {
        selectedEmployee.value = null
      }

      return true
    } catch (e) {
      error.value = e?.response?.data?.error || 'Failed to delete employee'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    employees,
    selectedEmployee,
    loading,
    error,
    fetchEmployees,
    fetchEmployee,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
  }
})

state: () => ({
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null
})

getEmployeeById: (state) => (id) => {
  return state.employees.find(e =>
    (e.employeeId ?? e.employee_id) === id
  )
}




