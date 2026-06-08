# PulseOps — Daily Operations Dashboard

## P301 Operational Dashboard

### Project Goal

Build an operational dashboard that helps a frontline operations specialist start their day, understand what needs attention, and act quickly without digging through spreadsheets or multiple systems.

### Industry

Financial services / client operations

### Primary User

A client service operations specialist who manages incoming client cases, escalations, follow-ups, meetings, and daily workload.

### Dashboard Purpose

PulseOps gives the employee a clear morning snapshot:

* What needs attention now
* Which cases are at risk
* What follow-ups are due
* Where workload is increasing
* What changed since yesterday

The dashboard should not just display metrics. It should help the user decide what to do next.

---

## Core Story

Every morning, an operations specialist opens PulseOps to answer:

1. What should I handle first?
2. Are any client cases becoming risky?
3. Do I have overdue follow-ups?
4. Is my workload manageable today?
5. Are there patterns my manager should know about?

The dashboard turns scattered operational data into a focused daily command center.

---

## Main Sections

### 1. Morning Brief

A top summary area that tells the user what changed today.

Include:

* Cases assigned today
* Urgent cases
* Overdue follow-ups
* Escalations waiting
* Average response time

Design idea:
Use strong visual hierarchy with a short “Today needs your attention” message.

---

### 2. Priority Queue

The most important section of the dashboard.

Include a list of cases ranked by urgency:

* Client name
* Case type
* Status
* SLA risk
* Last activity
* Recommended next action

Example actions:

* Call client
* Review document
* Follow up with advisor
* Escalate
* Close case

This section should feel actionable, not just like a table.

---

### 3. Risk & Escalation Watch

A smaller panel that highlights issues before they become problems.

Include:

* Cases close to SLA breach
* Reopened cases
* High-value client cases
* Fraud or compliance flags
* Stalled escalations

Use alert cards or chips to make risks easy to scan.

---

### 4. Today’s Workload

A visual summary of the user’s day.

Include:

* Open cases by status
* Calls scheduled
* Meetings today
* Tasks due today
* Workload compared to yesterday

Use simple charts, progress bars, or grouped cards.

---

### 5. Communication Snapshot

A section that connects operations work with communication.

Include:

* Unread client emails
* Follow-up emails due
* Meetings related to open cases
* Recent client contact activity

This section should support the user’s workflow, not become a full inbox.

---

### 6. Team Pulse

Optional lower section for broader context.

Include:

* Team backlog
* Escalation volume
* Average wrap time
* SLA performance
* Workload distribution

This can be a manager-friendly section, but the main dashboard should still focus on the frontline employee.

---

## Suggested Interactions

Add simple interactions that support the story:

* Filter by case status, priority, or risk level
* Toggle between “My work” and “Team view”
* Click a case to open a detail drawer
* Mark a follow-up as done
* Sort queue by SLA risk or last activity
* Expand “Why this is urgent”
* Switch between today / this week

Do not overbuild. The dashboard should still feel focused.

---

## Visual Direction

The design should feel:

* Calm
* Modern
* Professional
* Operational
* Slightly premium
* Easy to scan in the morning

Suggested style:

* Soft neutral background
* White cards
* Rounded corners
* Clear spacing
* Blue/teal accent color
* Subtle warning colors for risk
* Dashboard header with greeting and date
* Right-side insight panel

Avoid making it look like a generic admin dashboard.

---

## Example Data

Use realistic fake data.

Example names:

* Amira Collins
* Daniel Wright
* Priya Shah
* Marcus Lee
* Sofia Ramirez

Example case types:

* Contribution issue
* Grant request
* Account update
* Document review
* Advisor follow-up
* Compliance review
* Donor question

Example statuses:

* New
* In progress
* Waiting on client
* Waiting on internal team
* Escalated
* Ready to close

Example risk labels:

* SLA risk
* High-value client
* Reopened
* Compliance flag
* No activity 3+ days

---

## MVP Screens

Build one main dashboard screen first.

Required:

1. Header with product name, date, and user greeting
2. Morning Brief cards
3. Priority Queue
4. Risk & Escalation Watch panel
5. Today’s Workload section
6. Communication Snapshot
7. Case detail drawer or modal when clicking a case

Optional if time allows:

* Team Pulse section
* My Work / Team View toggle
* Simple chart animations
* Empty states
* Mobile responsive version

---

## Success Criteria

The dashboard is successful if someone can look at it and quickly understand:

* What is urgent
* What is falling behind
* What action to take next
* How busy the day looks
* Whether anything needs escalation

The final design should feel like an operational command center, not just a collection of charts.

## Call Widget

PulseOps should include a call experience for incoming client calls.

### Purpose
Help the operations specialist quickly understand who is calling, why they may be calling, and what action to take without leaving the dashboard.

### Behavior
- A floating phone button appears in the bottom-right corner.
- When there is an incoming call, a compact call notification appears.
- The user can:
  - Accept call
  - Dismiss call
  - View client profile
  - Start a new case
- Once accepted, the widget becomes an active call panel.

### Incoming Call State
Show:
- Caller name
- Phone number
- Client ID
- Likely reason for call
- Related open case
- Risk flags, if any

### Active Call State
Show:
- Call timer
- Client context
- Suggested next actions
- Quick notes field
- Create case button
- End call button

### Design
The widget should feel like part of the dashboard, not a separate phone app.
Use a compact floating card with strong hierarchy and clear action buttons.