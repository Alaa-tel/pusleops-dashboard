<template>
  <div class="activity-feed card">
    <div class="feed-header">
      <h3 class="feed-title">Live Activity</h3>
      <span class="feed-badge">Latest 5</span>
    </div>

    <div class="activity-list">
      <div v-for="activity in activities" :key="activity.id" class="activity-item" :class="`type-${activity.type}`">
        <div class="activity-marker"></div>
        <div class="activity-content">
          <p class="activity-text">
            <span class="activity-actor">{{ activity.actor }}</span>
            <span class="activity-action">{{ activity.action }}</span>
          </p>
          <p class="activity-meta">{{ activity.meta }}</p>
          <p class="activity-time">{{ activity.time }}</p>
        </div>
      </div>
    </div>

    <div class="feed-footer">
      <a href="#" class="view-all-link">View all activity →</a>
    </div>
  </div>
</template>

<script setup lang="ts">
const activities = [
  {
    id: 1,
    type: 'update',
    actor: 'Daniel',
    action: 'updated',
    meta: 'Case #4821',
    time: '2 min ago'
  },
  {
    id: 2,
    type: 'created',
    actor: 'Client Portal',
    action: 'new grant request submitted',
    meta: '',
    time: '8 min ago'
  },
  {
    id: 3,
    type: 'completed',
    actor: 'System',
    action: 'compliance review completed',
    meta: 'Case #5203',
    time: '15 min ago'
  },
  {
    id: 4,
    type: 'escalated',
    actor: 'Sarah Chen',
    action: 'escalation assigned to',
    meta: 'Compliance Team',
    time: '28 min ago'
  },
  {
    id: 5,
    type: 'update',
    actor: 'Client',
    action: 'uploaded documents',
    meta: 'Case #3847',
    time: '1 hour ago'
  },
]
</script>

<style scoped>
.activity-feed {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.feed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.feed-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0;
}

.feed-badge {
  font-size: 0.7rem;
  font-weight: 700;
  background-color: var(--neutral-100);
  color: var(--neutral-600);
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
}

.activity-list::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 30px;
  bottom: 30px;
  width: 2px;
  background: linear-gradient(to bottom, var(--primary-color), transparent);
}

.activity-item {
  padding: var(--spacing-md);
  position: relative;
  display: flex;
  gap: var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.activity-item:hover {
  background-color: var(--neutral-50);
}

.activity-marker {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--primary-color);
  border: 3px solid white;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.type-update .activity-marker {
  background-color: var(--info-color);
}

.type-created .activity-marker {
  background-color: var(--success-color);
}

.type-completed .activity-marker {
  background-color: var(--success-color);
}

.type-escalated .activity-marker {
  background-color: var(--warning-color);
}

.activity-content {
  flex: 1;
  min-width: 0;
}

.activity-text {
  font-size: 0.8125rem;
  color: var(--neutral-800);
  margin: 0;
  line-height: 1.3;
}

.activity-actor {
  font-weight: 700;
  color: var(--neutral-900);
}

.activity-action {
  color: var(--neutral-700);
}

.activity-meta {
  font-size: 0.75rem;
  color: var(--primary-color);
  font-weight: 600;
  margin: 0.2rem 0 0 0;
}

.activity-time {
  font-size: 0.7rem;
  color: var(--neutral-500);
  margin: 0.3rem 0 0 0;
}

.feed-footer {
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
}

.view-all-link:hover {
  opacity: 0.8;
}

@media (max-width: 640px) {
  .activity-item {
    padding: var(--spacing-md);
  }

  .activity-list::before {
    display: none;
  }

  .activity-marker {
    display: none;
  }

  .activity-item {
    border-left: 3px solid var(--primary-color);
    padding-left: var(--spacing-md);
  }
}
</style>
