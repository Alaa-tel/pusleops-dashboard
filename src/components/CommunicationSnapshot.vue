<template>
  <div class="communication card">
    <div class="comm-header">
      <h2 class="section-title">Communication Snapshot</h2>
      <span class="unread-badge" v-if="unreadCount > 0">{{ unreadCount }}</span>
    </div>

    <div class="comm-list">
      <div
        v-for="comm in sampleCommunications"
        :key="comm.id"
        class="comm-item"
        :class="{ unread: comm.unread }"
      >
        <div class="comm-icon">
          <Mail v-if="comm.type === 'email'" :size="18" />
          <FileText v-else :size="18" />
        </div>
        <div class="comm-content">
          <p class="comm-from">{{ comm.from }}</p>
          <p class="comm-subject">{{ comm.subject }}</p>
        </div>
        <div class="comm-time">
          <span class="time-text">{{ comm.timestamp }}</span>
          <span v-if="comm.unread" class="unread-dot"></span>
        </div>
      </div>
    </div>

    <button class="view-all-btn">View All Messages</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Mail, FileText } from 'lucide-vue-next'
import { sampleCommunications } from '../data'

const unreadCount = computed(() => sampleCommunications.filter((c) => c.unread).length)
</script>

<style scoped>
.communication {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.comm-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--neutral-900);
  margin: 0;
}

.unread-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 0.4rem;
  background-color: var(--danger-color);
  color: white;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
}

.comm-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.comm-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  background-color: var(--neutral-50);
  transition: all 0.2s ease;
}

.comm-item:hover {
  background-color: var(--neutral-100);
}

.comm-item.unread {
  background-color: rgba(14, 165, 233, 0.05);
  border-left: 3px solid var(--primary-color);
  padding-left: calc(var(--spacing-sm) - 3px);
}

.comm-icon {
  font-size: 1.125rem;
  flex-shrink: 0;
}

.comm-content {
  flex: 1;
  min-width: 0;
}

.comm-from {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--neutral-900);
  margin: 0 0 0.15rem 0;
}

.comm-subject {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--neutral-600);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.comm-time {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-shrink: 0;
}

.time-text {
  font-size: 0.7rem;
  font-weight: 400;
  color: var(--neutral-500);
  font-weight: 500;
}

.unread-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--primary-color);
}

.view-all-btn {
  width: 100%;
  padding: 0.45rem 0.875rem;
  background-color: transparent;
  border: 1px solid var(--neutral-300);
  border-radius: var(--radius-md);
  color: var(--neutral-600);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: var(--spacing-xs);
}

.view-all-btn:hover {
  background-color: var(--neutral-50);
  border-color: var(--neutral-400);
  color: var(--neutral-700);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.view-all-btn:active {
  background-color: var(--neutral-100);
}

@media (max-width: 640px) {
  .comm-item {
    padding: var(--spacing-sm) var(--spacing-md);
  }

  .comm-subject {
    max-width: 150px;
  }
}
</style>
