<template>
  <div class="container mt-4">
    <h2>Attendance & Time-Off</h2>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Days Present</th>
          <th>Days Absent</th>
          <th>Pending Time-Off Requests</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in employees" :key="emp.id">
          <td>{{ emp.name }}</td>
          <td>{{ emp.attendance.daysPresent }}</td>
          <td>{{ emp.attendance.daysAbsent }}</td>
          <td>{{ emp.attendance.timeOffRequests.length }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useEmployeeStore } from '../stores/employeeStore'

const store = useEmployeeStore()
const employees = store.employees
</script>
