<template>
  <div class="priority-queue">
    <div class="queue-header">
      <div>
        <h2 class="section-title">Your Cases</h2>
        <p class="section-subtitle">{{ filteredAndSortedCases.length }} cases total</p>
      </div>
      <div class="queue-controls">
        <select v-model="filterStatus" class="filter-select">
          <option value="">All cases</option>
          <option value="In progress">In Progress</option>
          <option value="Waiting on client">Waiting on Client</option>
          <option value="Escalated">Escalated</option>
        </select>
        <select v-model="sortBy" class="filter-select">
          <option value="priority">By Priority</option>
          <option value="sla">By SLA Risk</option>
          <option value="activity">By Last Activity</option>
        </select>
      </div>
    </div>

    <div class="cases-table">
      <div class="table-header">
        <div class="col-client">Client</div>
        <div class="col-type">Type</div>
        <div class="col-status">Status</div>
        <div class="col-activity">Last Activity</div>
        <div class="col-sla">SLA</div>
      </div>
      <div v-for="caseItem in paginatedCases" :key="caseItem.id" class="table-row" @click="selectCase(caseItem)">
        <div class="col-client">
          <p class="client-name">{{ caseItem.clientName }}</p>
          <div v-if="caseItem.highValue" class="badge badge-info">⭐ VIP</div>
        </div>
        <div class="col-type">{{ caseItem.caseType }}</div>
        <div class="col-status">
          <span :class="['status-badge', `status-${caseItem.status.toLowerCase().replace(/\s+/g, '-')}`]">
            {{ caseItem.status }}
          </span>
        </div>
        <div class="col-activity">{{ caseItem.lastActivityTime }}</div>
        <div class="col-sla">
          <div :class="['sla-pill', getSLAClass(caseItem.hoursRemaining)]">
            {{ caseItem.hoursRemaining }}h
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button :disabled="currentPage === 1" @click="previousPage" class="pagination-btn">
        ← Previous
      </button>
      <span class="pagination-info">Page {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage" class="pagination-btn">
        Next →
      </button>
    </div>
    <a href="#" class="view-all-link">View all cases →</a>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { sampleCases } from '../data'
import type { Case } from '../types'

const emit = defineEmits<{
  'case-selected': [caseItem: Case]
}>()

const filterStatus = ref<string>('')
const sortBy = ref<'priority' | 'sla' | 'activity'>('priority')
const currentPage = ref<number>(1)
const itemsPerPage = 5

const filteredAndSortedCases = computed(() => {
  let filtered = sampleCases

  if (filterStatus.value) {
    filtered = filtered.filter((c) => c.status === filterStatus.value)
  }

  let sorted = [...filtered]

  if (sortBy.value === 'priority') {
    sorted.sort((a, b) => a.priority - b.priority)
  } else if (sortBy.value === 'sla') {
    sorted.sort((a, b) => a.hoursRemaining - b.hoursRemaining)
  } else if (sortBy.value === 'activity') {
    sorted.sort((a, b) => {
      const timeOrder: Record<string, number> = {
        'min ago': 1,
        'hour ago': 2,
        'hours ago': 3,
        'day ago': 4,
        'days ago': 5,
      }
      const aTime = timeOrder[a.lastActivityTime.match(/\w+\s+ago/)?.[0] ?? ''] ?? 100
      const bTime = timeOrder[b.lastActivityTime.match(/\w+\s+ago/)?.[0] ?? ''] ?? 100
      return aTime - bTime
    })
  }

  return sorted
})

const totalPages = computed(() => Math.ceil(filteredAndSortedCases.value.length / itemsPerPage))

const paginatedCases = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredAndSortedCases.value.slice(start, end)
})

const selectCase = (caseItem: Case) => {
  emit('case-selected', caseItem)
}

const getSLAClass = (hours: number): string => {
  if (hours < 4) return 'critical'
  if (hours < 12) return 'warning'
  return 'healthy'
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<style scoped>
.priority-queue {
  background: white;
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.queue-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-lg);
}

.section-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0;
  letter-spacing: -0.5px;
}

.section-subtitle {
  font-size: 0.75rem;
  color: var(--neutral-500);
  margin: 0.125rem 0 0 0;
}

.queue-controls {
  display: flex;
  gap: var(--spacing-sm);
  flex-shrink: 0;
}

.filter-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--neutral-300);
  border-radius: var(--radius-lg);
  background: white;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--neutral-700);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-select:hover {
  border-color: var(--neutral-400);
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

/* Table Styles */
.cases-table {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1fr 1.2fr 0.8fr;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background-color: var(--neutral-50);
  border-bottom: 1px solid var(--neutral-200);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--neutral-600);
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1fr 1.2fr 0.8fr;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  align-items: center;
  border-bottom: 1px solid var(--neutral-200);
  cursor: pointer;
  transition: all 0.2s ease;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background-color: var(--neutral-50);
}

.client-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--neutral-900);
  margin: 0;
}

.col-type {
  font-size: 0.8125rem;
  color: var(--neutral-700);
}

.col-activity {
  font-size: 0.8125rem;
  color: var(--neutral-600);
}

.status-badge {
  display: inline-block;
  padding: 0.3rem 0.6rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: fit-content;
}

.status-new {
  background-color: rgba(59, 130, 246, 0.1);
  color: var(--info-color);
}

.status-in-progress {
  background-color: rgba(14, 165, 233, 0.1);
  color: var(--primary-color);
}

.status-waiting-on-client {
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--warning-color);
}

.status-waiting-on-internal-team {
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--warning-color);
}

.status-escalated {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--danger-color);
}

.status-ready-to-close {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
}

.sla-pill {
  display: inline-block;
  padding: 0.375rem 0.6rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-align: center;
  width: fit-content;
}

.sla-pill.critical {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--danger-color);
}

.sla-pill.warning {
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--warning-color);
}

.sla-pill.healthy {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) 0;
}

.pagination-btn {
  padding: 0.35rem 0.75rem;
  background: transparent;
  border: 1px solid var(--neutral-300);
  border-radius: var(--radius-md);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--neutral-600);
  cursor: pointer;
  transition: all 0.2s ease;
  height: 28px;
}

.pagination-btn:hover:not(:disabled) {
  background-color: var(--neutral-50);
  border-color: var(--neutral-400);
  color: var(--neutral-700);
}

.pagination-btn:active:not(:disabled) {
  background-color: var(--neutral-100);
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--neutral-600);
  min-width: 100px;
  text-align: center;
}

.view-all-link {
  text-align: center;
  color: var(--primary-color);
  font-size: 0.8125rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  margin-top: var(--spacing-sm);
  display: inline-block;
}

.view-all-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

@media (max-width: 1000px) {
  .table-header,
  .table-row {
    grid-template-columns: 1.5fr 1.2fr 0.9fr 0.9fr 0.7fr;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
  }
}

@media (max-width: 768px) {
  .queue-header {
    flex-direction: column;
    width: 100%;
  }

  .queue-controls {
    width: 100%;
    flex-direction: column;
  }

  .filter-select {
    width: 100%;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
  }

  .col-client {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
