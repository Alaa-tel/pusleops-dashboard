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
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(6, 182, 212, 0.08));
  border: 1px solid rgba(14, 165, 233, 0.2);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  transition: all 0.2s ease;
}

.metric-card:hover {
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.1);
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
}

.metric-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--neutral-600);
  margin: 0;
}

.trend {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.trend.up {
  color: var(--success-color);
}

.trend.down {
  color: var(--warning-color);
}

.trend.stable {
  color: var(--neutral-500);
}

.trend-icon {
  font-weight: 700;
}

.metric-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0;
}

@media (max-width: 640px) {
  .metric-card {
    padding: var(--spacing-md);
  }

  .metric-value {
    font-size: 1.5rem;
  }
}
</style>
