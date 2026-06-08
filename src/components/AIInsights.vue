<template>
  <div class="ai-insights card">
    <div class="insights-header">
      <h3 class="insights-title">🤖 PulseOps Assistant</h3>
      <button class="refresh-btn" @click="refreshInsights" :disabled="isLoading">↻</button>
    </div>

    <div v-if="isLoading" class="insights-loading">
      <div class="spinner"></div>
      <p>Analyzing your day...</p>
    </div>

    <div v-else class="insights-list">
      <div v-for="insight in insights" :key="insight.id" class="insight-item" :class="`priority-${insight.priority}`">
        <span class="insight-icon">{{ insight.icon }}</span>
        <div class="insight-content">
          <p class="insight-text">{{ insight.text }}</p>
          <button v-if="insight.action" class="insight-action" @click="handleInsightAction(insight.action)">
            {{ insight.action.label }} →
          </button>
        </div>
      </div>
    </div>

    <div class="insights-footer">
      <a href="#" class="view-all-link">View all insights →</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(false)

const insights = [
  {
    id: 1,
    priority: 'critical',
    icon: '⚠️',
    text: '3 cases may miss SLA today',
    action: { label: 'Review cases', id: 'review-sla' }
  },
  {
    id: 2,
    priority: 'high',
    icon: '📈',
    text: 'Response times increased by 8% this week',
    action: null
  },
  {
    id: 3,
    priority: 'medium',
    icon: '💬',
    text: 'Recommend contacting 2 waiting clients today',
    action: { label: 'Call now', id: 'call-waiting' }
  },
  {
    id: 4,
    priority: 'medium',
    icon: '⬆️',
    text: 'Escalation queue trending upward',
    action: null
  },
]

const refreshInsights = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
}

const handleInsightAction = (action: any) => {
  console.log('Insight action:', action.id)
}
</script>

<style scoped>
.ai-insights {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.insights-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.insights-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--neutral-900);
  margin: 0;
}

.refresh-btn {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0.6;
  padding: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.refresh-btn:hover:not(:disabled) {
  opacity: 1;
  transform: rotate(180deg);
}

.refresh-btn:disabled {
  cursor: not-allowed;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.insights-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) var(--spacing-md);
  text-align: center;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--neutral-200);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.insights-loading p {
  font-size: 0.8125rem;
  font-weight: 400;
  color: var(--neutral-600);
  margin: 0;
}

.insights-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.insight-item {
  padding: var(--spacing-md);
  background-color: var(--neutral-50);
  border-left: 3px solid;
  border-radius: var(--radius-md);
  display: flex;
  gap: var(--spacing-md);
  transition: all 0.2s ease;
}

.insight-item:hover {
  background-color: white;
}

.insight-item.priority-critical {
  border-color: var(--danger-color);
  background-color: rgba(239, 68, 68, 0.05);
}

.insight-item.priority-high {
  border-color: var(--warning-color);
  background-color: rgba(245, 158, 11, 0.05);
}

.insight-item.priority-medium {
  border-color: var(--info-color);
  background-color: rgba(59, 130, 246, 0.05);
}

.insight-icon {
  font-size: 1.375rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.insight-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.insight-text {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--neutral-800);
  margin: 0;
  line-height: 1.3;
}

.insight-action {
  align-self: flex-start;
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
  text-decoration: none;
  margin-top: 0.125rem;
}

.insight-action:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.insights-footer {
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--neutral-200);
  text-align: center;
}

.view-all-link {
  font-size: 0.8125rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-block;
}

.view-all-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

@media (max-width: 640px) {
  .ai-insights {
    gap: var(--spacing-md);
  }

  .insight-item {
    padding: var(--spacing-md);
  }
}
</style>
