/**
 * LuxeStay Hotel Management System
 * Core State & Interactive Controller
 */

// Initial Room Inventory State
let rooms = [
  { id: 101, number: '101', floor: '1st Floor', type: 'Deluxe Suite', price: 280, status: 'Occupied', guest: 'Sophia Martinez', nights: 3, amenities: ['King Bed', 'City View', 'WiFi'] },
  { id: 102, number: '102', floor: '1st Floor', type: 'Deluxe Suite', price: 280, status: 'Available', guest: null, nights: 0, amenities: ['King Bed', 'Garden View', 'WiFi'] },
  { id: 103, number: '103', floor: '1st Floor', type: 'Deluxe Suite', price: 290, status: 'Cleaning', guest: null, nights: 0, amenities: ['2 Queen Beds', 'Garden View'] },
  { id: 104, number: '104', floor: '1st Floor', type: 'Deluxe Suite', price: 280, status: 'Occupied', guest: 'David & Clara Kim', nights: 2, amenities: ['King Bed', 'City View'] },
  { id: 201, number: '201', floor: '2nd Floor', type: 'Executive Suite', price: 450, status: 'Occupied', guest: 'Jonathan Hayes', nights: 4, amenities: ['Executive Lounge', 'Jacuzzi', 'Espresso'] },
  { id: 202, number: '202', floor: '2nd Floor', type: 'Executive Suite', price: 450, status: 'Available', guest: null, nights: 0, amenities: ['King Bed', 'Skyline View', 'Workstation'] },
  { id: 203, number: '203', floor: '2nd Floor', type: 'Executive Suite', price: 460, status: 'Occupied', guest: 'Dr. Liam Vance', nights: 1, amenities: ['King Bed', 'Balcony', 'Safe'] },
  { id: 204, number: '204', floor: '2nd Floor', type: 'Executive Suite', price: 450, status: 'Maintenance', guest: null, nights: 0, amenities: ['AC Inspection', 'Mini Bar'] },
  { id: 301, number: '301', floor: '3rd Floor', type: 'Ocean Villa', price: 720, status: 'Occupied', guest: 'Amara Okafor', nights: 5, amenities: ['Private Pool', 'Ocean Front', 'Butler'] },
  { id: 302, number: '302', floor: '3rd Floor', type: 'Ocean Villa', price: 720, status: 'Cleaning', guest: null, nights: 0, amenities: ['Private Infinity Pool', 'Ocean Front'] },
  { id: 303, number: '303', floor: '3rd Floor', type: 'Ocean Villa', price: 750, status: 'Available', guest: null, nights: 0, amenities: ['Direct Beach Access', 'Chef Kitchen'] },
  { id: 401, number: '401', floor: 'Penthouse', type: 'Presidential Penthouse', price: 1650, status: 'Occupied', guest: 'Lord & Lady Harrington', nights: 7, amenities: ['360 Panorama', 'Helipad Access', 'Private Spa'] },
];

// Initial Bookings Data
let bookings = [
  { id: 'LX-8921', guest: 'Lord & Lady Harrington', room: '401', dates: 'Oct 02 - Oct 09', guests: '2 Adults', status: 'Checked In', balance: '$11,550.00' },
  { id: 'LX-8924', guest: 'Amara Okafor', room: '301', dates: 'Oct 03 - Oct 08', guests: '1 Adult', status: 'Checked In', balance: '$3,600.00' },
  { id: 'LX-8927', guest: 'Jonathan Hayes', room: '201', dates: 'Oct 04 - Oct 08', guests: '2 Adults', status: 'Checked In', balance: '$1,800.00' },
  { id: 'LX-8930', guest: 'Sophia Martinez', room: '101', dates: 'Oct 03 - Oct 06', guests: '1 Adult', status: 'Checked In', balance: '$840.00' },
  { id: 'LX-8933', guest: 'David & Clara Kim', room: '104', dates: 'Oct 04 - Oct 06', guests: '2 Adults', status: 'Checked In', balance: '$560.00' },
  { id: 'LX-8936', guest: 'Marcus Brody', room: '102', dates: 'Oct 05 - Oct 07', guests: '1 Adult', status: 'Confirmed', balance: '$560.00' },
];

// Filter and state trackers
let currentCategoryFilter = 'all';
let currentStatusFilter = 'all';
let searchQuery = '';

// DOM Elements
const roomsGrid = document.getElementById('rooms-grid');
const bookingsTableBody = document.getElementById('bookings-table-body');
const globalSearchInput = document.getElementById('global-search-input');
const bookingSearchInput = document.getElementById('booking-search-input');
const categoryFilterChips = document.querySelectorAll('.filter-chip');
const roomStatusFilter = document.getElementById('room-status-filter');
const liveClockElement = document.getElementById('live-clock');

// Modals
const bookingModal = document.getElementById('booking-modal');
const roomDetailModal = document.getElementById('room-detail-modal');
const openBookingBtn = document.getElementById('btn-open-booking-modal');
const closeBookingBtn = document.getElementById('modal-close-btn');
const cancelBookingBtn = document.getElementById('btn-cancel-booking');
const roomModalCloseBtn = document.getElementById('room-modal-close-btn');
const newBookingForm = document.getElementById('new-booking-form');
const roomSelectDropdown = document.getElementById('room-select');

// Mobile Menu
const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
const sidebar = document.getElementById('sidebar');

/**
 * Initialize Application
 */
function initApp() {
  renderRooms();
  renderBookings();
  updateKPIs();
  setupEventListeners();
  startLiveClock();
  populateBookingRoomOptions();
}

/**
 * Live Clock Updater
 */
function startLiveClock() {
  function updateTime() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
    liveClockElement.innerHTML = `
      <span class="live-date">${dateStr}</span>
      <span class="live-time">${timeStr}</span>
    `;
  }
  updateTime();
  setInterval(updateTime, 1000);
}

/**
 * Update Key Performance Indicators
 */
function updateKPIs() {
  const total = rooms.length;
  const occupied = rooms.filter(r => r.status === 'Occupied').length;
  const available = rooms.filter(r => r.status === 'Available').length;
  const cleaning = rooms.filter(r => r.status === 'Cleaning').length;

  const occupancyRate = ((occupied / total) * 100).toFixed(1);
  const totalRevenue = rooms
    .filter(r => r.status === 'Occupied')
    .reduce((sum, r) => sum + r.price, 0);

  // Update DOM Elements
  document.getElementById('kpi-occupancy-rate').textContent = `${occupancyRate}%`;
  document.getElementById('occupancy-progress').style.width = `${occupancyRate}%`;
  document.getElementById('kpi-rooms-ratio').textContent = `${occupied} of ${total} Rooms Occupied`;
  document.getElementById('kpi-available-rooms').textContent = available;
  document.getElementById('kpi-housekeeping-count').textContent = cleaning;
  document.getElementById('kpi-cleaning-count').textContent = cleaning;
  document.getElementById('kpi-revenue').textContent = `$${totalRevenue.toLocaleString()}`;
  document.getElementById('badge-total-rooms').textContent = total;
  document.getElementById('badge-reservations').textContent = bookings.length;
}

/**
 * Render Rooms Grid
 */
function renderRooms() {
  roomsGrid.innerHTML = '';

  const filtered = rooms.filter(room => {
    const matchesCategory = currentCategoryFilter === 'all' || room.type.toLowerCase().includes(currentCategoryFilter.toLowerCase());
    const matchesStatus = currentStatusFilter === 'all' || room.status.toLowerCase() === currentStatusFilter.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      room.number.includes(searchQuery) || 
      room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (room.guest && room.guest.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesStatus && matchesSearch;
  });

  if (filtered.length === 0) {
    roomsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-muted); background: rgba(0,0,0,0.1); border-radius: 12px;">
        <p style="font-size: 1.1rem; margin-bottom: 6px;">No rooms match your filter criteria.</p>
        <span style="font-size: 0.85rem;">Try resetting the filters or clearing the search query.</span>
      </div>
    `;
    return;
  }

  filtered.forEach(room => {
    const statusClass = room.status.toLowerCase();
    const card = document.createElement('div');
    card.className = `room-card status-${statusClass}`;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.onclick = () => openRoomDetailModal(room.id);

    card.innerHTML = `
      <div>
        <div class="room-card-header">
          <div>
            <div class="room-number-wrap">
              <span class="room-num">${room.number}</span>
              <span class="room-floor">${room.floor}</span>
            </div>
            <div class="room-type">${room.type}</div>
          </div>
          <span class="status-pill ${statusClass}">${room.status}</span>
        </div>

        <div class="room-meta-guest" style="margin-top: 14px;">
          <div class="guest-info-small">
            ${room.guest ? `<span style="color: #94a3b8; font-size: 0.72rem; display:block;">GUEST</span>${room.guest}` : '<span style="color: #64748b;">Vacant / Available</span>'}
          </div>
          <div class="room-rate-small">
            $${room.price}<span>/night</span>
          </div>
        </div>
      </div>

      <div class="room-card-footer">
        <div class="room-amenities">
          ${room.amenities.slice(0, 2).map(amenity => `<span class="amenity-tag">${amenity}</span>`).join('')}
        </div>
        <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); openRoomDetailModal(${room.id})">
          Details
        </button>
      </div>
    `;

    roomsGrid.appendChild(card);
  });
}

/**
 * Render Bookings / Front Desk Table
 */
function renderBookings(filterTerm = '') {
  bookingsTableBody.innerHTML = '';

  const filtered = bookings.filter(b => {
    if (!filterTerm) return true;
    const term = filterTerm.toLowerCase();
    return b.guest.toLowerCase().includes(term) || 
           b.id.toLowerCase().includes(term) || 
           b.room.includes(term);
  });

  if (filtered.length === 0) {
    bookingsTableBody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 28px; color: var(--text-muted);">
          No reservations found matching "${filterTerm}".
        </td>
      </tr>
    `;
    return;
  }

  filtered.forEach(b => {
    const tr = document.createElement('tr');
    const initials = b.guest.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const isCheckedIn = b.status === 'Checked In';

    tr.innerHTML = `
      <td style="font-family: monospace; font-weight: 600; color: #60a5fa;">${b.id}</td>
      <td>
        <div class="guest-name-cell">
          <div class="guest-avatar-small">${initials}</div>
          <div>
            <strong>${b.guest}</strong>
          </div>
        </div>
      </td>
      <td><span style="background: rgba(255,255,255,0.06); padding: 4px 10px; border-radius: 6px; font-weight: 600;">Room ${b.room}</span></td>
      <td>${b.dates}</td>
      <td>${b.guests}</td>
      <td>
        <span class="status-pill ${isCheckedIn ? 'occupied' : 'available'}">
          ${b.status}
        </span>
      </td>
      <td style="font-weight: 600;">${b.balance}</td>
      <td class="text-right">
        <div class="table-action-btns">
          ${isCheckedIn 
            ? `<button class="btn btn-secondary btn-sm" onclick="handleTableCheckOut('${b.id}', '${b.room}')">Check-Out</button>`
            : `<button class="btn btn-emerald btn-sm" onclick="handleTableCheckIn('${b.id}', '${b.room}')">Check-In</button>`
          }
          <button class="btn btn-secondary btn-sm" onclick="showToast('Invoice downloaded for ${b.guest}', 'info')">Invoice</button>
        </div>
      </td>
    `;
    bookingsTableBody.appendChild(tr);
  });
}

/**
 * Open Room Detail Modal
 */
function openRoomDetailModal(roomId) {
  const room = rooms.find(r => r.id === roomId);
  if (!room) return;

  const title = document.getElementById('modal-room-detail-title');
  const subtitle = document.getElementById('modal-room-detail-subtitle');
  const body = document.getElementById('room-modal-content');
  const footer = document.getElementById('room-modal-footer');

  title.textContent = `Room ${room.number} • ${room.type}`;
  subtitle.textContent = `${room.floor} - LuxeStay Grand Wing`;

  const statusClass = room.status.toLowerCase();

  body.innerHTML = `
    <div class="room-detail-hero">
      <div>
        <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">CURRENT STATUS</span>
        <span class="status-pill ${statusClass}" style="margin-top: 4px;">${room.status}</span>
      </div>
      <div style="text-align: right;">
        <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">STANDARD NIGHTLY RATE</span>
        <span style="font-size: 1.4rem; font-weight: 700; color: #fff;">$${room.price}.00</span>
      </div>
    </div>

    <div class="detail-specs-grid">
      <div class="spec-item">
        <div class="spec-label">Assigned Guest</div>
        <div class="spec-val">${room.guest || 'None (Vacant)'}</div>
      </div>
      <div class="spec-item">
        <div class="spec-label">Floor Location</div>
        <div class="spec-val">${room.floor}</div>
      </div>
      <div class="spec-item">
        <div class="spec-label">Keycard Assigned</div>
        <div class="spec-val">${room.guest ? 'Keycard #KC-' + room.number + 'A' : 'Deactivated'}</div>
      </div>
      <div class="spec-item">
        <div class="spec-label">Housekeeping Status</div>
        <div class="spec-val">${room.status === 'Cleaning' ? 'Turnover in progress' : 'Clean & Inspected'}</div>
      </div>
    </div>

    <div>
      <h4 style="font-size: 0.9rem; margin-bottom: 8px;">Room Amenities & Inclusions</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${room.amenities.map(a => `<span style="background: rgba(255,255,255,0.06); padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;">✓ ${a}</span>`).join('')}
      </div>
    </div>
  `;

  // Action buttons dynamically adapted to status
  let actionBtns = '';

  if (room.status === 'Available') {
    actionBtns = `
      <button class="btn btn-secondary" onclick="setRoomStatus(${room.id}, 'Maintenance')">Flag for Maintenance</button>
      <button class="btn btn-primary" onclick="closeRoomModal(); openBookingModalWithRoom('${room.number}')">Book This Room</button>
    `;
  } else if (room.status === 'Occupied') {
    actionBtns = `
      <button class="btn btn-secondary" onclick="showToast('Room service order placed for Room ${room.number}', 'info')">Order Room Service</button>
      <button class="btn btn-emerald" onclick="checkOutRoom(${room.id})">Complete Check-Out</button>
    `;
  } else if (room.status === 'Cleaning') {
    actionBtns = `
      <button class="btn btn-secondary" onclick="setRoomStatus(${room.id}, 'Maintenance')">Needs Repair</button>
      <button class="btn btn-emerald" onclick="setRoomStatus(${room.id}, 'Available')">Mark as Clean & Ready</button>
    `;
  } else if (room.status === 'Maintenance') {
    actionBtns = `
      <button class="btn btn-emerald" onclick="setRoomStatus(${room.id}, 'Cleaning')">Resolve & Send to Cleaning</button>
    `;
  }

  footer.innerHTML = actionBtns;
  roomDetailModal.classList.add('open');
}

function closeRoomModal() {
  roomDetailModal.classList.remove('open');
}

/**
 * Status Management Functions
 */
function setRoomStatus(roomId, newStatus) {
  const room = rooms.find(r => r.id === roomId);
  if (!room) return;

  room.status = newStatus;
  if (newStatus === 'Available' || newStatus === 'Cleaning' || newStatus === 'Maintenance') {
    room.guest = null;
    room.nights = 0;
  }

  closeRoomModal();
  renderRooms();
  updateKPIs();
  populateBookingRoomOptions();
  showToast(`Room ${room.number} updated to "${newStatus}"`, 'success');
}

function checkOutRoom(roomId) {
  const room = rooms.find(r => r.id === roomId);
  if (!room) return;

  const guestName = room.guest;
  // Mark in booking table as checked out
  const booking = bookings.find(b => b.room === room.number && b.status === 'Checked In');
  if (booking) {
    booking.status = 'Checked Out';
    renderBookings();
  }

  room.status = 'Cleaning';
  room.guest = null;

  closeRoomModal();
  renderRooms();
  updateKPIs();
  populateBookingRoomOptions();
  showToast(`Guest ${guestName || ''} checked out of Room ${room.number}. Sent to Housekeeping!`, 'success');
}

function handleTableCheckOut(bookingId, roomNumber) {
  const booking = bookings.find(b => b.id === bookingId);
  const room = rooms.find(r => r.number === roomNumber);

  if (booking) booking.status = 'Checked Out';
  if (room) {
    room.status = 'Cleaning';
    room.guest = null;
  }

  renderRooms();
  renderBookings();
  updateKPIs();
  populateBookingRoomOptions();
  showToast(`Check-out completed for ${booking ? booking.guest : 'Guest'}. Room marked for cleaning.`, 'info');
}

function handleTableCheckIn(bookingId, roomNumber) {
  const booking = bookings.find(b => b.id === bookingId);
  const room = rooms.find(r => r.number === roomNumber);

  if (booking) booking.status = 'Checked In';
  if (room) {
    room.status = 'Occupied';
    room.guest = booking ? booking.guest : 'Guest';
  }

  renderRooms();
  renderBookings();
  updateKPIs();
  populateBookingRoomOptions();
  showToast(`Checked in ${booking ? booking.guest : 'Guest'} to Room ${roomNumber}! Keycard issued.`, 'success');
}

/**
 * Reservation Modal Logic
 */
function populateBookingRoomOptions() {
  roomSelectDropdown.innerHTML = '';
  const availableRooms = rooms.filter(r => r.status === 'Available');

  if (availableRooms.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'No available rooms currently';
    roomSelectDropdown.appendChild(opt);
    return;
  }

  availableRooms.forEach(room => {
    const opt = document.createElement('option');
    opt.value = room.number;
    opt.textContent = `Room ${room.number} - ${room.type} ($${room.price}/night)`;
    roomSelectDropdown.appendChild(opt);
  });
}

function openBookingModalWithRoom(roomNumber) {
  populateBookingRoomOptions();
  if (roomNumber) {
    roomSelectDropdown.value = roomNumber;
  }
  bookingModal.classList.add('open');
}

/**
 * Event Listeners & Filter Handlers
 */
function setupEventListeners() {
  // Category Filter Chips
  categoryFilterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      categoryFilterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategoryFilter = chip.getAttribute('data-filter');
      renderRooms();
    });
  });

  // Status Filter Select
  roomStatusFilter.addEventListener('change', (e) => {
    currentStatusFilter = e.target.value;
    renderRooms();
  });

  // Global Search
  globalSearchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderRooms();
    renderBookings(searchQuery);
  });

  // Booking Table Search
  bookingSearchInput.addEventListener('input', (e) => {
    renderBookings(e.target.value.trim());
  });

  // Modal Open / Close
  openBookingBtn.addEventListener('click', () => {
    populateBookingRoomOptions();
    // Default dates to today & tomorrow
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    document.getElementById('check-in-date').value = today;
    document.getElementById('check-out-date').value = tomorrow;
    bookingModal.classList.add('open');
  });

  closeBookingBtn.addEventListener('click', () => bookingModal.classList.remove('open'));
  cancelBookingBtn.addEventListener('click', () => bookingModal.classList.remove('open'));
  roomModalCloseBtn.addEventListener('click', closeRoomModal);

  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === bookingModal) bookingModal.classList.remove('open');
    if (e.target === roomDetailModal) roomDetailModal.classList.remove('open');
  });

  // Form Submit
  newBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('guest-fullname').value;
    const roomNum = document.getElementById('room-select').value;
    const guestsCount = document.getElementById('guest-count').value;
    const checkIn = document.getElementById('check-in-date').value;
    const checkOut = document.getElementById('check-out-date').value;

    if (!roomNum) {
      alert('Please select an available room.');
      return;
    }

    const assignedRoom = rooms.find(r => r.number === roomNum);
    if (assignedRoom) {
      assignedRoom.status = 'Occupied';
      assignedRoom.guest = fullName;
    }

    const newBookingId = `LX-${Math.floor(1000 + Math.random() * 9000)}`;
    const cost = assignedRoom ? `$${(assignedRoom.price * 2).toLocaleString()}.00` : '$600.00';

    bookings.unshift({
      id: newBookingId,
      guest: fullName,
      room: roomNum,
      dates: `${checkIn.slice(5)} to ${checkOut.slice(5)}`,
      guests: guestsCount,
      status: 'Checked In',
      balance: cost
    });

    // Reset & close
    newBookingForm.reset();
    bookingModal.classList.remove('open');

    // Re-render
    renderRooms();
    renderBookings();
    updateKPIs();
    populateBookingRoomOptions();

    showToast(`Reservation ${newBookingId} created for ${fullName}!`, 'success');
  });

  // Mobile navigation drawer toggle
  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Sidebar item click active styling
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      if (tab === 'rooms') {
        document.getElementById('rooms-section').scrollIntoView({ behavior: 'smooth' });
      } else if (tab === 'reservations') {
        document.getElementById('reservations-section').scrollIntoView({ behavior: 'smooth' });
      } else if (tab === 'dashboard') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        showToast(`Navigated to ${btn.querySelector('span').textContent} view`, 'info');
      }
    });
  });
}

/**
 * Toast Notification Helper
 */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconSvg = type === 'success' 
    ? `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-leave');
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', initApp);
