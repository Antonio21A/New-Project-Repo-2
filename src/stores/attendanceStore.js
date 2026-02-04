import { defineStore } from 'pinia'
import { ref } from 'vue'
import attendanceData from '../data/attendance.json'

export const useAttendanceStore = defineStore('attendance', () => {
  const records = ref(attendanceData.attendanceAndLeave)

  const approveLeave = (employeeId, date) => {
    const emp = records.value.find(e => e.employeeId === employeeId)
    if (emp) {
      const leave = emp.leaveRequests.find(l => l.date === date)
      if (leave) leave.status = 'Approved'
    }
  }

  const denyLeave = (employeeId, date) => {
    const emp = records.value.find(e => e.employeeId === employeeId)
    if (emp) {
      const leave = emp.leaveRequests.find(l => l.date === date)
      if (leave) leave.status = 'Denied'
    }
  }

  return { records, approveLeave, denyLeave }
})
