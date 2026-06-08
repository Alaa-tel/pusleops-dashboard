<template>
  <div class="workload card">
    <h2 class="section-title">Today's Workload</h2>
    
    <div class="workload-content">
      <div class="workload-chart">
        <div
          v-for="metric in workloadData"
          :key="metric.status"
          class="workload-bar-item"
        >
          <div class="bar-label">
            <span class="status-name">{{ metric.status }}</span>
            <span class="bar-count">{{ metric.count }}</span>
          </div>
          <div class="bar-container">
            <div
              class="bar-fill"
              :style="{ width: (metric.count / maxWorkload) * 100 + '%' }"
              :class="getStatusClass(metric.status)"
            />
          </div>
        </div>
      </div>

      <div class="workload-stats">
        <div class="stat">
          <p class="stat-value">{{ totalCases }}</p>
          <p class="stat-label">Total Cases</p>
        </div>
        <div class="stat divider"></div>
        <div class="stat">
          <p class="stat-value">{{ urgentCount }}</p>
          <p class="stat-label">Urgent</p>
        </div>
        <div class="stat divider"></div>
        <div class="stat">
          <p class="stat-value">{{ completedCount }}</p>
          <p class="stat-label">Ready to Close</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { workloadData, sampleCases } from '../data'
import type { CaseStatus } from '../types'

const maxWorkload = computed(() => Math.max(...workloadData.map((m) => m.count)))

const totalCases = computed(() => sampleCases.length)

const urgentCount = computed(
  () => sampleCases.filter((c) => c.riskLevel === 'critical' || c.riskLevel === 'high').length
)

const completedCount = computed(() => sampleCases.filter((c) => c.status === 'Ready to close').length)

const getStatusClass = (status: CaseStatus): string => {
  const classMap: Record<CaseStatus, string> = {
    'New': 'status-new',
    'In progress': 'status-in-progress',
    'Waiting on client': 'status-waiting',
    'Waiting on internal team': 'status-waiting',
    'Escalated': 'status-escalated',
    'Ready to close': 'status-ready',
  }
  return classMap[status] || ''
}
</script>

<style scoped>
.workload {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.section-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0;
}

.workload-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.workload-chart {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.workload-bar-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bar-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--neutral-700);
}

.bar-count {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--neutral-600);
}

.bar-container {
  height: 24px;
  background-color: var(--neutral-100);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  min-width: 4px;
  transition: all 0.3s ease;
  border-radius: var(--radius-sm);
}

.bar-fill.status-new {
  background-color: var(--info-color);
}

.bar-fill.status-in-progress {
  background-color: var(--primary-color);
}

.bar-fill.status-waiting {
  background-color: var(--warning-color);
}

.bar-fill.status-escalated {
  background-color: var(--danger-color);
}

.bar-fill.status-ready {
  background-color: var(--success-color);
}

.workload-stats {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: 0;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--neutral-200);
}

.stat {
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--neutral-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0.25rem 0 0 0;
}

.divider {
  width: 1px;
  height: 40px;
  background-color: var(--neutral-200);
  margin: auto 0;
}

@media (max-width: 640px) {
  .workload-stats {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .divider {
    display: none;
  }
}
</style>
