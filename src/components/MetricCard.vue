<template>
  <div class="metric-card">
    <div class="metric-header">
      <p class="metric-label">{{ metric.label }}</p>
      <div v-if="metric.trend" class="trend" :class="metric.trend">
        <span v-if="metric.trend === 'up'" class="trend-icon">↑</span>
        <span v-else-if="metric.trend === 'down'" class="trend-icon">↓</span>
        <span v-else class="trend-icon">—</span>
        <span v-if="metric.change" class="trend-value">{{ Math.abs(metric.change) }}</span>
      </div>
    </div>
    <p class="metric-value">{{ metric.value }}</p>
  </div>
</template>

<script setup lang="ts">
import type { MorningBriefMetric } from '../types'

defineProps<{
  metric: MorningBriefMetric
}>()
</script>

<style scoped>
.metric-card {
  background: white;
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-xl);
  padding: var(--spacing-md);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.metric-card:hover {
  border-color: var(--neutral-300);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-md);
}

.metric-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--neutral-500);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.trend {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
}

.trend.up {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
}

.trend.down {
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--warning-color);
}

.trend.stable {
  background-color: var(--neutral-100);
  color: var(--neutral-600);
}

.trend-icon {
  font-weight: 600;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0;
  line-height: 1;
  letter-spacing: -0.5px;
}

@media (max-width: 640px) {
  .metric-card {
    padding: var(--spacing-md);
  }

  .metric-value {
    font-size: 1.625rem;
  }
}
</style>
