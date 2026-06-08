# Call Widget Documentation

## Overview

The PulseOps Call Widget provides a floating phone interface for incoming client calls directly within the dashboard. It allows operations specialists to manage calls without leaving their workflow.

## Features

### 1. **Floating Phone Button**
- Located in the bottom-right corner
- Displays incoming call count with a pulsing badge
- Click to see queue of pending calls
- Gradient blue color that matches dashboard theme

### 2. **Call Queue**
- Shows all incoming calls in a dropdown list
- Displays:
  - Caller name
  - Phone number
  - Call reason
  - Time since call arrived
  - Risk indicator (⚠️) if call has risk flags
- Click any call to open the incoming call card

### 3. **Incoming Call Card**
- Full call details presented in a card
- **Header Section** (colored gradient):
  - Caller avatar with initials
  - Caller name and phone number
  
- **Details Section**:
  - Client ID
  - Likely reason for call
  - Related case ID (if applicable)
  - Risk flags (color-coded badges)

- **Action Buttons** (4 primary options):
  - ✓ **Accept Call** (green, full-width) - Transitions to active call panel
  - ✕ **Dismiss** (red) - Closes card and returns to queue
  - 👤 **View Profile** (gray) - Opens client profile (expandable)
  - 📋 **Start Case** (gray) - Creates new case from call

### 4. **Active Call Panel**
- Displayed after accepting a call
- **Header**:
  - Call timer (MM:SS format, increases in urgency)
  - Minimize button (_)
  - Blinks/warns when call > 5 min
  - Critical alert when > 10 min

- **Content Sections**:
  - **Caller Info**: Avatar, name, phone in compact format
  - **Client Context**: Client ID, call reason, related case
  - **Suggested Next Actions**: Quick checklist of recommended steps
  - **Quick Notes Field**: Textarea for real-time note-taking

- **Footer**:
  - 📋 **Create Case** - Opens case creation form with pre-filled call data
  - 📞 **End Call** (red) - Closes call and returns to main dashboard

### 5. **Minimized Call Widget**
- Click minimize (_) button to collapse active call panel
- Shows caller name and call timer
- Click ▲ to expand back to full panel
- Allows user to interact with dashboard while on call

## Component Structure

```
CallWidget.vue
├── Phone Button (floating)
├── Call Queue Dropdown
├── Incoming Call Card
├── Active Call Panel
│   ├── Header (timer)
│   ├── Content (scrollable)
│   │   ├── Caller Info
│   │   ├── Client Context
│   │   ├── Suggested Actions
│   │   └── Notes Field
│   └── Footer (Actions)
└── Minimized Widget
```

## Data Structure

### IncomingCall (types-call.ts)
```typescript
interface IncomingCall {
  id: string                    // Unique call ID
  callerName: string            // Display name
  phoneNumber: string           // Phone number
  clientId: string              // Associated client
  likelyReason: string          // Reason for call
  relatedCaseId?: string        // Associated case (optional)
  riskFlags: string[]           // Array of risk labels
  timestamp: Date               // When call arrived
}
```

### ActiveCall
```typescript
interface ActiveCall extends IncomingCall {
  callStartTime: Date           // When call was accepted
  notes: string                 // User-entered notes
}
```

## Sample Data

Located in `src/data-calls.ts`:
- 4 incoming calls with realistic data
- Mix of risk levels and case associations
- Includes compliance, SLA risk, and high-value client scenarios

## Usage

### Interaction Flow

1. **Phone button** shows badge with call count (auto-shown after 2 sec on page load)
2. User clicks phone button to see **call queue**
3. User clicks a call to open **incoming call card**
4. User can:
   - Accept call → **active call panel** opens
   - Dismiss call → returns to queue
   - View profile → profile opens (future feature)
   - Start case → case form opens (future feature)
5. During active call:
   - Take notes in quick notes field
   - Check suggested actions
   - Minimize to work on dashboard
   - End call when finished

### State Management

- `showCallQueue` - Toggle call queue visibility
- `showIncomingCall` - Toggle incoming card visibility
- `activeCall` - Current active call object
- `isMinimized` - Minimize/expand active call panel
- `selectedCall` - Currently selected incoming call
- `callDuration` - Elapsed time on active call (updates every second)

### Call Timer

- Starts at 00:00 when call is accepted
- Increments every second
- Warning state: > 5 minutes (300 seconds) - blinks
- Critical state: > 10 minutes (600 seconds) - more intense

## Styling

- **Colors**: Matches dashboard theme (primary blue #0ea5e9, success green, danger red)
- **Animations**: 
  - Slide-up entry for cards
  - Pulse animation on call badge
  - Blink animation on timer when long calls
  - Smooth transitions on all interactions

- **Responsive**:
  - Desktop: Fixed 360-380px width, bottom-right corner
  - Tablet: Adapts to screen size
  - Mobile: Full-width modal-style presentation

## Integration Points

### With Main Dashboard
- Floats above all dashboard content (z-index: 999)
- Doesn't block dashboard interaction (except overlay)
- Minimizable to keep working while on call
- Can integrate with case detail drawer

### With Backend
- Replace `incomingCalls` array with API calls
- Use WebSocket for real-time incoming call events
- Send call notes to backend on call end
- Pre-populate case form with call data

## Future Enhancements

1. **Profile Modal**: Click "View Profile" to see full client details
2. **Case Creation**: Integrated form to create case from call
3. **Screen Pop**: Automatically show caller's profile when call arrives
4. **Call Recording**: Indicate if call is being recorded
5. **Transfer Options**: Transfer call to another agent
6. **Caller ID Lookup**: Auto-fetch client info based on phone number
7. **Call History**: Recent calls for follow-up
8. **Conference Mode**: Add participants to call
9. **Voicemail**: Play/manage voicemails
10. **Call Analytics**: Log calls for reporting

## Files Modified

- `src/components/CallWidget.vue` - Main widget component
- `src/types-call.ts` - TypeScript interfaces
- `src/data-calls.ts` - Sample call data
- `src/App.vue` - Added CallWidget import and usage

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes

- Call timer updates every 1 second (efficient)
- Minimize feature reduces re-renders
- Smooth CSS animations (no performance impact)
- Can handle multiple calls in queue efficiently

## Accessibility

- Semantic button elements
- Color contrast meets WCAG AA standards
- Keyboard navigation support (future enhancement)
- Screen reader friendly labels
- Clear visual states (active, hover, disabled)

---

**Built for efficient call management within PulseOps dashboard**
