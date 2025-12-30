# JATASHANKAR THAKUR SMARITI SEVA SANSTHAN - System Documentation

## 1️⃣ High-Level Overview

### What problem this website solves
This website serves as the digital presence for **Jatashankar Thakur Smariti Seva Sansthan**, a Non-Governmental Organization (NGO) based in Bihar, India. It solves the problem of:
- **Transparency**: Publicly displaying legal registration details, governing body members, and operational areas.
- **Outreach**: informing the public about social welfare activities, mission, and vision.
- **Accessibility**: Providing content in both **English** and **Hindi** to reach a broader demographic.
- **Engagement**: Offering clear channels for volunteers and donors to contact the organization.

### Who the target users are
1.  **General Public**: People seeking information about the NGO's work.
2.  **Beneficiaries**: Individuals in Bihar looking for social welfare support.
3.  **Volunteers/Donors**: Individuals looking to collaborate or support the cause.
4.  **Government/Regulatory Bodies**: Officials verifying the NGO's legitimacy and compliance.

### Overall System Architecture
- **Frontend**: A Single Page Application (SPA) built with **React** and **TypeScript**, serving a responsive and interactive UI.
- **Backend**: Currently operates as a static client-side application. Dependencies for **Express** and **OpenAI** are present, indicating readiness for future server-side features (e.g., AI chatbots, contact form handling).
- **Database**: Content is currently static, managed via a dedicated `translations.ts` file for bilingual support. No external database is currently connected.
- **APIs**: The app is designed to consume APIs (e.g., OpenAI) but primarily relies on internal data structures.

### Why this architecture was chosen
- **Performance**: SPAs load once and transition smoothly, providing a app-like feel essential for modern web standards.
- **Simplicity**: Static content management (`translations.ts`) eliminates the need for complex CMS overhead for a brochure-style site.
- **Scalability**: The React component structure allows for easy addition of new pages and features.
- **Type Safety**: TypeScript ensures code reliability and easier maintenance.

---

## 2️⃣ Frontend Architecture (UI / UX)

### a) Technology Stack

| Technology | Purpose | Why it was chosen |
| :--- | :--- | :--- |
| **React (v19)** | UI Library | Component-based, efficient re-rendering, vast ecosystem. |
| **Vite** | Build Tool | Extremely fast development server and optimized production builds. |
| **TypeScript** | Language | Adds static typing to JavaScript, reducing bugs and improving developer experience. |
| **Tailwind CSS** | Styling | Utility-first CSS for rapid, consistent, and responsive design without writing custom CSS files. |
| **Framer Motion** | Animation | Powerful library for complex animations, page transitions, and gestures. |
| **React Router** | Navigation | Standard routing library for React SPAs, enabling seamless client-side navigation. |
| **Lucide React** | Icons | Clean, lightweight, and consistent SVG icons. |

### Folder Structure & Responsibilities
- `src/` (Root)
  - `components/`: Reusable UI blocks.
    - `ui/`: Generic, atomic components (e.g., `FadeIn`, `PageTransition`).
    - `Navbar.tsx`, `Footer.tsx`: Layout components.
  - `pages/`: Full-page views (e.g., `Home.tsx`, `Contact.tsx`).
  - `contexts/`: Global state providers (`LanguageContext`).
  - `constants.ts`: Global constants (Nav items, Organization name).
  - `translations.ts`: Dictionary for English/Hindi content.
  - `App.tsx`: Main application wrapper and layout.
  - `index.tsx`: Entry point.

### b) UI Components (Detailed Breakdown)

#### `AnimatedRoutes` (in `components/`)
- **Purpose**: Manages routing and handles the specific logic for fading contents in and out when switching pages or languages.
- **Props**: None.
- **Internal State**: Uses `useLocation` to track route changes and `useLanguage` to re-trigger animations on language switch.
- **Interaction**: Wraps standard `Routes` in `AnimatePresence` and `PageTransition`. "Freezes" the language context during exit animations so text doesn't swap prematurely.

#### `Navbar` (in `components/`)
- **Purpose**: Top navigation bar with branding, links, and language toggle.
- **Props**: None.
- **Internal State**: `isOpen` (boolean) for mobile menu toggle.
- **Rendering**: Sticky header. Responsive design (hamburger menu on mobile, horizontal list on desktop).
- **Interactions**: Toggles language via `useLanguage` context. Opens/closes mobile drawer.

#### `PageTransition` (in `components/ui/`)
- **Purpose**: Wrapper component that applies entry/exit animations to pages.
- **Props**: `children` (ReactNode).
- **Rendering**: Uses `motion.div` to animate opacity and Y-position.
- **Logic**: Keyed by route path (and language) to trigger unmount/mount animations on change.

#### `FadeIn` (in `components/ui/`)
- **Purpose**: Applies a scroll-triggered fade animation to any content.
- **Props**: `direction` ('up', 'down', 'left', 'right'), `delay`, `duration`, `children`.
- **Rendering**: Uses `framer-motion`'s `useInView` to detect visibility and trigger animation variants.

#### `Home` (in `pages/`)
- **Purpose**: Landing page.
- **Components**: Hero section (parallax background), Feature cards (Social Welfare, Integrity, Compassion), Call to Action.
- **Content**: Dynamic based on selected language.

---

## 3️⃣ Styling & Design System

### Technology: Tailwind CSS
- **Usage**: utility classes directly in JSX (e.g., `bg-emerald-900 text-white`).
- **CDN**: Loaded via `<script src="https://cdn.tailwindcss.com"></script>` in `index.html`.

### Color System
- **Primary**: Emerald Green (`emerald-900` to `emerald-50`). Represents growth, nature, and harmony.
- **Secondary**: Blue & Rose acccents (`blue-600`, `rose-600`) for specific feature cards to add vibrancy.
- **Neutral**: Slate/Gray (`slate-800`, `gray-50`) for text and backgrounds.

### Typography
- **Headings**: `Oswald` (Google Font) - Uppercase, bold, authoritative.
- **Body**: `Roboto` (Google Font) - Clean, readable, modern.

### Responsiveness
- **Mobile-First**: Designs start for mobile and scale up.
- **Breakpoints**: `md` (768px), `lg` (1024px), `xl` (1280px).
- **Example**: `grid-cols-1 md:grid-cols-3` (1 column on mobile, 3 on desktop).

---

## 4️⃣ State Management & Data Flow

### Global State: `LanguageContext`
- **Purpose**: Manages the current active language ('en' | 'hi').
- **Implementation**: React Context API.
- **Persistence**: Saves language preference to `localStorage` so it persists on reload.
- **Functions**: `toggleLanguage()` swaps between English and Hindi.

### Data Flow
1.  **Initialization**: `App.tsx` wraps the tree in `LanguageProvider`.
2.  **Consumption**: Components (e.g., `Home.tsx`, `Navbar.tsx`) call `useLanguage()`.
3.  **Data Retrieval**: Components import `translations` object and select the sub-object based on language (`const t = translations[language]`).
4.  **Updates**: When `toggleLanguage` is called, `LanguageContext` updates. All consumers re-render with the new text. `AnimatedRoutes` forces a remount of the page component to play animations.

---

## 5️⃣ Backend (Future/Simulated)

### Current Status
- The application primarily runs client-side. The `server` folder is prepared for future backend logic.

### Potential Backend (Node.js + Express)
- **Framework**: Express.js.
- **Role**:
    - Serve API endpoints for contact forms (`/api/contact`).
    - Proxy requests to OpenAI for AI features.
    - Serve the production build of the React app.

---

## 6️⃣ Database Layer

### Current Implementation: Static
- **Storage**: `translations.ts` acts as a read-only database for content.
- **Schema**: JSON-like structure with nested keys for pages and sections (e.g., `home.heroTitle`).

### Future Implementation
- **Type**: NoSQL (MongoDB) would fit well for storing flexible content structures or contact form submissions.

---

## 7️⃣ Security & Privacy

### Current Measures
- **Sanitization**: React automatically escapes content, preventing XSS (Cross-Site Scripting) in most cases.
- **Environment Variables**: API keys (e.g., for Gemini/OpenAI) are loaded via `import.meta.env` (Vite) and should strictly be kept in `.env` files, never committed to Git.
- **CSP**: `Content-Security-Policy` meta tag in `index.html` restricts where scripts and styles can load from (protects against malicious injections).

---

## 8️⃣ Performance & Optimization

### Strategies
- **Lazy Loading**: (Recommended) Use `React.lazy` and `Suspense` for pages to split the bundle. Currently, standard imports are used, but Vite handles tree-shaking well.
- **Asset Optimization**:
    - Fonts loaded from Google Fonts CDN (optimized).
    - Tailwind loaded via CDN (fast, cached).
- **Virtual DOM**: React's diffing algorithm ensures only changed parts of the DOM update.
- **Scroll Performance**: Custom scrollbar and smooth scroll behaviors are CSS-accelerated.

---

## 9️⃣ Deployment & DevOps

### Build Process
1.  **Command**: `npm run build` runs `vite build`.
2.  **Output**: Generates a `dist/` folder containing:
    - `index.html` (entry).
    - `assets/` (bundled JS and CSS with hashes for cache busting).
3.  **Optimization**: Vite minimizes code (terser/esbuild) and splits chunks (`vendor` chunk for React dependencies).

### Deployment
- **Platform**: Static hosting (Vercel, Netlify, GitHub Pages).
- **Flow**: Connect generic Git repository -> New Commit -> Auto-Build -> Deploy.

---

## 🔁 10️⃣ Complete User Flow Walkthrough

### Scenario: A User Visits and Switches Language

1.  **Access**: User visits `https://domain.com`.
2.  **Load**: Browser fetches `index.html`, then loads the JS bundle.
3.  **Hydration**: React boots up, `LanguageProvider` checks `localStorage`. Finds nothing, defaults to 'en'.
4.  **Rendering**: `App` renders. `AnimatedRoutes` determines the URL is `/`. `Home` component mounts.
5.  **Animation**: `PageTransition` mounts. `framer-motion` plays the `initial` -> `animate` opacity fade-in.
6.  **Interaction**: User clicks the "Hindi" button in the Navbar.
7.  **State Update**: `toggleLanguage` runs. `language` state becomes 'hi'.
8.  **Reaction**:
    - `Navbar` re-renders immediately with Hindi text using `translations['hi']`.
    - `AnimatedRoutes` detects `language` change. It changes the `key` of `PageTransition`.
9.  **Transition Logic**:
    - The *Old* `PageTransition` (English) begins its `exit` animation (fade out).
    - *Crucially*, the old component is wrapped in a frozen Context Provider, so it **stays in English** while fading out.
    - The *New* `PageTransition` (Hindi) mounts and begins its `enter` animation (fade in).
10. **Result**: The user sees the English page fade away, followed by the Hindi page fading in.

---

## 📘 11️⃣ Learning Mode: Concepts Simplified

### 🏗️ Components are like "Lego Blocks"
Imagine building a house with Legos. You have special blocks for windows (`Navbar`) and doors (`Footer`). You don't build a new window every time; you just reuse the window block. Use props to say "This window is blue" or "This window is red".

### ⚡ State is like "Short-term Memory"
If you tell the website "I want Hindi", it needs to remember that. This is **State**. If you refresh the page and it forgets, that's bad. So we write it to `localStorage` (like a notepad) so it remembers even after a nap (refresh).

### 🚦 Routing is like a "Traffic Cop"
When you click "About Us", the router sees the URL change to `/about`. It tells the generic "Page Display" area: "Hey, stop showing the Home screen, switch to the About screen!" It does this without refreshing the whole browser, making it fast.

### 🎨 Tailwind is like "Stickers"
Instead of writing a long rulebook (CSS file) that says "All buttons must be blue, round, and large", you just stick labels on the button: `bg-blue-500` (Blue), `rounded-full` (Round), `text-lg` (Large). It's faster and easier to read.

### 🎬 Framer Motion is the "Movie Director"
It tells elements how to enter the stage. "Don't just appear! Slide in from the left and fade in slowly." It adds polish and makes the app feel premium.

---

## 🚀 How to Run Locally

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm run dev
    ```
4.  **Open browser**:
    Navigate to `http://localhost:5173` (or the port shown in terminal).
