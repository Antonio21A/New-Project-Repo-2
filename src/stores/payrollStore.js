import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const usePayrollStore = defineStore('payroll', () => {
  const payroll = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchPayroll = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await api.getPayroll()
      payroll.value = res.data
    } catch (e) {
      error.value = e?.response?.data?.error || 'Failed to load payroll'
      payroll.value = []
    } finally {
      loading.value = false
    }
  }

  const getPayrollByEmployeeId = (id) => {
    const numId = Number(id)
    return payroll.value.find(p =>
      Number(p.employeeId ?? p.employee_id) === numId
    )
  }

  return {
    payroll,
    loading,
    error,
    fetchPayroll,
    getPayrollByEmployeeId
  }
})
