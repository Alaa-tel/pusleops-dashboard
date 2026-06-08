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
  display: flex;
  gap: var(--spacing-md);
  padding: 0 var(--spacing-xl) var(--spacing-xl);
  background: white;
  border-bottom: 1px solid var(--neutral-200);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(6, 182, 212, 0.05));
  border: 1px solid rgba(14, 165, 233, 0.2);
  border-radius: var(--radius-md);
  color: var(--primary-color);
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(6, 182, 212, 0.15));
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.action-icon {
  font-size: 1.125rem;
}

.action-text {
  white-space: nowrap;
}

@media (max-width: 900px) {
  .quick-actions {
    padding: 0 var(--spacing-lg) var(--spacing-lg);
  }

  .action-btn {
    flex-direction: column;
    padding: var(--spacing-md);
    font-size: 0.75rem;
  }

  .action-text {
    display: none;
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
