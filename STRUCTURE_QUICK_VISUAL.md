# 📂 Project Structure - Visual Quick Reference

## 🔴 Current Structure (Problem)

```
src/
├── App.vue
├── main.ts
├── style.css
├── types.ts                    ← Types here
├── types-call.ts               ← MORE types (should consolidate)
├── data.ts                     ← Data here
├── data-calls.ts               ← MORE data (should consolidate)
│
└── components/                 ← FLAT STRUCTURE (PROBLEM!)
    ├── SidebarRail.vue         ← Layout
    ├── DashboardHeader.vue     ← Layout
    ├── MetricCard.vue          ← Shared UI
    ├── NavItem.vue             ← Shared UI
    ├── QuickActions.vue        ← Dashboard
    ├── MorningBrief.vue        ← Dashboard
    ├── PriorityQueue.vue       ← Dashboard
    ├── TodaysWorkload.vue      ← Dashboard
    ├── ActivityFeed.vue        ← Dashboard
    ├── CommunicationSnapshot.vue ← Dashboard
    ├── AIInsights.vue          ← Dashboard
    ├── CalendarSnapshot.vue    ← Dashboard
    ├── TeamPulse.vue           ← Dashboard
    ├── RiskEscalationWatch.vue ← Dashboard
    ├── CallWidget.vue          ← Modal
    ├── CaseDetailDrawer.vue    ← Modal
    ├── Header.vue              ← ❌ UNUSED
    ├── PriorityQueue_old.vue   ← ❌ OLD VERSION
    └── PriorityQueue_new.vue   ← ❌ OLD VERSION
```

**Issues:**
- ❌ 19 components in one flat folder
- ❌ Duplicate types files
- ❌ Duplicate data files
- ❌ No logical grouping
- ❌ Hard to navigate
- ❌ Unused/old files present

---

## 🟢 Proposed Structure (Solution)

```
src/
│
├── App.vue                    ← Root component
├── main.ts                    ← Entry
├── style.css                  ← Global styles
│
├── assets/                    ← Non-code files
│   └── icons/
│
├── types/                     ← ✅ Consolidated types
│   ├── index.ts               ← Re-export
│   ├── common.ts              ← Shared types (Case, Priority, Status)
│   └── api.ts                 ← API types
│
├── constants/                 ← Configuration
│   ├── index.ts
│   └── app.ts
│
├── utils/                     ← Utility functions
│   ├── index.ts
│   ├── formatters.ts
│   └── validators.ts
│
├── services/                  ← ✅ Consolidated data/API
│   ├── index.ts               ← Re-export
│   ├── api.ts                 ← API calls (from data-calls.ts)
│   └── dataService.ts         ← Data prep (from data.ts)
│
├── composables/               ← Vue composables (optional)
│   └── index.ts
│
└── components/                ← ✅ Organized components
    │
    ├── layout/                ← Layout components
    │   ├── SidebarRail.vue
    │   ├── DashboardHeader.vue
    │   └── index.ts
    │
    ├── shared/                ← Reusable components
    │   ├── MetricCard.vue
    │   ├── NavItem.vue
    │   └── index.ts
    │
    ├── dashboard/             ← Dashboard sections
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
    │
    └── modals/                ← Modal/floating widgets
        ├── CallWidget.vue
        ├── CaseDetailDrawer.vue
        └── index.ts
```

**Improvements:**
- ✅ Components organized into 4 logical groups
- ✅ Types consolidated into one folder
- ✅ Services/data consolidated into one folder
- ✅ Easy to navigate and find files
- ✅ Clean import structure
- ✅ Scalable for growth

---

## 📊 Component Organization

### By Category:

**Layout (2 components)**
```
layout/
├── SidebarRail.vue        ← Navigation sidebar
└── DashboardHeader.vue    ← Top header bar
```

**Shared UI (2 components)**
```
shared/
├── MetricCard.vue         ← Reusable KPI card
└── NavItem.vue            ← Reusable nav item
```

**Dashboard Sections (10 components)**
```
dashboard/
├── QuickActions.vue            ← Action buttons row
├── MorningBrief.vue            ← KPI cards section
├── PriorityQueue.vue           ← Main case queue
├── TodaysWorkload.vue          ← Workload metrics
├── ActivityFeed.vue            ← Activity log
├── CommunicationSnapshot.vue   ← Messages section
├── AIInsights.vue              ← AI recommendations
├── CalendarSnapshot.vue        ← Calendar/schedule
├── TeamPulse.vue               ← Team status
└── RiskEscalationWatch.vue     ← Risk monitoring
```

**Modals & Floating (2 components)**
```
modals/
├── CallWidget.vue        ← Floating call panel
└── CaseDetailDrawer.vue  ← Sliding detail panel
```

---

## 📝 Import Comparison

### Imports Get Cleaner:

#### Before (14 separate imports):
```typescript
import SidebarRail from './components/SidebarRail.vue'
import DashboardHeader from './components/DashboardHeader.vue'
import QuickActions from './components/QuickActions.vue'
import MorningBrief from './components/MorningBrief.vue'
import PriorityQueue from './components/PriorityQueue.vue'
import TodaysWorkload from './components/TodaysWorkload.vue'
import ActivityFeed from './components/ActivityFeed.vue'
import CommunicationSnapshot from './components/CommunicationSnapshot.vue'
import AIInsights from './components/AIInsights.vue'
import CalendarSnapshot from './components/CalendarSnapshot.vue'
import TeamPulse from './components/TeamPulse.vue'
import RiskEscalationWatch from './components/RiskEscalationWatch.vue'
import CaseDetailDrawer from './components/CaseDetailDrawer.vue'
import CallWidget from './components/CallWidget.vue'
```

#### After (4 grouped imports):
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
```

**Result:** Much cleaner and easier to understand at a glance!

---

## 🗑️ Cleanup

### Delete these files:
```bash
rm src/types.ts                  ← Moved to types/common.ts
rm src/types-call.ts             ← Moved to types/api.ts
rm src/data.ts                   ← Moved to services/dataService.ts
rm src/data-calls.ts             ← Moved to services/api.ts
rm src/components/Header.vue     ← Unused (not in App.vue)
rm src/components/PriorityQueue_old.vue  ← Old version
rm src/components/PriorityQueue_new.vue  ← Old version
```

---

## ✨ Benefits Summary

| Metric | Before | After |
|--------|--------|-------|
| **Component folders** | 1 flat folder | 4 organized folders |
| **Files per folder** | 19 files | 2-10 files (max) |
| **Time to find file** | ~30 seconds | ~5 seconds |
| **Import statement length** | Very long (14 lines) | Clean (4 lines) |
| **Scalability** | Breaks at 50+ files | Works at 100+ files |
| **Onboarding difficulty** | Hard (confusing) | Easy (self-documenting) |
| **Code clarity** | Low (what goes where?) | High (obvious) |
| **Maintenance burden** | High (where's this?) | Low (obvious location) |

---

## 🎯 How to Get Started

### Simplest Migration Path:

1. **Create new folder structure** (5 minutes)
   ```bash
   mkdir -p src/types src/services
   mkdir -p src/components/{layout,shared,dashboard,modals}
   ```

2. **Consolidate types** (2 minutes)
   - Move `types.ts` → `types/common.ts`
   - Move `types-call.ts` → `types/api.ts`
   - Create `types/index.ts`

3. **Consolidate services** (2 minutes)
   - Move `data.ts` → `services/dataService.ts`
   - Move `data-calls.ts` → `services/api.ts`
   - Create `services/index.ts`

4. **Organize components** (5 minutes)
   - Move 2 layout components to `layout/`
   - Move 2 shared components to `shared/`
   - Move 10 dashboard components to `dashboard/`
   - Move 2 modal components to `modals/`
   - Create `index.ts` in each folder

5. **Update imports** (10 minutes)
   - Update `App.vue` imports
   - Update any component-to-component imports
   - Test in dev server

**Total time: ~25 minutes** to complete reorganization!

---

## 🧪 Verification Checklist

After reorganization:

- [ ] All files moved to correct folders
- [ ] All `index.ts` files created
- [ ] App.vue imports updated
- [ ] Dev server starts (no errors)
- [ ] All components render
- [ ] Build succeeds
- [ ] No import errors in console
- [ ] Project feels more organized

---

**Ready to reorganize? See `PROJECT_STRUCTURE_GUIDE.md` for detailed instructions!**
