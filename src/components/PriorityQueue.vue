<template>
  <div class="priority-queue card">
    <div class="queue-header">
      <h2 class="section-title">Priority Queue</h2>
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

    <div class="cases-list">
      <div
        v-for="caseItem in filteredAndSortedCases"
        :key="caseItem.id"
        class="case-row card-hover"
        @click="selectCase(caseItem)"
      >
        <div class="case-main">
          <div class="case-header">
            <h3 class="case-title">{{ caseItem.clientName }}</h3>
            <div class="case-badges">
              <span v-if="caseItem.riskLevel === 'critical'" class="badge badge-danger">
                🚨 Critical
              </span>
              <span v-else-if="caseItem.riskLevel === 'high'" class="badge badge-warning">
                ⚠ High Risk
              </span>
              <span v-if="caseItem.reopened" class="badge badge-warning">
                ↩ Reopened
              </span>
              <span v-if="caseItem.highValue" class="badge badge-info">
                ⭐ VIP
              </span>
              <span v-if="caseItem.complianceFlag" class="badge badge-danger">
                🔒 Compliance
              </span>
            </div>
          </div>

          <div class="case-details">
            <div class="detail-item">
              <span class="detail-label">Type:</span>
              <span class="detail-value">{{ caseItem.caseType }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Status:</span>
              <span class="detail-value" :class="`status-${caseItem.status.toLowerCase().replace(/\s+/g, '-')}`">
                {{ caseItem.status }}
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Last Activity:</span>
              <span class="detail-value text-muted">{{ caseItem.lastActivityTime }}</span>
            </div>
          </div>

          <div class="case-action">
            <p class="action-text">{{ caseItem.recommendedAction }}</p>
          </div>
        </div>

        <div class="case-sla" :class="getSLAClass(caseItem.hoursRemaining)">
          <div class="sla-hours">{{ caseItem.hoursRemaining }}h</div>
          <div class="sla-label">remaining</div>
        </div>
      </div>
    </div>
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

const selectCase = (caseItem: Case) => {
  emit('case-selected', caseItem)
}

const getSLAClass = (hours: number): string => {
  if (hours < 4) return 'critical'
  if (hours < 12) return 'warning'
  return 'healthy'
}
</script>

<style scoped>
.priority-queue {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.queue-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

.section-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0;
  flex-shrink: 0;
}

.queue-controls {
  display: flex;
  gap: var(--spacing-md);
}

.filter-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-md);
  background: white;
  font-size: 0.875rem;
  color: var(--neutral-700);
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.filter-select:hover {
  border-color: var(--neutral-300);
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

.cases-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.case-row {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: var(--spacing-lg);
  background: white;
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s ease;
}

.case-row:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
  background: rgba(14, 165, 233, 0.02);
}

.case-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.case-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-md);
}

.case-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0;
  flex: 1;
}

.case-badges {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  justify-content: flex-end;
}

.case-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--neutral-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 0.875rem;
  color: var(--neutral-700);
  font-weight: 500;
}

.status-new {
  color: var(--info-color);
}

.status-in-progress {
  color: var(--primary-color);
}

.status-waiting-on-client {
  color: var(--warning-color);
}

.status-waiting-on-internal-team {
  color: var(--warning-color);
}

.status-escalated {
  color: var(--danger-color);
  font-weight: 700;
}

.status-ready-to-close {
  color: var(--success-color);
}

.case-action {
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--neutral-100);
}

.action-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0;
}

.case-sla {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  font-weight: 700;
  margin-left: var(--spacing-lg);
}

.case-sla.critical {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--danger-color);
}

.case-sla.warning {
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--warning-color);
}

.case-sla.healthy {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
}

.sla-hours {
  font-size: 1.25rem;
}

.sla-label {
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.25rem;
}

@media (max-width: 1000px) {
  .queue-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .case-details {
    grid-template-columns: repeat(2, 1fr);
  }

  .case-row {
    flex-direction: column;
  }

  .case-sla {
    margin-left: 0;
    margin-top: var(--spacing-md);
    width: 100%;
  }
}

@media (max-width: 640px) {
  .queue-controls {
    flex-direction: column;
    width: 100%;
  }

  .filter-select {
    width: 100%;
  }

  .case-details {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .case-badges {
    justify-content: flex-start;
  }
}
</style>
