<template>
  <button
    class="nav-item"
    :class="{ active }"
    @click="$emit('click')"
  >
    <component :is="item.icon" class="nav-icon" :size="20" />
    <span class="nav-label">{{ item.label }}</span>
  </button>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  item: {
    id: string
    label: string
    icon: Component
  }
  active: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  background: transparent;
  color: var(--neutral-600);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
}

.nav-item:hover {
  background-color: var(--neutral-100);
  color: var(--neutral-800);
}

.nav-item.active {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(6, 182, 212, 0.1));
  color: var(--primary-color);
  font-weight: 600;
  border-left: 3px solid var(--primary-color);
  padding-left: calc(var(--spacing-lg) - 3px);
}

.nav-icon {
  flex-shrink: 0;
  stroke-width: 2;
}

.nav-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1024px) {
  .nav-label {
    display: none;
  }

  .nav-item {
    justify-content: center;
    padding: var(--spacing-md);
  }
}
</style>
