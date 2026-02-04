<template>
  <div class="container py-4">
    <h2 class="mb-3">Attendance & Leave</h2>

    <div class="row g-3">
      <div class="col-12 col-lg-6" v-for="emp in records" :key="emp.employeeId">
        <div class="card bank-card">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div>
                <h5 class="mb-0">{{ emp.name }}</h5>
                <small class="text-muted">ID: {{ emp.employeeId }}</small>
              </div>
              <small class="text-muted">
                Present: {{ (emp.attendance||[]).filter(a=>a.status==='Present').length }}
              </small>
            </div>

            <hr class="my-3" />

            <div class="mb-3">
              <div class="small text-muted mb-2">Attendance</div>
              <div class="d-flex flex-wrap gap-2">
                <span v-for="att in (emp.attendance||[])" :key="att.date"
                      class="badge rounded-pill"
                      :class="att.status==='Present' ? 'text-bg-success' : 'text-bg-danger'">
                  {{ att.date }} • {{ att.status }}
                </span>
              </div>
            </div>

            <div class="small text-muted mb-2">Leave Requests</div>
            <div v-if="!(emp.leaveRequests||[]).length" class="text-muted">None</div>

            <ul v-else class="list-group list-group-flush">
              <li v-for="l in emp.leaveRequests" :key="l.date"
                  class="list-group-item d-flex justify-content-between align-items-center px-0">
                <div>
                  <div class="fw-medium">{{ l.date }}</div>
                  <div class="text-muted small">{{ l.reason }}</div>
                </div>

                <div class="text-end">
                  <span class="badge rounded-pill"
                        :class="l.status==='Approved' ? 'text-bg-success' : l.status==='Denied' ? 'text-bg-danger' : 'text-bg-warning'">
                    {{ l.status }}
                  </span>

                  <div v-if="l.status==='Pending'" class="mt-2">
                    <button class="btn btn-sm btn-success" @click="approve(emp.employeeId,l.date)">Approve</button>
                    <button class="btn btn-sm btn-outline-danger ms-2" @click="deny(emp.employeeId,l.date)">Deny</button>
                  </div>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAttendanceStore } from '../stores/attendanceStore'
const store = useAttendanceStore()
const records = store.records
const approve = store.approveLeave
const deny = store.denyLeave
</script>

<style scoped>
.bank-card{
  border-radius:16px;
  border:1px solid rgba(10,35,66,.08);
  box-shadow:0 10px 24px rgba(10,35,66,.06);
}
</style>
