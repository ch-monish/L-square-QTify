# Test Requirements & Implementation Guide

## Overview
Your Qtify app needs the following features to pass all test cases:

---

## ✅ ALREADY IMPLEMENTED

### 1. **Navbar Component** ✓
- [x] Logo with left spacing
- [x] Search bar with placeholder "search a song" or "search an album"
- [x] "Give Feedback" button
- [x] Black background button with green text
- [x] Poppins font
- [x] Pointer cursor
- [x] Border-radius styling

### 2. **Hero Section** ✓
- [x] Text: "100 Thousand Songs, ad-free"
- [x] Contains image (headphones)
- [x] Black background color

### 3. **Card Component** ✓
- [x] Album image (1:1 aspect ratio)
- [x] Follows count with Chip component
- [x] Title with truncation

### 4. **Section Component** ✓
- [x] Displays grid of cards
- [x] Show All / Collapse toggle button

### 5. **API Integration** ✓
- [x] Fetch /albums/top
- [x] Fetch /albums/new
- [x] Display in separate Section components

---

## 🔄 NEEDS TO BE IMPLEMENTED

### 1. **Show All / Collapse Functionality** (HIGH PRIORITY)
**Status:** Partially implemented
**Required Changes:**
- Section component should show only 7 cards by default (currently shows all)
- When "Show All" is clicked, display all cards and change button text to "Collapse"
- When "Collapse" is clicked, show only 7 cards and change button text back to "Show All"

**File to modify:** `src/Section/Section.jsx`

**Test:** "Albums Section tests" → "should show cards for Top and New Albums and verify the 'Show All' functionality"

---

### 2. **Slider/Carousel with Navigation Buttons** (HIGH PRIORITY)
**Status:** Not implemented
**Required Features:**
- Horizontal scrollable carousel for album cards
- Circular next/previous navigation buttons on the right/left
- Buttons should be positioned outside or on top of the card grid
- Next button: Clicks 4 times should hide the first 2 albums
- Use horizontal scroll or transform translate

**New Component to Create:** `src/Carousel/Carousel.jsx`

**Files to modify:**
- `src/Section/Section.jsx` - Wrap grid in carousel
- `src/App.jsx` - Use carousel instead of regular section (or create new section variant)

**Test:** "Slider functionality tests" → "should verify if the first two albums are not visible after clicking the slider's next button 4 times"

---

### 3. **Songs Section** (HIGH PRIORITY)
**Status:** Not implemented
**Required Features:**
- New section that displays songs
- Fetch from `/songs` endpoint
- Display songs in a grid similar to albums
- Each song card should have:
  - Song image
  - Song title
  - Artist(s) name
  - Duration (optional, for UI enhancement)

**New Components to Create:**
- `src/SongCard/SongCard.jsx` - Similar to Card but for songs
- `src/SongCard/SongCard.module.css` - Styling

**Files to modify:**
- `src/App.jsx` - Add useEffect to fetch songs, create Songs Section

**Test:** "Songs test" → "should match the count of song cards with their respective API responses"

---

## 📋 Test Case Checklist

### Navbar Tests ✅
- [x] Should contain logo, search bar, and button
- [x] Logo is vertically centered with left spacing
- [x] Search bar has "search a song" / "search an album" placeholder
- [x] Button has black background
- [x] Button has green text
- [x] Button has border-radius
- [x] Button cursor is pointer
- [x] Button uses Poppins font

### Hero Section Tests ✅
- [x] Contains "100 Thousand Songs, ad-free" text
- [x] Has image in parent element
- [x] Parent has black background

### Cards Tests ✅
- [x] All top album cards are visible
- [x] All new album cards are visible
- [x] Card count matches API response

### Albums Section Tests ❌ (Partial)
- [x] Cards display
- ❌ Show All button shows only 7 cards by default
- ❌ Show All button expands to show all cards
- ❌ Collapse button hides excess cards

### Slider Tests ❌
- ❌ Next button visible on right side
- ❌ Next button is circular
- ❌ Clicking next 4 times hides first 2 albums
- ❌ Horizontal scroll works correctly

### Songs Tests ❌
- ❌ Songs section fetches from `/songs` endpoint
- ❌ Songs display in grid
- ❌ Song count matches API response

---

## 🚀 Implementation Priority

### Phase 1 (Critical - Do First)
1. Fix Section component Show All/Collapse (5-10 min)
2. Create Songs section (15-20 min)

### Phase 2 (Important)
1. Implement Carousel/Slider with next/prev buttons (30-45 min)

---

## 📝 API Response Format (for reference)

### Albums (/albums/top, /albums/new)
```json
[
  {
    "id": "string",
    "title": "string",
    "image": "url",
    "follows": number,
    "songs": [],
    "slug": "string"
  }
]
```

### Songs (/songs)
```json
[
  {
    "id": "string",
    "title": "string",
    "image": "url",
    "durationInMs": number,
    "artists": ["string"],
    "genre": {
      "key": "string",
      "label": "string"
    }
  }
]
```

---

## 🧪 How to Test

**Run all tests:**
```bash
npx cypress run --spec cypress/e2e/qtify.cy.js
```

**Run specific test suite:**
```bash
npx cypress run --spec cypress/e2e/qtify.cy.js --grep "Albums Section tests"
```

**Open Cypress GUI:**
```bash
npx cypress open
```

---

**Generated:** January 29, 2026
**Project:** Qtify Music Streaming App
