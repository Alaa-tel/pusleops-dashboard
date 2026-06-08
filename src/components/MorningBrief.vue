<template>
  <div class="morning-brief">
    <h2 class="section-title">Today Needs Your Attention</h2>
    <div class="metrics-grid">
      <MetricCard
        v-for="metric in metrics"
        :key="metric.label"
        :metric="metric"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { morningBriefData } from '../data'
import MetricCard from './MetricCard.vue'

const metrics = morningBriefData
</script>

<style scoped>
.morning-brief {
  padding: var(--spacing-lg);
  background: white;
  border-radius: var(--radius-xl);
  border: 1px solid var(--neutral-200);
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--neutral-900);
  margin: 0 0 var(--spacing-md) 0;
  letter-spacing: -0.125px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

@media (max-width: 900px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
  }
}

@media (max-width: 640px) {
  .morning-brief {
    padding: var(--spacing-lg);
  }

  .section-title {
    font-size: 1.125rem;
    margin-bottom: var(--spacing-md);
  }

  .metrics-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
}
</style>
