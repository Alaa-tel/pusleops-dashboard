# Call Widget Testing Guide

## 🎯 Quick Test Scenarios

### Scenario 1: Initial Load
**Expected Behavior:**
1. Dashboard loads
2. Phone button appears in bottom-right corner
3. After ~2 seconds, incoming call card automatically opens showing Amira Collins
4. Call badge shows "1"

**What to look for:**
- ✓ Phone button is visible and clickable
- ✓ Call badge pulses (red animation)
- ✓ Card slides up smoothly
- ✓ Caller info is displayed correctly

---

### Scenario 2: View Call Queue
**Steps:**
1. Dismiss the incoming call card (click ✕)
2. Click the phone button

**Expected Behavior:**
- Call queue dropdown appears
- Shows 4 calls with caller names, numbers, reasons
- Shows risk indicators (⚠️) on calls with flags
- Shows time since call arrived

**Test Points:**
- ✓ Queue is scrollable if needed
- ✓ Risk flags display correctly
- ✓ Times are calculated accurately
- ✓ Close button (✕) works

---

### Scenario 3: Select Different Call
**Steps:**
1. Click phone button to open queue
2. Click on Daniel Wright's call

**Expected Behavior:**
- Queue closes
- Incoming call card opens for Daniel Wright
- Shows his details, risk flags, related case

**Test Points:**
- ✓ Different caller info displays
- ✓ Risk flags show: "Overdue Documents"
- ✓ Related case shows: CASE-002
- ✓ Card transitions smoothly

---

### Scenario 4: Accept Call & Timer
**Steps:**
1. With an incoming call card open, click "✓ Accept Call"

**Expected Behavior:**
- Card transforms to active call panel
- Call timer shows "00:00" and starts incrementing
- Panel displays caller info, context, and notes field
- All content is clearly visible

**Test Points:**
- ✓ Timer starts at 0 and increments every second
- ✓ Timer format is MM:SS (not MM:SS:SS)
- ✓ Caller name and phone still visible
- ✓ Notes textarea is ready for input
- ✓ Client context displays correctly
- ✓ Suggested actions are visible

---

### Scenario 5: Type Notes
**Steps:**
1. With active call panel open, click in the notes textarea
2. Type some text: "Customer confirmed identity, discussed case status"

**Expected Behavior:**
- Text appears in the textarea
- Panel adjusts if needed (scroll)
- Text is retained

**Test Points:**
- ✓ Notes field accepts text input
- ✓ Multiple lines work
- ✓ Can clear and re-enter
- ✓ Scrolls if content is long

---

### Scenario 6: Minimize Call Widget
**Steps:**
1. With active call open, look for the "_" button in the header
2. Click the minimize button

**Expected Behavior:**
- Active call panel collapses
- Minimized widget appears with just a header bar
- Header shows caller name and current timer
- Expand button (▲) appears

**Test Points:**
- ✓ Minimized widget is compact and unobtrusive
- ✓ Timer continues counting in minimized state
- ✓ Dashboard is still visible behind

---

### Scenario 7: Expand Minimized Call
**Steps:**
1. With call minimized, click the ▲ button

**Expected Behavior:**
- Minimized widget expands back to full panel
- All content is restored exactly as before
- Timer continues from where it was

**Test Points:**
- ✓ Expands smoothly
- ✓ No data is lost
- ✓ Timer continued counting correctly

---

### Scenario 8: Call Timer States
**Steps:**
1. Accept a call and watch the timer
2. Wait until it reaches 00:05 (5 seconds for testing, normally 5 minutes)
3. Continue watching

**Expected Behavior:**
- At 00:00-00:04: Normal white text
- At 00:05+: Timer blinks (opacity animation)
- Timer continues incrementing

**Test Points:**
- ✓ Blink animation triggers at correct time
- ✓ Text remains readable while blinking
- ✓ Timer never stops (until end call)

---

### Scenario 9: Create Case Button
**Steps:**
1. With active call open, click "📋 Create Case"

**Expected Behavior:**
- In current implementation: Console log or placeholder action
- (Future: Would open case creation form pre-filled with call data)

**Test Points:**
- ✓ Button is clickable
- ✓ No errors in console
- ✓ Button shows proper hover state

---

### Scenario 10: End Call
**Steps:**
1. With active call open, click "📞 End Call" button

**Expected Behavior:**
- Active call panel disappears
- Phone button returns to normal state
- Call queue dropdown opens (or just phone button shows)
- Timer resets to 0
- Call is removed from queue

**Test Points:**
- ✓ Panel closes smoothly
- ✓ Call is cleared from state
- ✓ Phone button available for new calls
- ✓ Badge count updates if calls remain

---

### Scenario 11: View Profile (Future)
**Steps:**
1. With incoming call card open, click "👤 View Profile"

**Current Behavior:**
- Console logs the action (development mode)

**Test Points:**
- ✓ Button is clickable and responsive
- ✓ No errors occur
- ✓ Proper visual feedback on click

---

### Scenario 12: Start Case (Future)
**Steps:**
1. With incoming call card open, click "📋 Start Case"

**Current Behavior:**
- Console logs the action

**Test Points:**
- ✓ Button is clickable
- ✓ Shows proper hover state
- ✓ No errors

---

### Scenario 13: Dismiss Call
**Steps:**
1. With incoming call card open, click "✕ Dismiss"

**Expected Behavior:**
- Card closes
- Call queue appears automatically
- Same call is still available in queue (for testing, can be dismissed with confirmation in future)

**Test Points:**
- ✓ Card closes smoothly
- ✓ Phone button remains visible
- ✓ Can select another call immediately

---

### Scenario 14: Multiple Calls in Sequence
**Steps:**
1. End current call
2. Click phone button
3. Select a different call (e.g., James Patterson)
4. Accept it
5. Let timer run
6. Minimize, then expand
7. End call

**Expected Behavior:**
- All transitions work smoothly
- Each call's data loads correctly
- Timer resets for each new call
- No data mixing between calls

**Test Points:**
- ✓ Clean state transitions between calls
- ✓ No data leakage
- ✓ Timer always starts at 00:00 for new calls

---

### Scenario 15: Responsive Mobile View
**Steps:**
1. Open dashboard in mobile browser or use DevTools responsive mode
2. Simulate iPhone 12 (390px width)
3. Click phone button
4. Open incoming call card
5. Accept call
6. Try to interact with call panel

**Expected Behavior:**
- Phone button remains accessible
- Call queue takes up appropriate space (full width, modal-style)
- Incoming card and active panel adapt to mobile
- Timer and buttons are touch-friendly
- Can still minimize/expand

**Test Points:**
- ✓ Touch targets are large enough (44px+ recommended)
- ✓ Text is readable at mobile size
- ✓ No content is hidden or cut off
- ✓ Scrolling works if needed

---

## 🐛 Known Issues & Edge Cases

### Issue 1: Rapid Accept/Dismiss
**What happens:** User rapidly clicks Accept, then immediately Dismiss before accepting
**Current behavior:** Should queue next call properly
**To test:** Click Accept → immediately click phone icon

### Issue 2: Timer Overflow
**What happens:** Call runs for many hours
**Current behavior:** Timer shows HH:MM:SS format when hours exceed 99
**To test:** Force timer to high number (in dev tools)

### Issue 3: Overlapping Elements
**What happens:** Dashboard drawer + call widget both open
**Current behavior:** Call widget should be on top (z-index: 999)
**To test:** Open case detail drawer, then accept a call

### Issue 4: Notes Disappearing
**What happens:** Type notes, minimize, expand
**Current behavior:** Notes should persist
**To test:** Type text → minimize → expand → verify text is there

---

## 🔧 Debugging Tips

### View Console
Press F12 and check console for any errors when:
- Opening call card
- Starting timer
- Accepting/dismissing calls
- Creating case

### Check Network (if API is connected)
Monitor the Network tab for any failed requests

### Inspect Elements
Right-click on phone button or call card, select "Inspect Element"
- Check z-index values
- Verify animation classes are applied
- Look for memory leaks

### Performance
Open DevTools Performance tab:
- Record while accepting and ending calls
- Check frame rate (should be smooth 60 FPS)
- Look for jank during animations

### Responsive Testing
- Desktop: 1920px, 1440px, 1024px
- Tablet: 768px, 834px
- Mobile: 390px, 430px

---

## ✅ Test Checklist

- [ ] Phone button appears on page load
- [ ] Call count badge displays
- [ ] Call queue opens when phone button clicked
- [ ] Can select call from queue
- [ ] Incoming card shows all required information
- [ ] Can dismiss call
- [ ] Can view profile (button exists)
- [ ] Can start case (button exists)
- [ ] Accept button works
- [ ] Active panel opens after accept
- [ ] Timer starts and increments
- [ ] Can take notes
- [ ] Can minimize call
- [ ] Can expand minimized call
- [ ] Timer continues while minimized
- [ ] Can create case (button exists)
- [ ] Can end call
- [ ] All animations are smooth
- [ ] Responsive on mobile
- [ ] All text is readable
- [ ] Colors match design system
- [ ] No console errors

---

## 📊 Performance Targets

- **Page Load**: < 3 seconds
- **Call Card Animation**: < 300ms
- **Timer Update**: 60 FPS
- **Minimize/Expand**: < 200ms
- **Mobile Responsiveness**: < 100ms layout shift

---

## 🎬 Recording Test Session

To record a video test:
1. Use OBS or built-in screen recording
2. Start recording
3. Follow one of the scenarios above
4. Show console to verify no errors
5. Comment on what you're testing
6. Save and share

---

**Happy Testing! 🎉**

For any issues, refer to CALL_WIDGET_DOCS.md for implementation details.
