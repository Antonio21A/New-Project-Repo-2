import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
})

export default {
  // ---------------- AUTH ----------------
  login(credentials) {
    return API.post('/auth/login', credentials)
  },

  // ---------------- EMPLOYEES ----------------
  getEmployees() {
    return API.get('/employees')
  },

  getEmployee(id) {
    return API.get(`/employees/${id}`)
  },

  addEmployee(data) {
    return API.post('/employees', data)
  },

  // ✅ NEW
  updateEmployee(id, data) {
    return API.put(`/employees/${id}`, data)
  },

  // ✅ NEW
  deleteEmployee(id) {
    return API.delete(`/employees/${id}`)
  },

  // ---------------- ATTENDANCE ----------------
  getAttendance() {
    return API.get('/attendance')
  },

  requestLeave(data) {
    return API.post('/leave', data)
  },

  approveLeave(employeeId, leaveId) {
    return API.patch(`/leave/${leaveId}/approve`, { employeeId })
  },

  denyLeave(employeeId, leaveId) {
    return API.patch(`/leave/${leaveId}/deny`, { employeeId })
  },

  // ---------------- PAYROLL ----------------
  getPayroll() {
    return API.get('/payroll')
  }
}
