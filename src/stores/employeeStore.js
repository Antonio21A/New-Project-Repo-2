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

  return {
    employees,
    selectedEmployee,
    loading,
    error,
    fetchEmployees,
    fetchEmployee,
    getEmployeeById,
    addEmployee
  }
})
