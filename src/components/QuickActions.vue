<template>
  <div class="quick-actions">
    <button 
      v-for="action in actions" 
      :key="action.id"
      class="action-btn"
      @click="handleAction(action.id)"
    >
      <span class="action-icon">{{ action.icon }}</span>
      <span class="action-text">{{ action.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const actions = [
  { id: 'new-case', label: 'New Case', icon: '📝' },
  { id: 'call-client', label: 'Call Client', icon: '☎️' },
  { id: 'review-docs', label: 'Review Documents', icon: '📄' },
  { id: 'escalate', label: 'Escalate Case', icon: '⬆️' },
]

const handleAction = (actionId: string) => {
  console.log('Action clicked:', actionId)
  // Implement action handlers
}
</script>

<style scoped>
.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--spacing-lg);
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: white;
  border: 2px solid var(--neutral-200);
  border-radius: var(--radius-xl);
  color: var(--neutral-900);
  font-weight: 700;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:nth-child(1) {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.action-btn:nth-child(2) {
  border-color: var(--info-color);
  color: var(--info-color);
}

.action-btn:nth-child(3) {
  border-color: var(--success-color);
  color: var(--success-color);
}

.action-btn:nth-child(4) {
  border-color: var(--warning-color);
  color: var(--warning-color);
}

.action-btn:hover {
  border-width: 2px;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.action-btn:nth-child(1):hover {
  background-color: rgba(14, 165, 233, 0.05);
}

.action-btn:nth-child(2):hover {
  background-color: rgba(59, 130, 246, 0.05);
}

.action-btn:nth-child(3):hover {
  background-color: rgba(16, 185, 129, 0.05);
}

.action-btn:nth-child(4):hover {
  background-color: rgba(245, 158, 11, 0.05);
}

.action-icon {
  font-size: 1.75rem;
}

.action-text {
  white-space: nowrap;
  text-align: center;
}

@media (max-width: 900px) {
  .quick-actions {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
  }

  .action-btn {
    padding: var(--spacing-md);
  }
}

@media (max-width: 640px) {
  .quick-actions {
    gap: var(--spacing-sm);
  }

  .action-btn {
    padding: var(--spacing-sm);
  }
}
</style>
