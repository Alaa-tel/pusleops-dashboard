# 📋 Project Reorganization - File Mapping Reference

## Current Files → New Locations

### Root Level Files (src/)

| Current File | New Location | Action | Notes |
|---|---|---|---|
| `App.vue` | `App.vue` | No change | Root component stays |
| `main.ts` | `main.ts` | No change | Entry point stays |
| `style.css` | `style.css` | No change | Global styles stay |
| `types.ts` | `types/common.ts` | Move & rename | Consolidate types |
| `types-call.ts` | `types/api.ts` | Move & rename | Consolidate types |
| `data.ts` | `services/dataService.ts` | Move & rename | Data preparation logic |
| `data-calls.ts` | `services/api.ts` | Move & rename | API call functions |

### New Root-Level Files to Create

| File | Purpose | Priority |
|---|---|---|
| `types/index.ts` | Re-export all types | High |
| `services/index.ts` | Re-export all services | High |
| `constants/app.ts` | App constants (optional) | Low |
| `utils/formatters.ts` | Format functions (optional) | Low |
| `utils/validators.ts` | Validation functions (optional) | Low |

---

## Component Reorganization Map

### Current (Flat) → New (Organized)

#### **Layout Components** (2 files)
```
Before:                        After:
components/SidebarRail.vue  →  components/layout/SidebarRail.vue
components/DashboardHeader.vue → components/layout/DashboardHeader.vue
```

#### **Shared UI Components** (2 files)
```
Before:                      After:
components/MetricCard.vue  → components/shared/MetricCard.vue
components/NavItem.vue     → components/shared/NavItem.vue
```

#### **Dashboard Section Components** (10 files)
```
Before:                              After:
components/QuickActions.vue        → components/dashboard/QuickActions.vue
components/MorningBrief.vue        → components/dashboard/MorningBrief.vue
components/PriorityQueue.vue       → components/dashboard/PriorityQueue.vue
components/TodaysWorkload.vue      → components/dashboard/TodaysWorkload.vue
components/ActivityFeed.vue        → components/dashboard/ActivityFeed.vue
components/CommunicationSnapshot.vue → components/dashboard/CommunicationSnapshot.vue
components/AIInsights.vue          → components/dashboard/AIInsights.vue
components/CalendarSnapshot.vue    → components/dashboard/CalendarSnapshot.vue
components/TeamPulse.vue           → components/dashboard/TeamPulse.vue
components/RiskEscalationWatch.vue → components/dashboard/RiskEscalationWatch.vue
```

#### **Modal/Floating Components** (2 files)
```
Before:                         After:
components/CallWidget.vue      → components/modals/CallWidget.vue
components/CaseDetailDrawer.vue → components/modals/CaseDetailDrawer.vue
```

#### **To Delete** (3 files)
```
❌ components/Header.vue              - Unused (not imported in App.vue)
❌ components/PriorityQueue_old.vue   - Old version
❌ components/PriorityQueue_new.vue   - Old version
```

---

## New Index Files to Create

### `src/types/index.ts`
```typescript
// Re-export all types from submodules
export * from './common'   // Cases, Priorities, Statuses
export * from './api'      // API requests/responses
```

### `src/services/index.ts`
```typescript
// Re-export services
export * as api from './api'
export * as dataService from './dataService'
```

### `src/components/layout/index.ts`
```typescript
export { default as SidebarRail } from './SidebarRail.vue'
export { default as DashboardHeader } from './DashboardHeader.vue'
```

### `src/components/shared/index.ts`
```typescript
export { default as MetricCard } from './MetricCard.vue'
export { default as NavItem } from './NavItem.vue'
```

### `src/components/dashboard/index.ts`
```typescript
export { default as QuickActions } from './QuickActions.vue'
export { default as MorningBrief } from './MorningBrief.vue'
export { default as PriorityQueue } from './PriorityQueue.vue'
export { default as TodaysWorkload } from './TodaysWorkload.vue'
export { default as ActivityFeed } from './ActivityFeed.vue'
export { default as CommunicationSnapshot } from './CommunicationSnapshot.vue'
export { default as AIInsights } from './AIInsights.vue'
export { default as CalendarSnapshot } from './CalendarSnapshot.vue'
export { default as TeamPulse } from './TeamPulse.vue'
export { default as RiskEscalationWatch } from './RiskEscalationWatch.vue'
```

### `src/components/modals/index.ts`
```typescript
export { default as CallWidget } from './CallWidget.vue'
export { default as CaseDetailDrawer } from './CaseDetailDrawer.vue'
```

---

## Import Statement Changes

### Component Imports in App.vue

#### BEFORE (14 separate imports):
```typescript
import SidebarRail from './components/SidebarRail.vue'
import DashboardHeader from './components/DashboardHeader.vue'
import QuickActions from './components/QuickActions.vue'
import MorningBrief from './components/MorningBrief.vue'
import PriorityQueue from './components/PriorityQueue.vue'
import AIInsights from './components/AIInsights.vue'
import ActivityFeed from './components/ActivityFeed.vue'
import CalendarSnapshot from './components/CalendarSnapshot.vue'
import TeamPulse from './components/TeamPulse.vue'
import RiskEscalationWatch from './components/RiskEscalationWatch.vue'
import TodaysWorkload from './components/TodaysWorkload.vue'
import CommunicationSnapshot from './components/CommunicationSnapshot.vue'
import CaseDetailDrawer from './components/CaseDetailDrawer.vue'
import CallWidget from './components/CallWidget.vue'
import type { Case } from './types'
```

#### AFTER (4 grouped imports):
```typescript
import { SidebarRail, DashboardHeader } from './components/layout'
import {
  QuickActions,
  MorningBrief,
  PriorityQueue,
  TodaysWorkload,
  ActivityFeed,
  CommunicationSnapshot,
  AIInsights,
  CalendarSnapshot,
  TeamPulse,
  RiskEscalationWatch,
} from './components/dashboard'
import { CallWidget, CaseDetailDrawer } from './components/modals'
import type { Case } from './types'
```

### Type Imports in Components

#### BEFORE:
```typescript
import type { Case, Priority, Status } from '../types'
import type { CallData } from '../types-call'
```

#### AFTER:
```typescript
import type { Case, Priority, Status, CallData } from '../types'
```

### Service Imports

#### BEFORE:
```typescript
import { fetchCases } from '../data-calls'
import { formatCaseData } from '../data'
```

#### AFTER:
```typescript
import { api, dataService } from '../services'

// Usage:
api.fetchCases()
dataService.formatCaseData(raw)
```

---

## Folder Structure Visualization

### Current (19 items, flat):
```
components/
├── ActivityFeed.vue
├── AIInsights.vue
├── CalendarSnapshot.vue
├── CallWidget.vue
├── CaseDetailDrawer.vue
├── CommunicationSnapshot.vue
├── DashboardHeader.vue
├── Header.vue ← unused
├── MetricCard.vue
├── MorningBrief.vue
├── NavItem.vue
├── PriorityQueue.vue
├── PriorityQueue_new.vue ← old
├── PriorityQueue_old.vue ← old
├── QuickActions.vue
├── RiskEscalationWatch.vue
├── SidebarRail.vue
├── TeamPulse.vue
└── TodaysWorkload.vue
```

### Proposed (organized):
```
components/
├── layout/                    ← Navigation & layout
│   ├── SidebarRail.vue
│   ├── DashboardHeader.vue
│   └── index.ts
├── shared/                    ← Reusable UI components
│   ├── MetricCard.vue
│   ├── NavItem.vue
│   └── index.ts
├── dashboard/                 ← Dashboard sections
│   ├── QuickActions.vue
│   ├── MorningBrief.vue
│   ├── PriorityQueue.vue
│   ├── TodaysWorkload.vue
│   ├── ActivityFeed.vue
│   ├── CommunicationSnapshot.vue
│   ├── AIInsights.vue
│   ├── CalendarSnapshot.vue
│   ├── TeamPulse.vue
│   ├── RiskEscalationWatch.vue
│   └── index.ts
└── modals/                    ← Floating widgets
    ├── CallWidget.vue
    ├── CaseDetailDrawer.vue
    └── index.ts
```

---

## File Count by Category

### Current Distribution:
```
Layout:        2 (SidebarRail, DashboardHeader)
Shared:        2 (MetricCard, NavItem)
Dashboard:    10 (QuickActions, MorningBrief, PriorityQueue, etc.)
Modals:        2 (CallWidget, CaseDetailDrawer)
Other:         1 (Header - unused)
Old/Unused:    2 (PriorityQueue_old, PriorityQueue_new)
────────────────────
Total:        19 files (in one folder - problem!)
```

### Proposed Distribution:
```
layout/        2 (organized)
shared/        2 (organized)
dashboard/    10 (organized)
modals/        2 (organized)
────────────────────
Total:        16 files (organized, old versions removed)
```

---

## Step-by-Step Migration Checklist

### Phase 1: Setup (5 min)
- [ ] Create folder structure
- [ ] Create all new folders

### Phase 2: Consolidate Types (2 min)
- [ ] Copy `types.ts` → `types/common.ts`
- [ ] Copy `types-call.ts` → `types/api.ts`
- [ ] Create `types/index.ts`
- [ ] Delete old `types.ts` and `types-call.ts`

### Phase 3: Consolidate Services (2 min)
- [ ] Copy `data.ts` → `services/dataService.ts`
- [ ] Copy `data-calls.ts` → `services/api.ts`
- [ ] Create `services/index.ts`
- [ ] Delete old `data.ts` and `data-calls.ts`

### Phase 4: Reorganize Components (5 min)
- [ ] Move layout components
- [ ] Move shared components
- [ ] Move dashboard components
- [ ] Move modal components
- [ ] Delete unused files (Header.vue, old versions)
- [ ] Create all `index.ts` files

### Phase 5: Update Imports (10 min)
- [ ] Update `App.vue` imports
- [ ] Update any component-to-component imports
- [ ] Update type imports in all files
- [ ] Update service imports in all files

### Phase 6: Verify (5 min)
- [ ] Start dev server
- [ ] Check console for errors
- [ ] Verify all components render
- [ ] Build for production
- [ ] Verify build succeeds

**Total Time: ~30 minutes**

---

## Command Reference

### Create Folders:
```bash
mkdir -p src/types src/services
mkdir -p src/components/{layout,shared,dashboard,modals}
mkdir -p src/constants src/utils src/composables
```

### Move Files:
```bash
# Types
mv src/types.ts src/types/common.ts
mv src/types-call.ts src/types/api.ts

# Services
mv src/data.ts src/services/dataService.ts
mv src/data-calls.ts src/services/api.ts

# Components - Layout
mv src/components/SidebarRail.vue src/components/layout/
mv src/components/DashboardHeader.vue src/components/layout/

# Components - Shared
mv src/components/MetricCard.vue src/components/shared/
mv src/components/NavItem.vue src/components/shared/

# Components - Dashboard
mv src/components/QuickActions.vue src/components/dashboard/
mv src/components/MorningBrief.vue src/components/dashboard/
mv src/components/PriorityQueue.vue src/components/dashboard/
mv src/components/TodaysWorkload.vue src/components/dashboard/
mv src/components/ActivityFeed.vue src/components/dashboard/
mv src/components/CommunicationSnapshot.vue src/components/dashboard/
mv src/components/AIInsights.vue src/components/dashboard/
mv src/components/CalendarSnapshot.vue src/components/dashboard/
mv src/components/TeamPulse.vue src/components/dashboard/
mv src/components/RiskEscalationWatch.vue src/components/dashboard/

# Components - Modals
mv src/components/CallWidget.vue src/components/modals/
mv src/components/CaseDetailDrawer.vue src/components/modals/
```

### Delete Old/Unused:
```bash
rm src/components/Header.vue
rm src/components/PriorityQueue_old.vue
rm src/components/PriorityQueue_new.vue
```

---

## Why This Structure Works

1. **Logical Grouping** - Components grouped by function
2. **Easy Discovery** - Open `dashboard/` to see all dashboard sections
3. **Clean Imports** - Import from folders, not individual files
4. **Scalability** - Grows to 50+ components without chaos
5. **Maintainability** - New team members understand structure instantly
6. **No Duplication** - Types/services consolidated
7. **Future-Proof** - Easy to add new categories as needed

---

**See `PROJECT_STRUCTURE_GUIDE.md` for detailed implementation instructions!**
