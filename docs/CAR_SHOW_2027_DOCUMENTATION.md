# Car Show Registration System — Frontend Task Official Documentation

**Course:** Integrative Programming 2 / API Backend Development  
**Institution:** Computer Communication Development Institute (CCDI) – Sorsogon Campus  
**Project:** Car Show Registration System – AutoVista Events (Car Show 2027)  
**Location:** Sorsogon City Coliseum  
**Submission Date:** November 2026  
**Instructor:** Elvin Manuel R. Luces, MIT (`cscoo2006@gmail.com` / `vhinle@gmail.com`)  
**Repository URL:** [https://github.com/edmagineva3d/Car-Show-Registration-FULGAR-EDMA](https://github.com/edmagineva3d/Car-Show-Registration-FULGAR-EDMA)  

### Team Members & Roles
- **Frontend Developer:** Gineva Edma (GitHub: `edmagineva3d`, Email: `edmagineva11@gmail.com`)
- **Backend Developer:** Harold Fulgar

---

## Table of Contents
1. [Project Overview & Design Reference Alignment](#1-project-overview--design-reference-alignment)
2. [Application Architecture & Component Hierarchy](#2-application-architecture--component-hierarchy)
3. [Required Project Screenshots & Explanations](#3-required-project-screenshots--explanations)
   - Screenshot 1 – Frontend Folder Structure
   - Screenshot 2 – Full Dashboard with Live C# API Data
   - Screenshot 3 – Loading State & Skeleton Shimmer
   - Screenshot 4 – Search by Participant Name
   - Screenshot 5a – Filter by Registration Type
   - Screenshot 5b – Filter by Status
   - Screenshot 6 – Pagination & Page-Size Selector
   - Screenshot 7 – Empty State
   - Screenshot 8 – Error State
   - Screenshot 9 – Browser DevTools Network Inspection
   - Screenshot 10 – GitHub Commit History
   - Screenshot 11 – Full Application Running
   - Screenshot 12 – Entry Details Modal
   - Screenshot 13 – New Registration Modal
   - Screenshot 14 – Mobile Responsive View
4. [Reflection Answers (Frontend Developer)](#4-reflection-answers-frontend-developer)
   - Reflection 1: Components and State Management
   - Reflection 2: API Communication & Debouncing
   - Reflection 3: User Experience (Loading, Empty, and Error States)
   - Reflection 4: Server-Side vs. Browser-Side Filtering & Pagination
   - Reflection 5: Collaboration, Mocking, and Real API Integration

---

## 1. Project Overview & Design Reference Alignment

The **Car Show Registration System** was developed for AutoVista Events to manage registrations for the 3-day Car Show 2027 at the Sorsogon City Coliseum.

### Visual Identity Alignment (Reference Poster Translation)
Rather than building an ordinary corporate template, the dashboard faithfully adapts the editorial aesthetic of the primary reference image:
- **Pastel Color Harmony:** Soft pastel aqua/mint (`#C7E7E3`), warm cream paper surfaces (`#FAF6EE`), pastel pink highlights (`#FFB7CF`), pale yellow stickers (`#FFF3B0`), and deep charcoal typography (`#1C1C1E`).
- **Typography:** Display headlines and KPI metrics using **Belcons** (`Belcons.woff`), paired with **Inter** (`Inter.woff2` and Google Fonts CDN) for body text, interactive controls, inputs, badges, and registration tables.
- **Tactile Details:** Circular ticket notches, perforated dotted divider lines, solid retro hard drop shadows (`4px 4px 0px #1C1C1E`), tilted sticker labels (`-rotate-3`, `rotate-2`), multi-faceted metallic silver star pins, and retro 8-bit pixel cursors.

---

## 2. Application Architecture & Component Hierarchy

The frontend is structured into modular components:
- `src/api/registrationsApi.js`: Centralized fetch client communicating with the C# .NET 10 backend at `http://localhost:5205`.
- `src/api/sample-data.js`: Standalone dataset containing 25 pre-seeded records matching the exact JSON contract.
- `src/hooks/useDebounce.js`: Custom hook providing a 400ms debounce buffer on text input.
- `src/components/Header.jsx`: Top status ribbon, AutoVista wordmark, navigation tabs, and live backend port badge.
- `src/components/HeroSection.jsx`: Retro ticket hero with metallic star pins, tilted event stickers, and large typography.
- `src/components/KpiCards.jsx` & `KpiCard.jsx`: Summary KPI cards displaying total entries, payments collected, balance due, verified, and on-site checked-in vehicles.
- `src/components/RegistrationFilters.jsx`: Search input with clear button, type select dropdown, status select dropdown, and Clear Filters action.
- `src/components/RegistrationTable.jsx`: Horizontally scrollable data table with formatted currency, dates, vehicle specs, and badge components.
- `src/components/StatusBadge.jsx`: Color-coded status pills (Pending, Confirmed, CheckedIn, Cancelled).
- `src/components/PaymentBadge.jsx`: Color-coded payment badges (Unpaid, Partial, Paid).
- `src/components/Pagination.jsx`: Full pagination suite with page numbers, prev/next buttons, and page size selector (5, 10, 20).
- `src/components/LoadingState.jsx`: Animated spinner and skeleton shimmer rows.
- `src/components/EmptyState.jsx`: Zero-result state with actionable Clear Filters button.
- `src/components/ErrorState.jsx`: Resilient error handling view with Try Again button.
- `src/components/RegistrationDetailsModal.jsx`: Ticket pass modal fetching individual registration by GUID (`GET /api/registrations/{id}`).
- `src/components/NewRegistrationModal.jsx`: Registration submission modal (`POST /api/registrations`) with field-specific 400 and 409 conflict validation feedback.

---

## 3. Required Project Screenshots & Explanations

### Screenshot 1 – Frontend Folder Structure
- **Image:** `docs/screenshots/01-folder-structure.png`
- **Explanation:** This screenshot displays the organized `frontend/src` directory structure. It confirms clean separation of concerns among `api/`, `components/`, `hooks/`, `pages/`, and `utils/`. Reusable UI elements, API consumers, and custom debounce logic reside in distinct files rather than being crowded in `App.jsx`.

### Screenshot 2 – Full Dashboard with Live C# API Data
- **Image:** `docs/screenshots/02-full-dashboard.png`
- **Explanation:** This screenshot captures the complete dashboard running live with data retrieved directly from the C# backend API. It exhibits all five KPI cards loaded from `GET /api/registrations/summary`, the search and filter controls, the data table with status and payment badges, and the active pagination footer. The visual hierarchy directly translates the pastel ticket identity from the reference image.

### Screenshot 3 – Loading State & Skeleton Shimmer
- **Image:** `docs/screenshots/03-loading-state.png`
- **Explanation:** This screenshot illustrates the loading state triggered while registration records are asynchronously fetched from the backend. Instead of an empty or unresponsive screen, the user is presented with a retro loading icon, a friendly status message, and skeleton shimmer rows. This provides immediate visual reassurance that data retrieval is in progress.

### Screenshot 4 – Search by Participant Name
- **Image:** `docs/screenshots/04-search-by-name.png`
- **Explanation:** This screenshot displays the filtered search results after entering a participant query into the search field. The search mechanism utilizes the `useDebounce` hook with a 400ms delay to prevent excessive network requests while typing. The backend returns matching entries, resetting the active page to page 1 as mandated by project requirements.

### Screenshot 5a – Filter by Registration Type
- **Image:** `docs/screenshots/05a-filter-by-type.png`
- **Explanation:** This capture shows the registration list filtered specifically for the "VIP" category via the dropdown menu. The query parameter `type=VIP` is transmitted to `GET /api/registrations`, returning only VIP attendees along with their corresponding ₱5,000 fees and passes. An active filter pill indicator allows the user to see and dismiss the filter at a glance.

### Screenshot 5b – Filter by Status
- **Image:** `docs/screenshots/05b-filter-by-status.png`
- **Explanation:** This screenshot exhibits filtering by registration status set to "Confirmed". The backend query `status=Confirmed` isolates approved attendees ready for Coliseum entry. The table updates dynamically with Confirmed badges and accurate entry counts.

### Screenshot 6 – Pagination & Page-Size Selector
- **Image:** `docs/screenshots/06-pagination-page2.png`
- **Explanation:** This capture demonstrates navigating to Page 2 of the registrations table with a page size of 10. The footer accurately displays the summary "Showing 11–20 of 30 registrations", highlights page button 2 as active, and enables the Previous button while preserving the applied filters.

### Screenshot 7 – Empty State
- **Image:** `docs/screenshots/07-empty-state.png`
- **Explanation:** This screenshot shows the empty state rendered when a search term or filter produces zero matching results from the API. The component displays the required text "No registrations match your filters." alongside an actionable "Clear Filters" button that immediately resets criteria and restores full registration visibility.

### Screenshot 8 – Error State
- **Image:** `docs/screenshots/08-error-state.png`
- **Explanation:** This capture demonstrates the user-friendly error state displayed when the backend API service is stopped or unreachable. Rather than presenting raw, unformatted JSON or broken UI components, a clear explanatory alert informs event staff of the connection status and provides a functional "Try Again" button to re-attempt the connection.

### Screenshot 9 – Browser DevTools Network Inspection
- **Image:** `docs/screenshots/09-browser-devtools-network.png`
- **Explanation:** This screenshot documents the Chrome DevTools Network panel capturing a successful `GET /api/registrations?participantName=&type=&status=&page=1&pageSize=10` HTTP request. It highlights the HTTP 200 OK status code, JSON response headers, and the returned payload containing the items array, totalCount, and totalPages.

### Screenshot 10 – GitHub Commit History
- **Image:** `docs/screenshots/10-github-commit-history.png`
- **Explanation:** This capture displays the Git commit history on the dedicated `frontend` branch under user `edmagineva3d`. It verifies the execution of all required commits in strict chronological order—from scaffolding and sample data to KPI cards, table badges, filtering, pagination, states, and live C# API connectivity.

### Screenshot 11 – Full Application Running
- **Image:** `docs/screenshots/11-running-full-app.png`
- **Explanation:** This capture showcases the live application running in full development harmony: the C# .NET 10 Web API serving endpoints with interactive Scalar documentation alongside the React Vite frontend dashboard.

---

## 4. Reflection Answers (Frontend Developer)

### 1. Components and State Management
> *Question: How did you split the dashboard into components? Which component owns the filter, page and data state, and why did you put it there instead of in the child components?*

**Answer:**  
In architecting the Car Show Registration System, I decomposed the user interface into atomic, focused components adhering to the Single Responsibility Principle. Components such as `KpiCard`, `StatusBadge`, `PaymentBadge`, `Pagination`, `RegistrationFilters`, `LoadingState`, `EmptyState`, and `ErrorState` are purely presentational or state-driven via explicit props. 

The core state—including `searchTerm`, `typeFilter`, `statusFilter`, `page`, `pageSize`, `registrations`, `summary`, and `loading` flags—was lifted to the parent `RegistrationsPage` container. I placed this state in the parent because multiple disparate UI elements depend on the same shared data: when a filter dropdown is modified in `RegistrationFilters`, both the `RegistrationTable` records and the `Pagination` page counter must immediately synchronize and reset to page 1. Storing filter state inside `RegistrationFilters` would create isolated state silos, forcing brittle cross-component event bubbling or prop drilling. By centralizing state management in the page container, data flow remains strictly unidirectional and predictable, ensuring that every user interaction seamlessly propagates updates to all affected subcomponents.

### 2. API Communication & Debouncing
> *Question: Describe step by step what happens from the moment a user types a participant name until the table updates. Why is debouncing the search useful?*

**Answer:**  
When event staff type a letter into the search input (for example, typing the letter "J" in "Juan"), the `onChange` event immediately updates the local `searchTerm` state, rendering the typed letter in the input field without perceptual lag. 

Behind the scenes, the `useDebounce` hook intercepts this rapid state change and starts an internal 400-millisecond timer using `setTimeout`. If the user continues typing "u", "a", and "n" within that 400ms window, the previous timer is cancelled via `clearTimeout` and restarted, preventing premature API calls. Once typing pauses for 400 milliseconds, `debouncedSearch` resolves to "Juan", which triggers the `useEffect` hook in `RegistrationsPage`. 

The hook dispatches an asynchronous HTTP request through `registrationsApi.getRegistrations({ participantName: 'Juan', page: 1, pageSize: 10 })` to `GET http://localhost:5205/api/registrations`. The browser sends the query string, the C# backend processes the SQLite query with case-insensitive filtering, and returns the JSON payload. React receives the resolved promise, updates `registrations`, and the `RegistrationTable` re-renders with the matching records. 

Debouncing is essential because without it, typing a 10-character name would fire 10 simultaneous HTTP requests, flooding the server, causing race conditions where out-of-order responses overwrite later inputs, and degrading device performance.

### 3. User Experience (Loading, Empty, and Error States)
> *Question: Why are loading messages, empty states and error messages important for event staff using this dashboard? Which one did you find hardest to build, and why?*

**Answer:**  
Event staff working at a busy venue like Sorsogon City Coliseum operate under strict time constraints where hundreds of car enthusiasts, exhibitors, and VIPs are arriving at the gates simultaneously. In such an environment, interface ambiguity causes bottlenecks and staff frustration. A visible loading state with skeleton shimmer rows provides immediate feedback that the system is processing an inquiry, preventing impatient staff from repeatedly clicking buttons or refreshing the browser. 

An informative empty state prevents confusion when a search yields zero matches, reassuring staff that the system is functioning correctly while providing a one-click "Clear Filters" button to reset criteria. An error state protects staff by translating technical network failures or server outages into human-readable guidance with a straightforward "Try Again" trigger rather than silently failing or displaying raw stack traces. 

The hardest state to build was the dynamic error handling within the modals and API client, specifically distinguishing between standard HTTP 400 FluentValidation errors (which contain a nested `errors` dictionary of field-specific validation rules) and HTTP 409 Conflict duplicate plate errors. Parsing `ProblemDetails` correctly and mapping server validation errors directly next to their respective form inputs required thorough regex and object normalization to ensure a polished user experience.

### 4. Server-Side vs. Browser-Side Filtering & Pagination
> *Question: Why should filtering, paging and KPI totals come from the API instead of being calculated in React from the rows on screen? What would go wrong with 2,000 registrations?*

**Answer:**  
Performing filtering, paging, and KPI calculations on the backend rather than in the browser is the hallmark of professional software engineering. In an event scenario with 2,000 or more vehicle registrations, fetching the entire unpaged database over the network would transfer megabytes of unnecessary JSON payload, consuming user bandwidth and causing unacceptable initial load times. 

Furthermore, if the browser attempted to calculate KPI cards (such as total collected revenue or confirmed attendees) solely from the 10 rows currently rendered on screen, the dashboard would display grossly inaccurate figures representing only a tiny fraction of the event's actual status. 

Running search algorithms across 2,000 complex objects in client-side JavaScript consumes significant mobile CPU and memory, causing frame drops and battery drain on event staff tablets. By contrast, a relational database like SQLite indexes fields and performs pagination queries (`LIMIT 10 OFFSET 0`) in sub-milliseconds on the server, transferring only the necessary 10 records while computing aggregate KPI sums directly in SQL (`SUM(AmountPaid)`). This guarantees sub-second responsiveness regardless of whether there are 25 or 25,000 registrations.

### 5. Collaboration, Mocking, and Real API Integration
> *Question: How did building with sample-data.js first help you work in parallel with your Backend Developer? Describe one problem you hit when you switched to the real API (CORS, field names, enum values, dates, …) and how you fixed it.*

**Answer:**  
Developing the complete UI against `sample-data.js` first allowed the frontend development workflow to progress rapidly without being blocked by backend database migrations, endpoint implementation, or server setup. Because both developers agreed beforehand on the strict JSON contract documented in the project requirements, I was able to build and verify KPI cards, debounced filtering, multi-page pagination, and status badges against 25 realistic mock records. 

When switching from `sample-data.js` to the live C# API in `registrationsApi.js`, the primary challenge encountered was handling date formatting and time zones. The C# backend serialized UTC timestamps into ISO 8601 strings (`2027-02-10T08:30:00Z`). On machines in different local time zones (such as UTC+8 in the Philippines), raw JavaScript `new Date()` calls exhibited off-by-hours variations depending on whether UTC methods or local methods were invoked. 

I resolved this by writing a robust date formatting utility in `src/utils/formatters.js` that explicitly utilizes UTC getters (`getUTCFullYear()`, `getUTCMonth()`, `getUTCDate()`, `getUTCHours()`) to construct formatted date strings matching the exact specification `"Feb 10, 2027 08:30 AM"`. Additionally, configuring CORS policies on the backend to permit Vite origins (`http://localhost:5173`) ensured seamless cross-origin communication between the React client and the .NET 10 API.
