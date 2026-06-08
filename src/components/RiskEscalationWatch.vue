<template>
  <div class="risk-watch card">
    <h2 class="section-title">Risk & Escalation Watch</h2>
    <div class="risk-items">
      <div
        v-for="riskCase in riskCases"
        :key="riskCase.id"
        class="risk-item"
        :class="`risk-level-${riskCase.riskLevel}`"
      >
        <div class="risk-header">
          <span class="risk-icon">
            <span v-if="riskCase.riskLevel === 'critical'">🚨</span>
            <span v-else-if="riskCase.riskLevel === 'high'">⚠️</span>
            <span v-else>ℹ️</span>
          </span>
          <p class="risk-client">{{ riskCase.clientName }}</p>
        </div>
        <p class="risk-reason">{{ getRiskReason(riskCase) }}</p>
        <div class="risk-meta">
          <span class="risk-label">{{ riskCase.caseType }}</span>
          <span class="risk-time">{{ riskCase.hoursRemaining }}h left</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { riskCases } from '../data'
import type { Case } from '../types'

const getRiskReason = (caseItem: Case): string => {
  if (caseItem.riskLevel === 'critical') return 'Critical SLA risk'
  if (caseItem.hoursRemaining < 12) return 'SLA deadline approaching'
  if (caseItem.reopened) return 'Case reopened'
  if (caseItem.noActivityDays >= 3) return `No activity for ${caseItem.noActivityDays} days`
  return 'Escalation pending'
}
</script>

<style scoped>
.risk-watch {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--neutral-900);
  margin: 0;
}

.risk-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.risk-item {
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  border-left: 4px solid;
  transition: all 0.2s ease;
}

.risk-item:hover {
  transform: translateX(4px);
}

.risk-level-critical {
  background-color: rgba(239, 68, 68, 0.08);
  border-color: var(--danger-color);
}

.risk-level-high {
  background-color: rgba(245, 158, 11, 0.08);
  border-color: var(--warning-color);
}

.risk-level-medium {
  background-color: rgba(59, 130, 246, 0.08);
  border-color: var(--info-color);
}

.risk-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: 0.375rem;
}

.risk-icon {
  font-size: 1rem;
}

.risk-client {
  font-weight: 600;
  color: var(--neutral-900);
  margin: 0;
  font-size: 0.8625rem;
}

.risk-reason {
  font-size: 0.8125rem;
  font-weight: 400;
  color: var(--neutral-700);
  margin: 0 0 0.375rem 0;
  line-height: 1.3;
}

.risk-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-sm);
}

.risk-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--neutral-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.risk-time {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--warning-color);
}

@media (max-width: 640px) {
  .risk-item {
    padding: var(--spacing-md);
  }

  .risk-client {
    font-size: 0.8125rem;
  }
}
</style>
