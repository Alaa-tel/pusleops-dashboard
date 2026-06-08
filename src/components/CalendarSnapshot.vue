<template>
  <div class="calendar-snapshot card">
    <div class="cal-header">
      <h3 class="cal-title">Today's Schedule</h3>
      <span class="cal-badge">4 events</span>
    </div>

    <div class="events-list">
      <div v-for="event in events" :key="event.id" class="event-item" :class="{ 'is-now': event.isNow }">
        <div class="event-time-indicator">
          <span v-if="event.isNow" class="now-dot"></span>
        </div>
        <div class="event-time">{{ event.time }}</div>
        <div class="event-details">
          <p class="event-title">{{ event.title }}</p>
          <p class="event-type">{{ event.type }}</p>
        </div>
        <div :class="['event-status', `status-${event.status}`]">
          {{ event.status === 'active' ? '● Live' : event.status === 'upcoming' ? '→ Next' : '✓ Done' }}
        </div>
      </div>
    </div>

    <div class="cal-footer">
      <button class="add-event-btn">+ Schedule Event</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const events = [
  {
    id: 1,
    time: '09:00 AM',
    title: 'Team Standup',
    type: 'Team Meeting',
    status: 'done',
    isNow: false
  },
  {
    id: 2,
    time: '10:30 AM',
    title: 'Client Call - TechCorp',
    type: 'Client Call',
    status: 'active',
    isNow: true
  },
  {
    id: 3,
    time: '12:00 PM',
    title: 'Compliance Review',
    type: 'Internal Review',
    status: 'upcoming',
    isNow: false
  },
  {
    id: 4,
    time: '02:30 PM',
    title: 'SLA Follow-up',
    type: 'Follow-up Call',
    status: 'upcoming',
    isNow: false
  },
];
</script>

<style scoped>
.calendar-snapshot {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.cal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cal-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0;
}

.cal-badge {
  font-size: 0.75rem;
  font-weight: 700;
  background-color: var(--info-light);
  color: var(--info-color);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.event-item {
  display: grid;
  grid-template-columns: auto 60px 1fr auto;
  gap: var(--spacing-md);
  align-items: center;
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--neutral-200);
  transition: all 0.2s ease;
  position: relative;
}

.event-item:hover {
  background-color: var(--neutral-50);
}

.event-item.is-now {
  background-color: rgba(14, 165, 233, 0.05);
  border-left-color: var(--primary-color);
}

.event-time-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: transparent;
  position: relative;
}

.now-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--primary-color);
  animation: pulse 2s infinite;
}

.event-time {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--neutral-600);
  white-space: nowrap;
}

.event-details {
  min-width: 0;
}

.event-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--neutral-900);
  margin: 0;
  line-height: 1.3;
}

.event-type {
  font-size: 0.75rem;
  color: var(--neutral-500);
  margin: 0.25rem 0 0 0;
}

.event-status {
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-done {
  background-color: var(--success-light);
  color: var(--success-color);
}

.status-active {
  background-color: var(--info-light);
  color: var(--info-color);
}

.status-upcoming {
  background-color: var(--neutral-100);
  color: var(--neutral-600);
}

.cal-footer {
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--neutral-200);
}

.add-event-btn {
  width: 100%;
  padding: 0.625rem 1rem;
  background-color: var(--neutral-100);
  border: 1px solid var(--neutral-300);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--neutral-700);
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-event-btn:hover {
  background-color: var(--neutral-200);
  border-color: var(--neutral-400);
}

@media (max-width: 640px) {
  .event-item {
    grid-template-columns: auto 1fr auto;
  }

  .event-time-indicator {
    display: none;
  }

  .event-time {
    grid-column: 1;
  }

  .event-details {
    grid-column: 2;
  }

  .event-status {
    grid-column: 3;
  }
}
</style>
