# AutoVista Events — Car Show 2027 Registration System (Frontend)

Welcome to the frontend application for the **Car Show Registration System**, created for **AutoVista Events – Car Show 2027** held at the **Sorsogon City Coliseum**.

This web dashboard is built with **React.js**, **Vite**, **Tailwind CSS**, and **Lucide React**. It features a retro-editorial event design inspired by modern creative conference visual identities, combining pastel aqua backgrounds, warm cream ticket panels, pastel pink highlights, metallic silver stars, bold retro typography, and micro-interactions.

---

## 🚀 Technologies Used

- **Framework:** React.js 19
- **Bundler & Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 & Custom CSS3 animations
- **Icons:** Lucide React
- **Typography:** Archivo Black, Space Grotesk, DM Sans, Playfair Display (Google Fonts)
- **Architecture:** Component-driven, Custom React Hooks (`useDebounce`), Clean REST API Client

---

## 📁 Project Structure

```
frontend/
├── public/
│   ├── favicon.svg              # Event ticket/car SVG favicon
│   └── ...
├── src/
│   ├── api/
│   │   ├── registrationsApi.js  # Live REST API client (fetch wrapper & error handling)
│   │   └── sample-data.js       # 25 pre-seeded offline sample records & mock functions
│   ├── components/
│   │   ├── EmptyState.jsx       # "No registrations match your filters" state
│   │   ├── ErrorState.jsx       # Friendly "Cannot reach the API" error state
│   │   ├── Header.jsx           # Top ribbon, brand wordmark, tab navigation, quick actions
│   │   ├── HeroSection.jsx      # Ticket stub hero, editorial headline, metallic star pins
│   │   ├── KpiCard.jsx          # Reusable pastel KPI ticket card
│   │   ├── KpiCards.jsx         # Summary KPI cards row (Registrations, Payments, Due, Confirmed, Checked In)
│   │   ├── LoadingState.jsx     # Shimmer skeleton loader and retro spinner
│   │   ├── NewRegistrationModal.jsx # Form calling POST /api/registrations (400 validation & 409 duplicate plate)
│   │   ├── Pagination.jsx       # Prev/Next, page numbers, page size selector, "Showing x–y of N"
│   │   ├── PaymentBadge.jsx     # Unpaid (Red), Partial (Amber), Paid (Green) badges
│   │   ├── RegistrationDetailsModal.jsx # Full entry pass popup using GET /api/registrations/{id}
│   │   ├── RegistrationFilters.jsx # Debounced search, Type filter, Status filter, Clear filters
│   │   ├── RegistrationTable.jsx # Scrollable, responsive table with all required columns
│   │   └── StatusBadge.jsx      # Pending, Confirmed, CheckedIn, Cancelled badges
│   ├── hooks/
│   │   └── useDebounce.js       # 400ms debounce hook for search input
│   ├── pages/
│   │   └── RegistrationsPage.jsx # Core registration dashboard layout & state management
│   ├── utils/
│   │   └── formatters.js        # Philippine Peso (₱) and date formatting helpers
│   ├── App.jsx                  # Main application root
│   ├── index.css                # Tailwind imports, retro shadows, animations, reduced motion
│   └── main.jsx                 # React root DOM rendering
├── .env.development             # Development environment configuration
├── index.html                   # HTML entry point with Google Fonts
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite configuration with Tailwind CSS plugin
└── README.md                    # Frontend documentation
```

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v18.0 or higher recommended)
- **npm** or yarn package manager
- **.NET 10 SDK** (to run the C# backend API)

### 1. Install Dependencies
Open your terminal, navigate to the `frontend` folder, and run:

```bash
cd frontend
npm install
```

### 2. Configure the Backend API Base URL
The backend API URL is configured in `frontend/.env.development`:

```env
VITE_API_BASE_URL=http://localhost:5205
```

If your backend is hosted on a different port or domain, update this variable accordingly.

---

## 💻 How to Run the Application

### Running with the Real C# API (Recommended)

1. **Start the C# Backend:**
   Open a separate terminal in the `backend/` folder and start the API:
   ```bash
   cd backend
   dotnet run --project Api
   ```
   The backend will listen on `http://localhost:5205` and serve the API documentation at `http://localhost:5205/scalar/v1`.

2. **Start the Frontend Development Server:**
   In another terminal, start the Vite dev server:
   ```bash
   cd frontend
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 🔄 Switching Between Sample Data and Real C# API

The project is designed with complete parity between the offline sample dataset (`src/api/sample-data.js`) and the live C# backend (`src/api/registrationsApi.js`).

Both modules export the identical function signatures:
- `getRegistrations({ participantName, type, status, page, pageSize })`
- `getSummary()`
- `getRegistrationById(id)`

### To Switch to Offline Sample Data:
In `frontend/src/pages/RegistrationsPage.jsx`, change the import at the top:

```javascript
// Switch from:
import { getSummary, getRegistrations, BASE_URL } from '../api/registrationsApi'

// To:
import { getSummary, getRegistrations } from '../api/sample-data'
const BASE_URL = 'http://localhost:5205'
```

### To Switch to the Live C# REST API:
Ensure the import in `frontend/src/pages/RegistrationsPage.jsx` points to `registrationsApi.js`:

```javascript
import { getSummary, getRegistrations, BASE_URL } from '../api/registrationsApi'
```

---

## 📊 Implemented Deliverables

1. **KPI Cards (5+):**
   - Total Registrations (`totalRegistrations`)
   - Total Payments (`totalPayments` in ₱)
   - Uncollected Payments (`uncollectedPayments` in ₱)
   - Confirmed Registrations (`confirmed`)
   - Checked In Registrations (`checkedIn`)
2. **Debounced Search & Filters:**
   - Participant name search debounced to ~400ms.
   - Registration Type dropdown (`All`, `Exhibitor`, `Competitor`, `VIP`).
   - Registration Status dropdown (`All`, `Pending`, `Confirmed`, `CheckedIn`, `Cancelled`).
   - Clear Filters button that resets all filters and returns to page 1.
3. **Paging:**
   - Previous / Next buttons with boundary disabling.
   - Page numbers with active indicator.
   - Page-size selector (5, 10, 20).
   - "Showing x–y of N" summary.
4. **Usability & UX States:**
   - Skeleton loading rows and animated spinner.
   - Empty state with dedicated Clear Filters trigger.
   - Error state with Try Again mechanism.
5. **Bonus Capabilities:**
   - Detailed entry pass modal (`GET /api/registrations/{id}`).
   - New registration submission (`POST /api/registrations`) with field-specific 400 validation error handling and 409 duplicate plate conflict feedback.
   - Reduced-motion accessibility.
