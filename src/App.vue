<template>
  <div class="dashboard">
    <div class="dashboard-layout">
      <!-- Left Sidebar -->
      <SidebarRail />

      <!-- Main Content -->
      <div class="main-section">
        <!-- Header -->
        <DashboardHeader />

        <!-- Scrollable Content Area -->
        <div class="content-area">
          <!-- Quick Actions -->
          <QuickActions />

          <!-- Morning Brief (KPI Cards with Trends) -->
          <MorningBrief />

          <!-- Priority Queue (Main Focus) -->
          <PriorityQueue @case-selected="handleCaseSelected" />

          <!-- Second Row: Workload, Activity, Communication -->
          <div class="dashboard-row">
            <TodaysWorkload />
            <ActivityFeed />
            <CommunicationSnapshot />
          </div>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="right-panel">
        <div class="right-panel-content">
          <!-- AI Insights -->
          <AIInsights />

          <!-- Calendar Snapshot -->
          <CalendarSnapshot />

          <!-- Team Pulse -->
          <TeamPulse />

          <!-- Risk Escalation Watch -->
          <RiskEscalationWatch />
        </div>
      </div>
    </div>

    <!-- Modals & Floating Widgets -->
    <CaseDetailDrawer v-if="selectedCase" :case-data="selectedCase" @close="selectedCase = null" />
    <CallWidget />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Case } from './types'

// Layout Components
import SidebarRail from './components/SidebarRail.vue'
import DashboardHeader from './components/DashboardHeader.vue'
import QuickActions from './components/QuickActions.vue'

// Content Components
import MorningBrief from './components/MorningBrief.vue'
import PriorityQueue from './components/PriorityQueue.vue'

// Right Panel Components
import AIInsights from './components/AIInsights.vue'
import ActivityFeed from './components/ActivityFeed.vue'
import CalendarSnapshot from './components/CalendarSnapshot.vue'
import TeamPulse from './components/TeamPulse.vue'
import RiskEscalationWatch from './components/RiskEscalationWatch.vue'
import TodaysWorkload from './components/TodaysWorkload.vue'
import CommunicationSnapshot from './components/CommunicationSnapshot.vue'

// Modal & Floating Components
import CaseDetailDrawer from './components/CaseDetailDrawer.vue'
import CallWidget from './components/CallWidget.vue'

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
  position: relative;
}

.dashboard-layout {
  display: grid;
  grid-template-columns: 250px 1fr 350px;
  grid-template-rows: 1fr;
  gap: 0;
  flex: 1;
  overflow: hidden;
  height: 100%;
}

/* Main Section (Center) */
.main-section {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: var(--neutral-50);
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  overflow-y: auto;
  padding: var(--spacing-lg);
  padding-right: var(--spacing-md);
}

.dashboard-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

/* Right Panel */
.right-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: var(--neutral-50);
  border-left: 1px solid var(--neutral-200);
}

.right-panel-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  overflow-y: auto;
  padding: var(--spacing-lg);
  padding-right: var(--spacing-md);
}

/* Scrollbar styling for all scrollable areas */
.content-area::-webkit-scrollbar,
.right-panel-content::-webkit-scrollbar {
  width: 8px;
}

.content-area::-webkit-scrollbar-track,
.right-panel-content::-webkit-scrollbar-track {
  background: transparent;
}

.content-area::-webkit-scrollbar-thumb,
.right-panel-content::-webkit-scrollbar-thumb {
  background: var(--neutral-300);
  border-radius: 4px;
}

.content-area::-webkit-scrollbar-thumb:hover,
.right-panel-content::-webkit-scrollbar-thumb:hover {
  background: var(--neutral-400);
}

/* Tablet Responsive */
@media (max-width: 1024px) {
  .dashboard-layout {
    grid-template-columns: 70px 1fr 300px;
  }

  .right-panel-content {
    padding: var(--spacing-md);
    gap: var(--spacing-md);
  }

  .content-area {
    padding: var(--spacing-lg);
    gap: var(--spacing-lg);
  }

  .dashboard-row {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-lg);
  }
}

/* Mobile Responsive */
@media (max-width: 640px) {
  .dashboard-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr auto;
  }

  .main-section {
    grid-column: 1;
    grid-row: 1 / 4;
    min-height: auto;
  }

  .right-panel {
    display: none;
  }

  .content-area {
    padding: var(--spacing-lg);
    gap: var(--spacing-lg);
  }

  .dashboard-row {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
}
</style>
