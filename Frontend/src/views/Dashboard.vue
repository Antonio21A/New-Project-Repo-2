<template>
  <div class="container py-4">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
      <h2 class="mb-0">Dashboard</h2>
      <button class="btn btn-outline-secondary btn-sm" @click="refreshAll" :disabled="isLoading">
        {{ isLoading ? 'Loading…' : 'Refresh' }}
      </button>
    </div>

    <div v-if="anyError" class="alert alert-danger">
      {{ anyError }}
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-md-4">
        <div class="card bank-card">
          <div class="card-body">
            <div class="text-muted small">Total Employees</div>
            <div class="display-6 fw-semibold">{{ totalEmployees }}</div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="card bank-card">
          <div class="card-body">
            <div class="text-muted small">Payroll Records</div>
            <div class="display-6 fw-semibold">{{ totalPayrollRecords }}</div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="card bank-card">
          <div class="card-body">
            <div class="text-muted small">Pending Leave</div>
            <div class="display-6 fw-semibold">{{ pendingLeave }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-lg-5">
        <div class="card bank-card">
          <div class="card-body">
            <h5 class="mb-2">Attendance Mix</h5>
            <div v-if="isLoading && !attendanceStore.records.length" class="text-muted small mb-2">
              Loading attendance…
            </div>
            <div style="height:300px"><canvas ref="chartEl"></canvas></div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-7">
        <div class="card bank-card">
          <div class="card-body">
            <h5 class="mb-2">Pending Leave Requests</h5>
            <div class="table-responsive">
              <table class="table table-sm mb-0">
                <thead>
                  <tr class="text-muted small">
                    <th>Employee</th>
                    <th>Date</th>
                    <th>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="r in pendingRows" :key="(r.employeeId ?? r.employee_id) + '-' + r.date">
                    <td class="fw-medium">{{ r.name }}</td>
                    <td>{{ r.date }}</td>
                    <td class="text-muted">{{ r.reason }}</td>
                  </tr>
                  <tr v-if="!pendingRows.length">
                    <td colspan="3" class="text-muted">None</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import Chart from 'chart.js/auto'
import { useAttendanceStore } from '../stores/attendanceStore'
import { useEmployeeStore } from '../stores/employeeStore'
import { usePayrollStore } from '../stores/payrollStore'

const attendanceStore = useAttendanceStore()
const employeeStore = useEmployeeStore()
const payrollStore = usePayrollStore()

const chartEl = ref(null)
let chart = null

const totalEmployees = computed(() => employeeStore.employees.length)
const totalPayrollRecords = computed(() => payrollStore.payroll.length)

const anyError = computed(() => {
  return employeeStore.error || payrollStore.error || attendanceStore.error || null
})

const isLoading = computed(() => {
  return employeeStore.loading || payrollStore.loading || attendanceStore.loading
})

const allAttendance = computed(() => {
  const records = attendanceStore.records || []
  return records.flatMap(e => (e.attendance || []))
})

const presentTotal = computed(() => allAttendance.value.filter(a => a.status === 'Present').length)
const absentTotal = computed(() => allAttendance.value.filter(a => a.status !== 'Present').length)

const pendingRows = computed(() => {
  const rows = []
  for (const emp of (attendanceStore.records || [])) {
    const leaves = emp.leaveRequests || emp.leave_requests || []
    for (const l of leaves) {
      if (l.status === 'Pending') {
        rows.push({
          employeeId: emp.employeeId ?? emp.employee_id,
          name: emp.name,
          date: l.date,
          reason: l.reason
        })
      }
    }
  }
  return rows
})

const pendingLeave = computed(() => pendingRows.value.length)

const renderChart = () => {
  if (!chartEl.value) return
  const ctx = chartEl.value.getContext('2d')
  const data = [presentTotal.value, absentTotal.value]

  if (chart) {
    chart.data.datasets[0].data = data
    chart.update()
    return
  }

  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Present', 'Absent'],
      datasets: [
        {
          data,
          backgroundColor: ['#0ea5a4', '#0b1f3a'] 
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: { legend: { position: 'bottom' } }
    }
  })
}

const refreshAll = async () => {
  await Promise.all([
    employeeStore.fetchEmployees(),
    payrollStore.fetchPayroll(),
    attendanceStore.fetchAttendance()
  ])
}

onMounted(async () => {
  await refreshAll()
  renderChart()
})

watch([presentTotal, absentTotal], renderChart)
onBeforeUnmount(() => chart?.destroy())
</script>

<style scoped>
.bank-card{
  border-radius:16px;
  border:1px solid rgba(10,35,66,.08);
  box-shadow:0 10px 24px rgba(10,35,66,.06);
}
</style>
