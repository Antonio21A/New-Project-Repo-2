<template>
  <div class="container mt-4">
    <h2>Employee List</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Position</th>
          <th>Department</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in employees" :key="emp.id">
          <td>{{ emp.name }}</td>
          <td>{{ emp.email }}</td>
          <td>{{ emp.position }}</td>
          <td>{{ emp.department }}</td>
          <td>${{ emp.salary }}</td>
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
