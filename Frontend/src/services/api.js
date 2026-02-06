import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000/api', 
  withCredentials: true,             
})

export default {
  login(credentials) {
    return API.post('/auth/login', credentials)
  },

  getEmployees() {
    return API.get('/employees')
  },

  getEmployee(id) {
    return API.get(`/employees/${id}`)
  },

  addEmployee(data) {
    return API.post('/employees', data)
  },

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

  getPayroll() {
    return API.get('/payroll')
  }
}
