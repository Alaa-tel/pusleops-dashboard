# PulseOps — Daily Operations Dashboard

A modern, professional operational dashboard built with Vue 3 and TypeScript for financial services operations specialists. PulseOps provides a clear morning snapshot of what needs attention, which cases are at risk, and what actions to take next.

## 🎯 Project Overview

**PulseOps** is a command center for frontline operations specialists. It turns scattered operational data into a focused daily dashboard by answering:

1. What should I handle first?
2. Are any client cases becoming risky?
3. Do I have overdue follow-ups?
4. Is my workload manageable today?
5. Are there patterns my manager should know about?

## 📋 Features

### Main Dashboard Sections

1. **Header** - Product branding, date, and user greeting
2. **Morning Brief** - Key metrics showing cases assigned, urgent items, and response times
3. **Priority Queue** - Ranked case list with:
   - Client information and case type
   - Real-time SLA risk status
   - Last activity timestamp
   - Recommended next action
   - Filterable by status and sortable by priority, SLA risk, or activity

4. **Risk & Escalation Watch** - Side panel highlighting:
   - Critical SLA risks
   - Reopened cases
   - High-value client cases
   - Compliance flags
   - Stalled escalations

5. **Today's Workload** - Visual summary including:
   - Case breakdown by status (horizontal bars)
   - Total case count
   - Urgent case count
   - Cases ready to close

6. **Communication Snapshot** - Recent messages showing:
   - Unread email and note count
   - Client and internal communications
   - Related case associations
   - Quick access to messages

7. **Case Detail Drawer** - Deep-dive panel (clickable from Priority Queue) with:
   - Complete case information
   - Risk flags and compliance indicators
   - SLA timeline and activity history
   - Recommended actions with quick buttons
   - Notes and timeline

8. **Call Widget** - Floating phone interface for incoming calls:
   - Floating phone button in bottom-right corner with call count badge
   - Call queue showing pending incoming calls
   - Incoming call card with caller info, client context, and risk flags
   - Active call panel with call timer, notes field, and suggested actions
   - Minimize/expand functionality to work while on calls
   - Smooth transitions and visual hierarchy

## 🛠 Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-gen frontend build tool
- **CSS 3** - Modern styling with CSS variables

## 📦 Project Structure

```
src/
├── components/           # Vue components
│   ├── Header.vue       # Dashboard header with greeting
│   ├── MorningBrief.vue # Top metrics section
│   ├── MetricCard.vue   # Individual metric card
│   ├── PriorityQueue.vue # Main case queue
│   ├── RiskEscalationWatch.vue # Risk panel
│   ├── TodaysWorkload.vue      # Workload visuals
│   ├── CommunicationSnapshot.vue # Messages
│   ├── CaseDetailDrawer.vue    # Case detail slide-out
│   └── CallWidget.vue          # Incoming/active call interface
├── App.vue              # Root component
├── types.ts             # TypeScript interfaces
├── types-call.ts        # Call-related interfaces
├── data.ts              # Sample case data
├── data-calls.ts        # Sample call data
├── style.css            # Global styles
└── main.ts              # Entry point
```

## 🎨 Design System

### Colors
- **Primary**: `#0ea5e9` (Sky Blue)
- **Primary Dark**: `#0284c7` (Darker Blue)
- **Accent**: `#06b6d4` (Cyan)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Danger**: `#ef4444` (Red)
- **Neutral**: Soft gray palette

### Typography
- **Font Family**: System fonts (SF Pro Display, Segoe UI, etc.)
- **Headings**: Bold weights (700)
- **Body**: Regular (400-500)
- **Small text**: Uppercase with letter spacing

### Components
- **Cards**: White background, soft shadow, rounded corners (12px)
- **Buttons**: Soft rounded corners, hover states, clear hierarchy
- **Badges**: Inline labels for status, risk, and flags
- **Spacing**: Consistent 4px-based scale (8px, 16px, 24px, 32px, etc.)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

The app will open at `http://localhost:5173`

## 📊 Sample Data

The app includes realistic fake data for:
- **8 sample cases** with varying risk levels, statuses, and priority
- **4 sample communications** (emails and internal notes)
- **Morning brief metrics** with trend indicators
- **Workload breakdown** by case status

Data is defined in `src/data.ts` and can be easily connected to a real backend API.

## 🎯 User Interactions

### Priority Queue
- **Click a case row** → Opens detailed case drawer
- **Filter by status** → See only specific case types
- **Sort by** Priority, SLA Risk, or Last Activity
- **Visual indicators** → Color-coded SLA status and risk badges

### Case Detail Drawer
- **View complete case information**
- **See all flags and risk indicators**
- **Take recommended action** with quick buttons
- **Review activity timeline**
- **Close drawer** with X button or overlay click

### Call Widget
- **Floating phone button** - Shows pending call count with pulsing badge
- **Call queue dropdown** - Browse incoming calls with risk indicators
- **Incoming call card** - Full caller details and quick actions
- **Accept call** - Transitions to active call panel
- **Active call panel** - Call timer, client context, notes field, suggested actions
- **Minimize/expand** - Collapse call widget to work on dashboard while on call
- **End call** - Close call and return to queue

### Responsive Design
- **Desktop**: Full layout with side-by-side panels
- **Tablet**: 2-column layout with stacked sections
- **Mobile**: Single column, collapsible sections

## 🔄 State Management

The app uses Vue's `ref` and `computed` for state management:
- **selectedCase**: Currently viewed case detail
- **filterStatus**: Priority queue filter
- **sortBy**: Priority queue sort method

For larger applications, consider Pinia or Vuex.

## 🎬 Next Steps

To extend this dashboard:

1. **Connect to Backend**
   - Replace `data.ts` with API calls
   - Use `fetch()` or axios in component setup

2. **Add Real-time Updates**
   - WebSocket for case status changes
   - Polling for new communications

3. **Enhance Call Widget** ✅ *Already Implemented*
   - ✓ Floating phone button with call count
   - ✓ Incoming call notifications and queue
   - ✓ Call timer and notes field
   - **Future enhancements**:
   - Call recording indicator
   - Transfer/conference options
   - Voicemail management
   - Call history and analytics
   - Profile auto-pop screen
   - See `CALL_WIDGET_DOCS.md` for details

4. **Add Team Pulse Section**
   - Team-wide metrics
   - Manager dashboard view
   - SLA performance tracking

5. **Mobile Optimization**
   - Bottom navigation
   - Touch-friendly interactions
   - Simplified layouts

## 📝 Notes

- All data is currently mock/sample data in `src/data.ts` and `src/data-calls.ts`
- No backend or database is required to run the app
- Styling is responsive and mobile-friendly
- The drawer overlay blocks background interaction while open
- Call widget floats above all content (z-index: 999)
- Smooth animations for all transitions
- See `CALL_WIDGET_DOCS.md` for complete call widget documentation

## 📄 License

This project is part of the P301 Capstone project case study.

---

**Built with ❤️ for operations excellence**
