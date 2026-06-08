<template>
  <div class="quick-actions">
    <button 
      v-for="(action, index) in actions" 
      :key="action.id"
      class="action-btn"
      :class="index === 0 ? 'btn-primary' : 'btn-secondary'"
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
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  align-items: center;
}

.action-btn {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid var(--neutral-300);
  border-radius: var(--radius-md);
  color: var(--neutral-700);
  font-weight: 600;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.action-btn.btn-primary {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  box-shadow: 0 1px 3px rgba(14, 165, 233, 0.3);
}

.action-btn.btn-primary:hover {
  background: var(--primary-dark);
  border-color: var(--primary-dark);
  box-shadow: 0 2px 6px rgba(14, 165, 233, 0.4);
  transform: translateY(-1px);
}

.action-btn.btn-secondary:hover {
  background: var(--neutral-50);
  border-color: var(--neutral-400);
  color: var(--neutral-800);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.action-btn.btn-secondary:active {
  background: var(--neutral-100);
}

.action-icon {
  font-size: 1.125rem;
}

.action-text {
  white-space: nowrap;
}

@media (max-width: 1200px) {
  .quick-actions {
    gap: var(--spacing-md);
  }

  .action-btn {
    padding: 0.45rem 0.875rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 900px) {
  .quick-actions {
    gap: var(--spacing-sm);
  }

  .action-btn {
    padding: 0.4rem 0.75rem;
    font-size: 0.75rem;
  }

  .action-icon {
    font-size: 1rem;
  }
}

@media (max-width: 640px) {
  .quick-actions {
    gap: var(--spacing-sm);
  }

  .action-btn {
    flex: 1;
    padding: 0.5rem 0.625rem;
  }
}
</style>
