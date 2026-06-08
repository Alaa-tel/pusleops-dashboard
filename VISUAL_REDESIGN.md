# PulseOps Visual Redesign

## Goal

Refine the dashboard to feel like a modern enterprise SaaS product.

Reference image:
docs/reference/pulseops-target-ui.png

The current dashboard is functional but feels dense, table-heavy, and visually generic.

The redesign should improve hierarchy, reduce scrolling, increase scannability, and create a more polished product experience.

---

## Key Improvements

### Reduce Vertical Scrolling

The dashboard currently places too much emphasis on the Priority Queue.

Only display 5-6 priority cases initially.

Add:

* View All Cases link
* Pagination
* Expand option

The goal is to surface the most important work rather than every item.

---

### Convert Quick Actions Into Primary Buttons

Current actions should become visually prominent buttons.

Actions:

* New Case
* Call Client
* Review Documents
* Escalate Case

Place directly below the greeting.

Use icon + label buttons.

---

### Add Lower Dashboard Sections

Instead of one large table occupying the entire page:

Create a second row containing:

* Today's Workload
* Recent Activity
* Communication Snapshot

This reduces the perceived length of the page.

---

### Improve Typography

The current font feels generic.

Use:

* Inter
* Plus Jakarta Sans
* Manrope

Preferred:
Inter

Hierarchy:

Page Title:
32px

Section Headers:
20px

Card Titles:
14px

Body:
14px

Metadata:
12px

Use stronger font weights and spacing.

---

### Improve KPI Cards

Current KPI cards feel flat.

Add:

* Trend percentages
* Mini sparkline charts
* Better spacing
* Stronger number emphasis

Examples:

24 Open Cases
↓ 12% vs yesterday

2.4h Avg Response
↑ 8% vs last week

---

### Simplify Priority Queue

Replace the current card-list style.

Use a compact data table.

Columns:

* Client
* Type
* Status
* SLA Risk
* Last Activity
* Next Action

Use colored status pills.

Make rows cleaner and shorter.

---

### Improve Right Sidebar

Current sidebar should feel like a dashboard assistant.

Structure:

1. AI Insights
2. Schedule
3. Team Pulse
4. Risk Watch

Each widget should have a clear visual purpose.

---

### Increase White Space

Add more breathing room.

Increase:

* Card padding
* Section spacing
* Gaps between widgets

Avoid crowded layouts.

---

### Modern Enterprise Styling

Visual inspiration:

* Linear
* Stripe Dashboard
* Notion
* Ramp
* Mercury
* Asana

Characteristics:

* Large border radius
* Soft shadows
* Thin borders
* Clean spacing
* Minimal gradients
* Professional appearance

---

### Call Widget

The floating call widget should remain visible.

When active:

* Float above content
* Show caller details
* Show actions
* Match overall design language

The call widget should feel like a core feature.

---

## Success Criteria

The redesigned dashboard should feel:

* Less crowded
* More modern
* More premium
* Easier to scan
* More actionable
* More visually polished

The result should resemble a production SaaS application rather than a classroom dashboard.
