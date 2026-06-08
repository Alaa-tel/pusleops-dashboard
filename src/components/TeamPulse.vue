<template>
  <div class="team-pulse card">
    <div class="tp-header">
      <h3 class="tp-title">Team Pulse</h3>
      <span class="tp-badge">Real-time</span>
    </div>

    <div class="team-metrics">
      <div class="team-metric">
        <div class="metric-label">
          <span class="metric-name">SLA Compliance</span>
          <span class="metric-unit">%</span>
        </div>
        <div class="metric-bar-container">
          <div class="metric-bar" style="width: 94%"></div>
        </div>
        <span class="metric-value">94%</span>
      </div>

      <div class="team-metric">
        <div class="metric-label">
          <span class="metric-name">Active Cases</span>
          <span class="metric-unit">count</span>
        </div>
        <div class="metric-bar-container">
          <div class="metric-bar" style="width: 72%"></div>
        </div>
        <span class="metric-value">18/25</span>
      </div>

      <div class="team-metric">
        <div class="metric-label">
          <span class="metric-name">Response Time</span>
          <span class="metric-unit">avg</span>
        </div>
        <div class="metric-bar-container">
          <div class="metric-bar" style="width: 65%"></div>
        </div>
        <span class="metric-value">4h 20m</span>
      </div>

      <div class="team-metric">
        <div class="metric-label">
          <span class="metric-name">Escalations</span>
          <span class="metric-unit">queue</span>
        </div>
        <div class="metric-bar-container">
          <div class="metric-bar critical" style="width: 32%"></div>
        </div>
        <span class="metric-value">8 pending</span>
      </div>
    </div>

    <div class="team-members">
      <h4 class="members-title">Team Members Online</h4>
      <div class="members-list">
        <div v-for="member in members" :key="member.id" class="member-item">
          <div class="member-avatar">
            <span>{{ member.initials }}</span>
            <span :class="['status-indicator', `status-${member.status}`]"></span>
          </div>
          <div class="member-info">
            <p class="member-name">{{ member.name }}</p>
            <p class="member-role">{{ member.role }}</p>
          </div>
          <span :class="['member-status-badge', `badge-${member.status}`]">
            {{ member.status === 'online' ? 'Online' : 'Away' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const members = [
  {
    id: 1,
    name: 'Sarah Chen',
    initials: 'SC',
    role: 'Case Manager',
    status: 'online'
  },
  {
    id: 2,
    name: 'James Wilson',
    initials: 'JW',
    role: 'Compliance',
    status: 'online'
  },
  {
    id: 3,
    name: 'Maria Garcia',
    initials: 'MG',
    role: 'Operations',
    status: 'away'
  },
  {
    id: 4,
    name: 'Alex Thompson',
    initials: 'AT',
    role: 'Escalation',
    status: 'online'
  },
];
</script>

<style scoped>
.team-pulse {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.tp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tp-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--neutral-900);
  margin: 0;
}

.tp-badge {
  font-size: 0.7rem;
  font-weight: 600;
  background-color: var(--success-light);
  color: var(--success-color);
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.team-metrics {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background-color: var(--neutral-50);
  border-radius: var(--radius-md);
}

.team-metric {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.metric-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.metric-name {
  font-weight: 600;
  color: var(--neutral-700);
}

.metric-unit {
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--neutral-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metric-bar-container {
  width: 100%;
  height: 5px;
  background-color: var(--neutral-200);
  border-radius: 3px;
  overflow: hidden;
}

.metric-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--info-color));
  border-radius: 3px;
  transition: width 0.5s ease;
}

.metric-bar.critical {
  background: linear-gradient(90deg, var(--warning-color), var(--danger-color));
}

.metric-value {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--neutral-700);
  text-align: right;
}

.team-members {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--neutral-200);
}

.members-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--neutral-600);
  margin: 0;
}

.members-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.member-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--spacing-md);
  align-items: center;
  padding: var(--spacing-sm);
  background-color: var(--neutral-50);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.member-item:hover {
  background-color: var(--neutral-100);
}

.member-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--info-color));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  position: relative;
  flex-shrink: 0;
}

.status-indicator {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: var(--neutral-300);
}

.status-indicator.status-online {
  background-color: var(--success-color);
}

.status-indicator.status-away {
  background-color: var(--warning-color);
}

.member-info {
  min-width: 0;
}

.member-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--neutral-900);
  margin: 0;
}

.member-role {
  font-size: 0.7rem;
  font-weight: 400;
  color: var(--neutral-500);
  margin: 0.15rem 0 0 0;
}

.member-status-badge {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.badge-online {
  background-color: var(--success-light);
  color: var(--success-color);
}

.badge-away {
  background-color: var(--warning-light);
  color: var(--warning-color);
}

@media (max-width: 640px) {
  .team-metrics {
    gap: var(--spacing-sm);
  }

  .member-item {
    grid-template-columns: auto 1fr;
    gap: var(--spacing-sm);
  }

  .member-status-badge {
    grid-column: 1 / -1;
    justify-self: start;
    margin-left: 48px;
  }
}
</style>
