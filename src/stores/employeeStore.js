import { defineStore } from 'pinia'
import { ref } from 'vue'
import employeesData from '../data/employee_info.json'

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref(employeesData.employeeInformation)

  const getEmployeeById = (id) => {
    return employees.value.find(emp => emp.employeeId === id)
  }

  const addEmployee = (employee) => {
    employees.value.push(employee)
  }

  return { employees, getEmployeeById, addEmployee }
})
