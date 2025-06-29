Project Structure Plan for Personalized Content Dashboard

src/
├── app/                # Next.js app directory (routing, layout, pages)
├── components/         # Reusable UI components (Card, Sidebar, Header, etc.)
├── features/           # Redux slices and feature logic (preferences, feed, favorites, etc.)
├── hooks/              # Custom React hooks
├── services/           # API service logic (RTK Query endpoints)
├── utils/              # Utility functions (debounce, localStorage helpers, etc.)
├── styles/             # Tailwind config, global styles, custom CSS

public/                 # Static assets (images, icons, etc.)
tests/                  # Unit, integration, and E2E tests

# Each folder will be created as needed during implementation. 