import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useAttendanceStore = defineStore('attendance', () => {
  const records = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchAttendance = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await api.getAttendance()
      records.value = res.data
    } catch (e) {
      error.value = e?.response?.data?.error || 'Failed to load attendance'
      records.value = []
    } finally {
      loading.value = false
    }
  }

  const approveLeave = async (employeeId, dateOrLeaveId) => {
    try {
    
      if (typeof dateOrLeaveId === 'number') {
        await api.approveLeave(dateOrLeaveId)
      }

      
      const emp = records.value.find(e =>
        Number(e.employeeId ?? e.employee_id) === Number(employeeId)
      )
      if (!emp) return

      const leave = (emp.leaveRequests || emp.leave_requests || [])
        .find(l => l.date === dateOrLeaveId || l.id === dateOrLeaveId)

      if (leave) leave.status = 'Approved'
    } catch (e) {
      error.value = 'Failed to approve leave'
    }
  }

  const denyLeave = async (employeeId, dateOrLeaveId) => {
    try {
      if (typeof dateOrLeaveId === 'number') {
        await api.denyLeave(dateOrLeaveId)
      }

      const emp = records.value.find(e =>
        Number(e.employeeId ?? e.employee_id) === Number(employeeId)
      )
      if (!emp) return

      const leave = (emp.leaveRequests || emp.leave_requests || [])
        .find(l => l.date === dateOrLeaveId || l.id === dateOrLeaveId)

      if (leave) leave.status = 'Denied'
    } catch (e) {
      error.value = 'Failed to deny leave'
    }
  }

  return {
    records,
    loading,
    error,
    fetchAttendance,
    approveLeave,
    denyLeave
  }
})
