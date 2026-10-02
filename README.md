# LuxeStay - Luxury Hotel Management System 🏨✨

A modern, responsive, and feature-rich front-desk Hotel Management System (HMS) dashboard built with vanilla web technologies (HTML5, CSS3, and modern JavaScript). Designed to streamline hospitality operations, room inventory management, guest reservations, and housekeeping workflows.

---

## 🌟 Key Features

### 1. **Executive Operations Dashboard**
- **Live Performance Metrics (KPIs):** Real-time occupancy rate tracking with dynamic progress bars, available room counters, daily revenue calculation, and pending housekeeping queues.
- **Live Clock & Status Indicator:** Real-time synchronized front-desk clock and system status heartbeat indicator.

### 2. **Interactive Room Inventory Matrix**
- **Categorized Suites:** Filter by room classes (*Deluxe Suite*, *Executive Suite*, *Ocean Villa*, *Presidential Penthouse*).
- **Live Status Filtering:** Instant color-coded indicators for room statuses:
  - 🟢 **Available:** Ready for immediate check-in.
  - 🔵 **Occupied:** Assigned to active guests.
  - 🟡 **Cleaning:** Housekeeping turnover in progress.
  - 🔴 **Maintenance:** Out-of-service / maintenance hold.
- **Interactive Room Details Modal:** Click on any room card to inspect guest assignment, nightly rate, keycard assignment, amenities, and trigger direct actions (Check-In, Check-Out, Mark Cleaned, Flag Maintenance).

### 3. **Reservations & Front Desk Log**
- **Search & Filter:** Search bookings by guest name, booking reference ID, or room number.
- **Dynamic Check-in & Check-Out:** Direct one-click front desk actions to check guests in or out with automatic status transitions to housekeeping.
- **Invoice & Balance Tracking:** Detailed stay records, dates, guest counts, and folio balances.

### 4. **New Reservation Booking Engine**
- Interactive modal to create new guest bookings.
- Auto-populates available rooms dynamically based on live inventory.
- Real-time updates to occupancy rate, room statuses, and front-desk tables upon submission.

### 5. **Toast Notification System**
- Non-intrusive animated feedback for front desk actions (reservations made, check-ins, check-outs, status updates).

---

## 🛠️ Technology Stack

- **Markup:** HTML5 (Semantic elements, accessible modal dialogs, SEO-ready meta tags)
- **Styling:** Vanilla CSS3
  - Custom CSS variables & design tokens
  - Glassmorphic backdrop filters
  - Responsive Grid & Flexbox layouts
  - Modern typography via Google Fonts (*Outfit* and *Inter*)
  - Dark luxury aesthetic
- **Logic:** Vanilla JavaScript (ES6+)
  - Reactive state management for room inventory and reservations
  - Dynamic DOM rendering and search/filter pipelines
  - Real-time KPI computations

---

## 📂 Project Structure

```text
├── index.html        # Main application structure & semantic layout
├── styles.css        # Luxury dark design system, CSS variables & animations
├── app.js            # Reactive state management, event listeners & modal controllers
└── README.md         # Project documentation and guide
```

---

## 🚀 Getting Started

No external dependencies, build tools, or installations are required!

### Option 1: Direct Browser Launch
Simply double-click [`index.html`](file:///d:/SLIIT/Git-commit-test/index.html) or open it in any modern browser:
```bash
# On Windows PowerShell
Start-Process index.html
```

### Option 2: Run with a Local Web Server
You can also serve the project using Python or Node.js:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```
Then navigate to `http://localhost:8000` in your web browser.

---

## 📱 Responsive Support

The dashboard is built to adapt across devices:
- **Desktop & Widescreen:** Full-width operations console with persistent sidebar navigation.
- **Tablet & Mobile:** Collapsible navigation drawer and optimized single-column layout.