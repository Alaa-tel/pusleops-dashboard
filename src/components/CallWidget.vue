<template>
  <div class="call-widget">
    <!-- Floating Phone Button -->
    <button
      v-if="!showIncomingCall && !activeCall"
      class="phone-button"
      @click="toggleCallQueue"
      :class="{ active: showCallQueue }"
    >
      <span class="phone-icon">☎️</span>
      <span v-if="pendingCallsCount > 0" class="call-badge">{{ pendingCallsCount }}</span>
    </button>

    <!-- Call Queue Dropdown -->
    <div v-if="showCallQueue && !showIncomingCall && !activeCall" class="call-queue-dropdown">
      <div class="queue-header">
        <p class="queue-title">Incoming Calls</p>
        <button class="close-btn" @click="showCallQueue = false">✕</button>
      </div>
      <div class="queue-list">
        <div
          v-for="call in incomingCalls"
          :key="call.id"
          class="queue-item card-hover"
          @click="selectCall(call)"
        >
          <div class="item-header">
            <p class="caller-name">{{ call.callerName }}</p>
            <span v-if="hasRisk(call)" class="risk-indicator">⚠️</span>
          </div>
          <p class="caller-info">{{ call.phoneNumber }}</p>
          <p class="call-reason">{{ call.likelyReason }}</p>
          <p class="call-time">{{ getCallTime(call.timestamp) }}</p>
        </div>
        <div v-if="incomingCalls.length === 0" class="empty-state">
          <p>No incoming calls</p>
        </div>
      </div>
    </div>

    <!-- Incoming Call Card -->
    <div v-if="showIncomingCall && selectedCall && !activeCall" class="incoming-call-card">
      <div class="card-inner">
        <div class="call-header">
          <div class="caller-avatar">
            {{ selectedCall.callerName.split(' ').map((n) => n[0]).join('') }}
          </div>
          <div class="caller-info-section">
            <h3 class="caller-name">{{ selectedCall.callerName }}</h3>
            <p class="phone-number">{{ selectedCall.phoneNumber }}</p>
          </div>
        </div>

        <div class="call-details">
          <div class="detail-item">
            <span class="detail-label">Client ID:</span>
            <span class="detail-value">{{ selectedCall.clientId }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Likely Reason:</span>
            <span class="detail-value">{{ selectedCall.likelyReason }}</span>
          </div>
          <div v-if="selectedCall.relatedCaseId" class="detail-item">
            <span class="detail-label">Related Case:</span>
            <span class="detail-value">{{ selectedCall.relatedCaseId }}</span>
          </div>
          <div v-if="selectedCall.riskFlags.length > 0" class="detail-item">
            <span class="detail-label">Risk Flags:</span>
            <div class="risk-flags">
              <span v-for="flag in selectedCall.riskFlags" :key="flag" class="badge badge-warning">
                {{ flag }}
              </span>
            </div>
          </div>
        </div>

        <div class="call-actions">
          <button class="action-btn accept-btn" @click="acceptCall">
            <span class="btn-icon">✓</span>
            Accept Call
          </button>
          <button class="action-btn dismiss-btn" @click="dismissCall">
            <span class="btn-icon">✕</span>
            Dismiss
          </button>
          <button class="action-btn secondary-btn" @click="viewProfile">
            <span class="btn-icon">👤</span>
            View Profile
          </button>
          <button class="action-btn secondary-btn" @click="startCase">
            <span class="btn-icon">📋</span>
            Start Case
          </button>
        </div>
      </div>
    </div>

    <!-- Active Call Panel -->
    <div v-if="activeCall" class="active-call-panel">
      <div class="panel-header">
        <div class="call-timer" :class="{ warning: callDuration > 300, critical: callDuration > 600 }">
          {{ formatCallTimer(callDuration) }}
        </div>
        <button class="minimize-btn" @click="minimizeCall">_</button>
      </div>

      <div class="panel-content">
        <div class="active-caller-info">
          <div class="active-avatar">
            {{ activeCall.callerName.split(' ').map((n) => n[0]).join('') }}
          </div>
          <div class="active-info">
            <p class="active-name">{{ activeCall.callerName }}</p>
            <p class="active-number">{{ activeCall.phoneNumber }}</p>
          </div>
        </div>

        <div class="client-context">
          <h4 class="context-title">Client Context</h4>
          <div class="context-items">
            <div class="context-item">
              <span class="context-label">Client ID:</span>
              <span>{{ activeCall.clientId }}</span>
            </div>
            <div class="context-item">
              <span class="context-label">Call Reason:</span>
              <span>{{ activeCall.likelyReason }}</span>
            </div>
            <div v-if="activeCall.relatedCaseId" class="context-item">
              <span class="context-label">Related Case:</span>
              <span>{{ activeCall.relatedCaseId }}</span>
            </div>
          </div>
        </div>

        <div class="suggested-actions">
          <h4 class="actions-title">Suggested Next Actions</h4>
          <ul class="actions-list">
            <li>Verify client identity and account details</li>
            <li>Review related case history</li>
            <li>Document all commitments made</li>
            <li>Confirm follow-up timeline</li>
          </ul>
        </div>

        <div class="notes-section">
          <label class="notes-label">Quick Notes</label>
          <textarea
            v-model="activeCall.notes"
            class="notes-input"
            placeholder="Add call notes here..."
            rows="3"
          ></textarea>
        </div>
      </div>

      <div class="panel-footer">
        <button class="footer-btn secondary-btn" @click="createCase">
          <span class="btn-icon">📋</span>
          Create Case
        </button>
        <button class="footer-btn end-call-btn" @click="endCall">
          <span class="btn-icon">📞</span>
          End Call
        </button>
      </div>
    </div>

    <!-- Minimized Call Widget -->
    <div v-if="activeCall && isMinimized" class="minimized-call-widget">
      <div class="minimized-header">
        <div class="minimized-info">
          <p class="minimized-name">{{ activeCall.callerName }}</p>
          <span class="minimized-timer">{{ formatCallTimer(callDuration) }}</span>
        </div>
        <button class="expand-btn" @click="expandCall">▲</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { incomingCalls } from '../data-calls'
import type { IncomingCall, ActiveCall } from '../types-call'

const showCallQueue = ref(false)
const showIncomingCall = ref(false)
const activeCall = ref<ActiveCall | null>(null)
const isMinimized = ref(false)
const selectedCall = ref<IncomingCall | null>(null)
const callDuration = ref(0)
let callTimer: ReturnType<typeof setInterval> | null = null

const pendingCallsCount = computed(() => incomingCalls.length)

const hasRisk = (call: IncomingCall): boolean => {
  return call.riskFlags.length > 0
}

const getCallTime = (timestamp: Date): string => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const minutes = Math.floor(diff / 60000)

  if (minutes === 0) return 'Just now'
  if (minutes === 1) return '1 min ago'
  if (minutes < 60) return `${minutes} min ago`

  const hours = Math.floor(minutes / 60)
  if (hours === 1) return '1 hour ago'
  return `${hours} hours ago`
}

const formatCallTimer = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hrs > 0) {
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

const toggleCallQueue = () => {
  showCallQueue.value = !showCallQueue.value
}

const selectCall = (call: IncomingCall) => {
  selectedCall.value = call
  showCallQueue.value = false
  showIncomingCall.value = true
}

const acceptCall = () => {
  if (selectedCall.value) {
    activeCall.value = {
      ...selectedCall.value,
      callStartTime: new Date(),
      notes: '',
    }
    showIncomingCall.value = false
    isMinimized.value = false
    startCallTimer()
  }
}

const dismissCall = () => {
  showIncomingCall.value = false
  selectedCall.value = null
  showCallQueue.value = true
}

const viewProfile = () => {
  console.log('Viewing profile for:', selectedCall.value?.callerName)
  // In a real app, this would open a profile modal
}

const startCase = () => {
  console.log('Starting case for:', selectedCall.value?.callerName)
  // In a real app, this would open a new case form
}

const createCase = () => {
  console.log('Creating case from call:', activeCall.value?.callerName)
  // In a real app, this would open a new case form
}

const endCall = () => {
  if (callTimer) {
    clearInterval(callTimer)
  }
  activeCall.value = null
  callDuration.value = 0
  isMinimized.value = false
  showCallQueue.value = true
}

const minimizeCall = () => {
  isMinimized.value = true
}

const expandCall = () => {
  isMinimized.value = false
}

const startCallTimer = () => {
  if (callTimer) {
    clearInterval(callTimer)
  }
  callTimer = setInterval(() => {
    callDuration.value++
  }, 1000)
}

onMounted(() => {
  // Auto-show first incoming call after 2 seconds for demo purposes
  setTimeout(() => {
    if (incomingCalls.length > 0) {
      selectCall(incomingCalls[0])
    }
  }, 2000)
})

onUnmounted(() => {
  if (callTimer) {
    clearInterval(callTimer)
  }
})
</script>

<style scoped>
.call-widget {
  position: fixed;
  bottom: var(--spacing-xl);
  right: var(--spacing-xl);
  z-index: 999;
  font-family: inherit;
}

/* Phone Button */
.phone-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-button:hover {
  transform: scale(1.1);
  box-shadow: 0 15px 30px rgba(14, 165, 233, 0.4);
}

.phone-button.active {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
}

.phone-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.call-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--danger-color);
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
  }
}

/* Call Queue Dropdown */
.call-queue-dropdown {
  position: absolute;
  bottom: 80px;
  right: 0;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--neutral-200);
  width: 320px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.queue-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--neutral-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(6, 182, 212, 0.05));
}

.queue-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.close-btn {
  background: none;
  border: none;
  color: var(--neutral-500);
  cursor: pointer;
  font-size: 1.125rem;
  transition: all 0.2s ease;
  padding: 0.375rem;
  border-radius: var(--radius-md);
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: var(--neutral-700);
  background-color: var(--neutral-100);
}

.queue-list {
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
}

.queue-item {
  padding: var(--spacing-md);
  background-color: var(--neutral-50);
  border-radius: var(--radius-md);
  border: 1px solid var(--neutral-200);
  cursor: pointer;
  transition: all 0.2s ease;
}

.queue-item:hover {
  background-color: white;
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.caller-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0;
}

.risk-indicator {
  font-size: 1rem;
}

.caller-info {
  font-size: 0.75rem;
  color: var(--neutral-600);
  margin: 0.25rem 0;
  font-weight: 500;
}

.call-reason {
  font-size: 0.75rem;
  color: var(--neutral-700);
  margin: 0.5rem 0 0 0;
  line-height: 1.3;
}

.call-time {
  font-size: 0.7rem;
  color: var(--neutral-500);
  margin: 0.5rem 0 0 0;
  font-weight: 500;
}

.empty-state {
  padding: var(--spacing-lg);
  text-align: center;
}

.empty-state p {
  color: var(--neutral-500);
  margin: 0;
  font-size: 0.875rem;
}

/* Incoming Call Card */
.incoming-call-card {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 360px;
  max-width: 90vw;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--neutral-200);
  overflow: hidden;
  animation: slideUp 0.3s ease;
}

.card-inner {
  display: flex;
  flex-direction: column;
}

.call-header {
  padding: var(--spacing-lg);
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.caller-avatar {
  width: 56px;
  height: 56px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.125rem;
  flex-shrink: 0;
}

.caller-info-section {
  flex: 1;
}

.caller-info-section .caller-name {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
}

.phone-number {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.call-details {
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  border-bottom: 1px solid var(--neutral-200);
  background-color: var(--neutral-50);
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--neutral-600);
}

.detail-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--neutral-800);
}

.risk-flags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-top: 0.25rem;
}

.call-actions {
  padding: var(--spacing-lg);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.action-btn {
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  transition: all 0.2s ease;
}

.accept-btn {
  background-color: var(--success-color);
  color: white;
  grid-column: 1 / -1;
}

.accept-btn:hover {
  background-color: #059669;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.dismiss-btn {
  background-color: var(--danger-color);
  color: white;
}

.dismiss-btn:hover {
  background-color: #dc2626;
}

.secondary-btn {
  background-color: var(--neutral-100);
  color: var(--neutral-700);
  border: 1px solid var(--neutral-200);
}

.secondary-btn:hover {
  background-color: var(--neutral-200);
  border-color: var(--neutral-300);
}

.btn-icon {
  font-size: 1rem;
}

/* Active Call Panel */
.active-call-panel {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 380px;
  max-width: 90vw;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  border: 2px solid var(--primary-color);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 600px;
  animation: slideUp 0.3s ease;
}

.panel-header {
  padding: var(--spacing-lg);
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.call-timer {
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  transition: all 0.2s ease;
}

.call-timer.warning {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0.7;
  }
}

.minimize-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  transition: background 0.2s ease;
}

.minimize-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.active-caller-info {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--neutral-50);
  border-radius: var(--radius-md);
}

.active-avatar {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.active-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.active-name {
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0;
  font-size: 0.9375rem;
}

.active-number {
  font-size: 0.8125rem;
  color: var(--neutral-600);
  margin: 0.25rem 0 0 0;
}

.client-context,
.suggested-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.context-title,
.actions-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--neutral-600);
  margin: 0;
}

.context-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.context-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: var(--neutral-50);
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
}

.context-label {
  font-weight: 600;
  color: var(--neutral-600);
}

.actions-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.actions-list li {
  font-size: 0.8125rem;
  color: var(--neutral-700);
  padding: 0.5rem 0.75rem;
  background-color: var(--neutral-50);
  border-left: 3px solid var(--primary-color);
  border-radius: var(--radius-sm);
}

.notes-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.notes-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--neutral-600);
}

.notes-input {
  padding: var(--spacing-md);
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 0.8125rem;
  color: var(--neutral-800);
  resize: vertical;
  transition: all 0.2s ease;
}

.notes-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

.panel-footer {
  padding: var(--spacing-lg);
  border-top: 1px solid var(--neutral-200);
  display: flex;
  gap: var(--spacing-md);
  background-color: var(--neutral-50);
}

.footer-btn {
  flex: 1;
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  transition: all 0.2s ease;
}

.end-call-btn {
  background-color: var(--danger-color);
  color: white;
}

.end-call-btn:hover {
  background-color: #dc2626;
  transform: translateY(-2px);
}

/* Minimized Call Widget */
.minimized-call-widget {
  position: absolute;
  bottom: 80px;
  right: 0;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  border: 2px solid var(--primary-color);
  width: 280px;
  overflow: hidden;
}

.minimized-header {
  padding: var(--spacing-md) var(--spacing-lg);
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.minimized-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.minimized-name {
  font-size: 0.875rem;
  font-weight: 700;
  margin: 0;
}

.minimized-timer {
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  opacity: 0.9;
}

.expand-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  transition: background 0.2s ease;
}

.expand-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Scrollbar */
.queue-list::-webkit-scrollbar,
.panel-content::-webkit-scrollbar {
  width: 6px;
}

.queue-list::-webkit-scrollbar-track,
.panel-content::-webkit-scrollbar-track {
  background: transparent;
}

.queue-list::-webkit-scrollbar-thumb,
.panel-content::-webkit-scrollbar-thumb {
  background: var(--neutral-300);
  border-radius: 3px;
}

.queue-list::-webkit-scrollbar-thumb:hover,
.panel-content::-webkit-scrollbar-thumb:hover {
  background: var(--neutral-400);
}

@media (max-width: 640px) {
  .call-widget {
    bottom: var(--spacing-lg);
    right: var(--spacing-lg);
  }

  .phone-button {
    width: 56px;
    height: 56px;
    font-size: 1.25rem;
  }

  .incoming-call-card,
  .active-call-panel,
  .minimized-call-widget,
  .call-queue-dropdown {
    width: 100vw;
    max-width: 100vw;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    right: calc(-1 * var(--spacing-lg));
    max-height: 80vh;
  }

  .panel-content {
    gap: var(--spacing-md);
  }

  .call-actions {
    grid-template-columns: 1fr;
  }

  .accept-btn {
    grid-column: auto;
  }
}
</style>
