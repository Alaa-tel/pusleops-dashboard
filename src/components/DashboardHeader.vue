<template>
  <div class="dashboard-header">
    <div class="header-left">
      <div class="greeting-section">
        <h1 class="greeting-title">
          Good morning, Jordan
        </h1>
        <p class="greeting-subtitle">
          You have <strong>8 active cases</strong> today. 
          <span class="highlight">3 cases</span> are approaching SLA limits and 
          <span class="highlight">2 callbacks</span> are due before noon.
        </p>
      </div>
    </div>

    <div class="header-right">
      <div class="search-wrapper">
        <input 
          type="text" 
          class="search-input" 
          placeholder="Search cases, clients..."
          @focus="searchActive = true"
          @blur="searchActive = false"
        />
        <Search class="search-icon" :size="20" />
      </div>

      <div class="header-actions">
        <button class="notification-btn" @click="showNotifications = !showNotifications">
          <Bell class="icon" :size="20" />
          <span v-if="notificationCount > 0" class="badge">{{ notificationCount }}</span>
        </button>
        <div class="user-menu">
          <button class="user-btn">
            <div class="avatar">JD</div>
          </button>
        </div>
      </div>
    </div>

    <!-- Notifications Panel -->
    <div v-if="showNotifications" class="notifications-panel">
      <div class="notifications-header">
        <h3>Notifications</h3>
        <button class="close-btn" @click="showNotifications = false"><X :size="20" /></button>
      </div>
      <div class="notifications-list">
        <div v-for="notif in notifications" :key="notif.id" class="notification-item" :class="`notif-${notif.type}`">
          <component :is="notif.icon" class="notif-icon" :size="18" />
          <div class="notif-content">
            <p class="notif-title">{{ notif.title }}</p>
            <p class="notif-time">{{ notif.time }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Bell, X, AlertCircle, Info, CheckCircle2, AlertTriangle } from 'lucide-vue-next'
import type { Component } from 'vue'

const showNotifications = ref(false)
const searchActive = ref(false)

interface Notification {
  id: number
  type: 'warning' | 'info' | 'success' | 'urgent'
  icon: Component
  title: string
  time: string
}

const notifications: Notification[] = [
  { id: 1, type: 'warning', icon: AlertCircle, title: 'CASE-001 approaching SLA limit', time: '5 min ago' },
  { id: 2, type: 'info', icon: Info, title: 'New client document uploaded', time: '12 min ago' },
  { id: 3, type: 'success', icon: CheckCircle2, title: 'Escalation #2156 resolved', time: '28 min ago' },
  { id: 4, type: 'urgent', icon: AlertTriangle, title: 'Case reassignment needed', time: '1 hour ago' },
  { id: 5, type: 'info', icon: Info, title: 'Team standup in 30 minutes', time: '1 hour ago' },
]

const notificationCount = computed(() => notifications.length)
</script>

<style scoped>
.dashboard-header {
  padding: var(--spacing-xl);
  background: white;
  border-bottom: 1px solid var(--neutral-200);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-xl);
  position: relative;
}

.header-left {
  flex: 1;
}

.greeting-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.greeting-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0;
  letter-spacing: -0.5px;
}

.greeting-subtitle {
  font-size: 0.9375rem;
  font-weight: 400;
  color: var(--neutral-600);
  margin: 0;
  line-height: 1.6;
}

.highlight {
  color: var(--primary-color);
  font-weight: 500;
}

.header-right {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.search-wrapper {
  position: relative;
  width: 280px;
}

.search-input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-md) var(--spacing-lg);
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  background-color: rgba(14, 165, 233, 0.02);
}

.search-icon {
  position: absolute;
  right: var(--spacing-lg);
  top: 50%;
  transform: translateY(-50%);
  color: var(--neutral-500);
  pointer-events: none;
  flex-shrink: 0;
}

.header-actions {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.notification-btn {
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.5rem;
  border-radius: var(--radius-md);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--neutral-600);
}

.notification-btn:hover {
  background-color: var(--neutral-100);
  color: var(--neutral-800);
}

.notification-btn .icon {
  flex-shrink: 0;
  stroke-width: 2;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--danger-color);
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 0.65rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

.user-menu {
  display: flex;
  gap: var(--spacing-md);
}

.user-btn {
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.user-btn:hover {
  transform: scale(1.05);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
}

/* Notifications Panel */
.notifications-panel {
  position: absolute;
  top: 100%;
  right: var(--spacing-xl);
  width: 360px;
  background: white;
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  margin-top: var(--spacing-md);
  z-index: 100;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.notifications-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--neutral-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notifications-header h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.125rem;
  color: var(--neutral-500);
  cursor: pointer;
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

.notifications-list {
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.notification-item {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--neutral-100);
  display: flex;
  gap: var(--spacing-md);
  cursor: pointer;
  transition: background 0.2s ease;
}

.notification-item:hover {
  background-color: var(--neutral-50);
}

.notif-icon {
  flex-shrink: 0;
  stroke-width: 2;
}

.notif-content {
  flex: 1;
}

.notif-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--neutral-900);
  margin: 0;
}

.notif-time {
  font-size: 0.75rem;
  color: var(--neutral-500);
  margin: 0.25rem 0 0 0;
}

.notif-warning {
  background-color: rgba(245, 158, 11, 0.05);
  border-left: 3px solid var(--warning-color);
}

.notif-urgent {
  background-color: rgba(239, 68, 68, 0.05);
  border-left: 3px solid var(--danger-color);
}

.notif-success {
  background-color: rgba(16, 185, 129, 0.05);
  border-left: 3px solid var(--success-color);
}

.notif-info {
  background-color: rgba(59, 130, 246, 0.05);
  border-left: 3px solid var(--info-color);
}

@media (max-width: 900px) {
  .dashboard-header {
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .greeting-title {
    font-size: 1.5rem;
  }

  .search-wrapper {
    width: 100%;
  }

  .notifications-panel {
    right: var(--spacing-lg);
    left: var(--spacing-lg);
    width: auto;
  }
}

@media (max-width: 640px) {
  .dashboard-header {
    padding: var(--spacing-lg);
  }

  .greeting-title {
    font-size: 1.25rem;
  }

  .search-wrapper {
    display: none;
  }

  .header-right {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
