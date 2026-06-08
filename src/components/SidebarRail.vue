<template>
  <div class="sidebar-rail">
    <div class="rail-header">
      <div class="logo">
        <BarChart3 class="logo-icon" :size="28" />
        <span class="logo-text">PulseOps</span>
      </div>
    </div>

    <nav class="rail-nav">
      <NavItem 
        v-for="item in navItems" 
        :key="item.id"
        :item="item"
        :active="activeNav === item.id"
        @click="activeNav = item.id"
      />
    </nav>

    <div class="rail-footer">
      <div class="user-mini">
        <div class="user-avatar">JD</div>
        <div class="user-info">
          <p class="user-name">Jordan Davis</p>
          <p class="user-role">Specialist</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BarChart3, ClipboardList, Users, CheckCircle2, Mail, Briefcase, BookOpen, Settings } from 'lucide-vue-next'
import NavItem from './NavItem.vue'

const activeNav = ref('dashboard')

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'cases', label: 'Cases', icon: ClipboardList },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'tasks', label: 'Tasks', icon: CheckCircle2 },
  { id: 'communications', label: 'Communications', icon: Mail },
  { id: 'team', label: 'Team Insights', icon: Briefcase },
  { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
  { id: 'settings', label: 'Settings', icon: Settings },
]
</script>

<style scoped>
.sidebar-rail {
  width: 250px;
  height: 100vh;
  background: white;
  border-right: 1px solid var(--neutral-200);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: var(--shadow-sm);
}

.rail-header {
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--neutral-200);
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(6, 182, 212, 0.05));
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.logo-icon {
  color: var(--primary-color);
  flex-shrink: 0;
  stroke-width: 2;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--neutral-900);
}

.rail-nav {
  flex: 1;
  padding: var(--spacing-lg) var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.rail-footer {
  padding: var(--spacing-lg) var(--spacing-md);
  border-top: 1px solid var(--neutral-200);
  background: var(--neutral-50);
}

.user-mini {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.user-avatar {
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
  flex-shrink: 0;
}

.user-info {
  min-width: 0;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0;
}

.user-role {
  font-size: 0.75rem;
  color: var(--neutral-500);
  margin: 0.25rem 0 0 0;
}

@media (max-width: 1024px) {
  .sidebar-rail {
    width: 200px;
  }

  .logo-text {
    display: none;
  }

  .user-info {
    display: none;
  }
}

@media (max-width: 640px) {
  .sidebar-rail {
    display: none;
  }
}
</style>
