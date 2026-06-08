<template>
  <div class="drawer-overlay" @click="closeDrawer">
    <div class="drawer" @click.stop>
      <div class="drawer-header">
        <h2 class="drawer-title">{{ caseData.clientName }}</h2>
        <button class="close-button" @click="closeDrawer">✕</button>
      </div>

      <div class="drawer-content">
        <!-- Header Info -->
        <section class="drawer-section">
          <h3 class="section-label">Case Information</h3>
          <div class="info-grid">
            <div class="info-row">
              <span class="info-label">Case ID:</span>
              <span class="info-value">{{ caseData.id }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Client ID:</span>
              <span class="info-value">{{ caseData.clientId }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Type:</span>
              <span class="info-value">{{ caseData.caseType }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Status:</span>
              <span class="info-value" :class="`status-${caseData.status.toLowerCase().replace(/\s+/g, '-')}`">
                {{ caseData.status }}
              </span>
            </div>
          </div>
        </section>

        <!-- Risk & Flags -->
        <section class="drawer-section">
          <h3 class="section-label">Risk & Flags</h3>
          <div class="badges-group">
            <span v-if="caseData.riskLevel === 'critical'" class="badge badge-danger">
              🚨 Critical Risk
            </span>
            <span v-else-if="caseData.riskLevel === 'high'" class="badge badge-warning">
              ⚠ High Risk
            </span>
            <span v-else-if="caseData.riskLevel === 'medium'" class="badge badge-info">
              ℹ Medium Risk
            </span>
            <span v-else class="badge badge-success">
              ✓ Low Risk
            </span>
            <span v-if="caseData.reopened" class="badge badge-warning">
              ↩ Reopened
            </span>
            <span v-if="caseData.highValue" class="badge badge-info">
              ⭐ High Value Client
            </span>
            <span v-if="caseData.complianceFlag" class="badge badge-danger">
              🔒 Compliance Flag
            </span>
          </div>
        </section>

        <!-- SLA & Timeline -->
        <section class="drawer-section">
          <h3 class="section-label">SLA & Timeline</h3>
          <div class="info-grid">
            <div class="info-row">
              <span class="info-label">SLA Hours:</span>
              <span class="info-value">{{ caseData.slaHours }}h</span>
            </div>
            <div class="info-row">
              <span class="info-label">Hours Remaining:</span>
              <span class="info-value" :class="getSLAClass(caseData.hoursRemaining)">
                {{ caseData.hoursRemaining }}h
              </span>
            </div>
            <div class="info-row">
              <span class="info-label">Last Activity:</span>
              <span class="info-value">{{ caseData.lastActivityTime }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Activity:</span>
              <span class="info-value">{{ caseData.lastActivity }}</span>
            </div>
          </div>
        </section>

        <!-- Recommended Action -->
        <section class="drawer-section">
          <h3 class="section-label">Recommended Action</h3>
          <div class="action-box">
            <p class="action-text">{{ caseData.recommendedAction }}</p>
            <div class="action-buttons">
              <button class="action-btn primary">{{ getActionButton() }}</button>
              <button class="action-btn secondary">Create Follow-up</button>
            </div>
          </div>
        </section>

        <!-- Notes -->
        <section class="drawer-section">
          <h3 class="section-label">Notes</h3>
          <p class="notes-text">{{ caseData.notes || 'No notes recorded.' }}</p>
        </section>

        <!-- Activity Timeline (simulated) -->
        <section class="drawer-section">
          <h3 class="section-label">Recent Activity</h3>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <p class="timeline-title">Case {{ caseData.status === 'New' ? 'created' : 'updated' }}</p>
                <p class="timeline-time">{{ caseData.lastActivityTime }}</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <p class="timeline-title">{{ caseData.lastActivity }}</p>
                <p class="timeline-time">{{ caseData.lastActivityTime }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="drawer-footer">
        <button class="close-btn">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Case } from '../types'

const props = defineProps<{
  caseData: Case
}>()

const emit = defineEmits<{
  close: []
}>()

const closeDrawer = () => {
  emit('close')
}

const getSLAClass = (hours: number): string => {
  if (hours < 4) return 'critical'
  if (hours < 12) return 'warning'
  return 'healthy'
}

const getActionButton = (): string => {
  const actionMap: Record<string, string> = {
    'Call client': 'Call Client Now',
    'Send follow-up email': 'Send Email',
    'Review document': 'Review Document',
    'Follow up with advisor': 'Contact Advisor',
    'Escalate': 'Escalate Now',
    'Close case': 'Close Case',
  }
  return actionMap[props.caseData.recommendedAction] || 'Take Action'
}
</script>

<style scoped>
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.drawer {
  width: 500px;
  max-width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.drawer-header {
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--neutral-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(6, 182, 212, 0.05));
}

.drawer-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--neutral-600);
  cursor: pointer;
  transition: all 0.2s ease;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
}

.close-button:hover {
  background-color: var(--neutral-100);
  color: var(--neutral-900);
}

.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.drawer-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.section-label {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--neutral-600);
  margin: 0;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

.info-row {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: var(--spacing-lg);
  align-items: center;
}

.info-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--neutral-600);
}

.info-value {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--neutral-800);
}

.info-value.critical {
  color: var(--danger-color);
  font-weight: 700;
}

.info-value.warning {
  color: var(--warning-color);
  font-weight: 700;
}

.info-value.healthy {
  color: var(--success-color);
  font-weight: 700;
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

.badges-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.action-box {
  background-color: var(--neutral-50);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--neutral-200);
}

.action-text {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0 0 var(--spacing-lg) 0;
}

.action-buttons {
  display: flex;
  gap: var(--spacing-md);
}

.action-btn {
  flex: 1;
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn.primary {
  background-color: var(--primary-color);
  color: white;
}

.action-btn.primary:hover {
  background-color: var(--primary-dark);
}

.action-btn.secondary {
  background-color: var(--neutral-200);
  color: var(--neutral-700);
}

.action-btn.secondary:hover {
  background-color: var(--neutral-300);
}

.notes-text {
  font-size: 0.9375rem;
  color: var(--neutral-700);
  line-height: 1.6;
  margin: 0;
  font-style: italic;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.timeline-item {
  display: flex;
  gap: var(--spacing-lg);
}

.timeline-marker {
  width: 12px;
  height: 12px;
  background-color: var(--primary-color);
  border-radius: 50%;
  margin-top: 3px;
  flex-shrink: 0;
}

.timeline-content {
  flex: 1;
}

.timeline-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--neutral-800);
  margin: 0;
}

.timeline-time {
  font-size: 0.75rem;
  color: var(--neutral-500);
  margin: 0.25rem 0 0 0;
}

.drawer-footer {
  padding: var(--spacing-lg) var(--spacing-xl);
  border-top: 1px solid var(--neutral-200);
  background-color: var(--neutral-50);
}

.close-btn {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--neutral-200);
  border: none;
  border-radius: var(--radius-md);
  color: var(--neutral-700);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: var(--neutral-300);
}

/* Scrollbar */
.drawer-content::-webkit-scrollbar {
  width: 6px;
}

.drawer-content::-webkit-scrollbar-track {
  background: transparent;
}

.drawer-content::-webkit-scrollbar-thumb {
  background: var(--neutral-300);
  border-radius: 3px;
}

.drawer-content::-webkit-scrollbar-thumb:hover {
  background: var(--neutral-400);
}

@media (max-width: 640px) {
  .drawer {
    width: 100%;
  }

  .drawer-header {
    padding: var(--spacing-lg);
  }

  .drawer-content {
    padding: var(--spacing-lg);
    gap: var(--spacing-lg);
  }

  .info-row {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }

  .info-label {
    font-weight: 700;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
