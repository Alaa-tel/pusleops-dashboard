<template>
  <div class="dashboard">
    <Header />
    <div class="dashboard-container">
      <div class="main-content">
        <MorningBrief />
        <div class="content-grid">
          <div class="left-column">
            <PriorityQueue @case-selected="handleCaseSelected" />
          </div>
          <div class="right-column">
            <RiskEscalationWatch />
            <TodaysWorkload />
            <CommunicationSnapshot />
          </div>
        </div>
      </div>
    </div>
    <CaseDetailDrawer v-if="selectedCase" :case-data="selectedCase" @close="selectedCase = null" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Case } from './types'
import Header from './components/Header.vue'
import MorningBrief from './components/MorningBrief.vue'
import PriorityQueue from './components/PriorityQueue.vue'
import RiskEscalationWatch from './components/RiskEscalationWatch.vue'
import TodaysWorkload from './components/TodaysWorkload.vue'
import CommunicationSnapshot from './components/CommunicationSnapshot.vue'
import CaseDetailDrawer from './components/CaseDetailDrawer.vue'

const selectedCase = ref<Case | null>(null)

const handleCaseSelected = (caseData: Case) => {
  selectedCase.value = caseData
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--neutral-50);
}

.dashboard-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.content-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: var(--spacing-xl);
  padding: var(--spacing-xl);
  max-width: 100%;
}

.left-column {
  display: flex;
  flex-direction: column;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

/* Scrollbar styling */
.main-content::-webkit-scrollbar {
  width: 8px;
}

.main-content::-webkit-scrollbar-track {
  background: transparent;
}

.main-content::-webkit-scrollbar-thumb {
  background: var(--neutral-300);
  border-radius: 4px;
}

.main-content::-webkit-scrollbar-thumb:hover {
  background: var(--neutral-400);
}

/* Responsive design */
@media (max-width: 1400px) {
  .content-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
    padding: var(--spacing-lg);
  }
}

@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .right-column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
  }
}

@media (max-width: 640px) {
  .content-grid {
    padding: var(--spacing-md);
  }

  .right-column {
    grid-template-columns: 1fr;
  }
}
</style>
