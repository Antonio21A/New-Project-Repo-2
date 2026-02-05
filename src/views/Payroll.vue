<template>
  <div class="container mt-4">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
      <h2 class="mb-0">Payroll</h2>

      <button
        class="btn btn-outline-secondary btn-sm"
        @click="refreshAll"
        :disabled="payrollStore.loading || employeeStore.loading"
      >
        {{ payrollStore.loading || employeeStore.loading ? 'Loading…' : 'Refresh' }}
      </button>
    </div>

    <div v-if="payrollStore.error" class="alert alert-danger">
      {{ payrollStore.error }}
    </div>

    <div v-if="payrollStore.loading && payrollRecords.length === 0" class="text-muted mb-3">
      Loading payroll…
    </div>

    <table class="table table-bordered shadow-sm">
      <thead class="table-dark">
        <tr>
          <th>Employee</th>
          <th>Hours Worked</th>
          <th>Leave Deductions</th>
          <th>Final Salary</th>
          <th>Payslip</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in payrollRecords" :key="row.id ?? (row.employeeId ?? row.employee_id)">
          <td>{{ getEmployeeName(row.employeeId ?? row.employee_id) }}</td>
          <td>{{ row.hoursWorked ?? row.hours_worked ?? 0 }}</td>
          <td>{{ money(row.leaveDeductions ?? row.leave_deductions ?? 0) }}</td>
          <td>{{ money(row.finalSalary ?? row.final_salary ?? 0) }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="printPayslip(row)">
              Print
            </button>
          </td>
        </tr>

        <tr v-if="!payrollStore.loading && payrollRecords.length === 0">
          <td colspan="5" class="text-center text-muted py-4">
            No payroll records found.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { usePayrollStore } from '../stores/payrollStore'
import { useEmployeeStore } from '../stores/employeeStore'

const payrollStore = usePayrollStore()
const employeeStore = useEmployeeStore()

const payrollRecords = computed(() => payrollStore.payroll)

const money = (n) =>
  Number(n || 0).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })

const getEmployee = (id) => employeeStore.getEmployeeById(Number(id))

const getEmployeeName = (id) => {
  const emp = getEmployee(id)
  return emp?.name || `Unknown (#${id})`
}

const refreshAll = async () => {
  if (employeeStore.employees.length === 0) await employeeStore.fetchEmployees()
  await payrollStore.fetchPayroll()
}

const printPayslip = (row) => {
  const empId = row.employeeId ?? row.employee_id
  const employee = getEmployee(empId)

  const hours = row.hoursWorked ?? row.hours_worked ?? 0
  const deductions = row.leaveDeductions ?? row.leave_deductions ?? 0
  const finalSalary = row.finalSalary ?? row.final_salary ?? 0

  const content = `
    <div style="font-family:Arial;padding:16px;">
      <h2 style="margin:0 0 8px;">ModernTech HR - Payslip</h2>
      <p style="margin:0 0 16px;color:#555;">
        Employee: <strong>${employee?.name ?? `Unknown (#${empId})`}</strong>
      </p>

      <p><strong>Position:</strong> ${employee?.position ?? '-'}</p>
      <p><strong>Hours Worked:</strong> ${hours}</p>
      <p><strong>Leave Deductions:</strong> ${money(deductions)}</p>
      <p><strong>Final Salary:</strong> ${money(finalSalary)}</p>
    </div>
  `

  const win = window.open('', '', 'width=450,height=520')
  win.document.write(content)
  win.document.close()
  win.print()
}

onMounted(async () => {
  await refreshAll()
})
</script>
