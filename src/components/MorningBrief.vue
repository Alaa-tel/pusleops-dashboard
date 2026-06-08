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
  padding: var(--spacing-xl);
  background: white;
  border-bottom: 1px solid var(--neutral-200);
}

.section-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0 0 var(--spacing-lg) 0;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

@media (max-width: 900px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .morning-brief {
    padding: var(--spacing-lg);
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style>
