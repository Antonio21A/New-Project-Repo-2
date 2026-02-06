<template>
  <div class="container mt-4">
    <h2>Payroll</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Employee</th>
          <th>Hours Worked</th>
          <th>Leave Deductions</th>
          <th>Final Salary</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in payrollRecords" :key="emp.employeeId">
          <td>{{ getEmployee(emp.employeeId).name }}</td>
          <td>{{ emp.hoursWorked }}</td>
          <td>{{ emp.leaveDeductions }}</td>
          <td>${{ emp.finalSalary }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { usePayrollStore } from '../stores/payrollStore'
import { useEmployeeStore } from '../stores/employeeStore'

const payrollStore = usePayrollStore()
const employeeStore = useEmployeeStore()

const payrollRecords = payrollStore.payroll

const getEmployee = (id) => employeeStore.getEmployeeById(id)
</script>
