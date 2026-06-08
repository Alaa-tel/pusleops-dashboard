<template>
  <header class="header">
    <div class="header-left">
      <div class="logo">
        <div class="logo-icon">📊</div>
        <h1 class="logo-text">PulseOps</h1>
      </div>
    </div>
    <div class="header-right">
      <div class="greeting">
        <p class="greeting-text">Good morning, Jordan</p>
        <p class="greeting-date">{{ formattedDate }}</p>
      </div>
      <div class="user-avatar">JD</div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const formattedDate = computed(() => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }
  return new Date().toLocaleDateString('en-US', options)
})
</script>

<style scoped>
.header {
  background: white;
  border-bottom: 1px solid var(--neutral-200);
  padding: var(--spacing-lg) var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-sm);
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.logo-icon {
  font-size: 1.75rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
}

.greeting {
  text-align: right;
}

.greeting-text {
  font-weight: 600;
  color: var(--neutral-800);
  margin: 0 0 0.25rem 0;
}

.greeting-date {
  font-size: 0.875rem;
  color: var(--neutral-500);
  margin: 0;
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
}

@media (max-width: 640px) {
  .header {
    padding: var(--spacing-md) var(--spacing-lg);
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .header-left {
    width: 100%;
  }

  .header-right {
    width: 100%;
    justify-content: space-between;
  }

  .logo-text {
    font-size: 1.25rem;
  }
}
</style>
