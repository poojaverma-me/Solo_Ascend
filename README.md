# Solo Ascend - System HUD Habit Tracker

## Project Overview
**Solo Ascend** is a gamified habit tracker and productivity dashboard inspired by the "System" interface from the *Solo Leveling* manhwa. It transforms daily tasks into quests, tracks progression with XP and levels, and provides an immersive "Player" experience with high-end, futuristic UI aesthetics.

## Tech Stack
*   **Framework**: [React](https://react.dev/) (v18+)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: 
    *   [Tailwind CSS](https://tailwindcss.com/) (v4.0 Alpha) - Utility-first styling.
    *   **Custom CSS Variables** - For theming (`index.css`).
*   **Animation**: [Framer Motion](https://www.framer.com/motion/) - For smooth transitions and micro-interactions.
*   **Icons**: [Lucide React](https://lucide.dev/) - Consistent, crisp SVG icons.
*   **Date Management**: [date-fns](https://date-fns.org/) - Robust date utility library.
*   **State Management**: React `useState`, `useEffect`, `Context API`.
*   **Persistence**: `localStorage` - Browser-based data persistence.

## Features
### 1. Gamified Progression
*   **XP System**: Earn XP for completing daily habits ("Quests").
*   **Leveling**: Level up based on accumulated XP with dynamic rank titles (e.g., E-Rank Hunter to S-Rank).
*   **Rank Promotion**: Special visual indicators for reaching major milestones.

### 2. "System" Aesthetics
*   **Immersive HUD**: Glass-morphism, glowing borders, and futuristic typography (`Space Grotesk`).
*   **Dark/Light Mode**: Fully themable interface. Dark mode features "Obsidian" and "Electric Purple" accents; Light mode uses high-contrast slate colors.
*   **Micro-Animations**: Hover glows, smooth entrances, and layout transitions.

### 3. Dashboard Core
*   **Weekly Ascension**: 7-day visualization of task completion rates using a bar chart style.
*   **Daily Quests**: Interactive checklist for daily habits.
*   **Player Attributes**: Customizable RPG stats (Strength, Intelligence, etc.) that can be leveled up.
*   **Sovereign Advisor**: An AI-persona chatbot (psychologist/motivator) that provides feedback on progress.

### 4. Data Management
*   **Local Storage**: All data (user profile, quests, history) is saved locally to the browser.
*   **Account Management**: Users can edit their "Player Name", "Credentials" (Bio), and "Manifestation Goals".
*   **History Tracking**: Calendar view to revisit past performance.

## Developer Notes

### Project Structure
```
src/
├── components/
│   ├── Dashboard.jsx       # Main application hub (Stats, Quests, Attributes)
│   ├── Login.jsx           # Entry point / Authentication simulation
│   ├── Onboarding.jsx      # Initial user setup (Name, Stats selection)
│   ├── LandingPage.jsx     # (New) Marketing/Intro page
│   ├── History.jsx         # Calendar history view
│   ├── SystemAdvisor.jsx   # Chatbot component
│   └── ThemeContext.jsx    # Dark/Light mode context provider
├── App.jsx                 # Main routing and state logic
├── index.css               # Global styles, Tailwind directives, Custom fonts
└── main.jsx                # Application root
```

### Key Implementation Details
*   **Tailwind v4**: This project uses the latest Tailwind v4 alpha. Configuration is handled directly in CSS using `@theme` and `@variant` directives in `src/index.css`.
*   **Dynamic Class Names**: We use a `cn()` utility (wrapping `clsx` and `tailwind-merge`) to handle conditional class application, essential for the complex dark/light mode logic.
*   **Responsive Design**: The dashboard is fully responsive, shifting from a grid layout on desktop to a stacked linear layout on mobile.

## How to Run Locally

1.  **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed (v16 or higher).
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Start Development Server**:
    ```bash
    npm run dev
    ```
4.  **Open in Browser**: Navigate to the URL shown in the terminal (usually `http://localhost:5173/`).

## Future Roadmap (Potential)
*   **Backend Integration**: Move from `localStorage` to a database (Supabase/Firebase) for cross-device sync.
*   **Social Features**: "Guilds" or "Parties" for group habit tracking.
*   **Advanced Analytics**: More detailed graphs for attribute growth over time.
