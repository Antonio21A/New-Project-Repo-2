import { defineStore } from 'pinia'
import { ref } from 'vue'
import payrollData from '../data/payroll_data.json'

export const usePayrollStore = defineStore('payroll', () => {
  const payroll = ref(payrollData.payrollData)

  const getPayrollByEmployeeId = (id) => {
    return payroll.value.find(p => p.employeeId === id)
  }

  return { payroll, getPayrollByEmployeeId }
})
