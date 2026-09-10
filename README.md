# Eternal Lives — Historical Memorial Sanctuary & Archive

> *"Every life leaves a story. Visit the resting places of remarkable people, discover their stories, and be inspired by their words."*

**Eternal Lives** is an online digital memorial sanctuary where visitors can explore the resting places, graves, biographies, and words of figures throughout history. Crafted with an aesthetic of deep forest greens, warm ivory, charcoal, and subtle gold accents, the application presents a dignified archive rather than a generic database.

---

### Key Features

* **Cinematic Historical Memorials**: Digital memorial pages for each historical luminary featuring grave photography, biographical chronicles, quotes, resting place coordinates, and interactive maps.
* **OpenStreetMap & Leaflet Integration**: Interactive maps displaying grave markers, coordinates, and directions for each cemetery.
* **Multi-Layer Category Exploration**: Discover figures across Scientists, Writers, Artists, Leaders, Musicians, Actors, and Philosophers with dynamic grave counts.
* **Full-Text Archival Search**: Dedicated search route (`/search?q=`) with real-time matching, query highlighting, and quick example pills.
* **Verified Quotations Engine**: Verified citations with historical context and archival verification badges.
* **Lightbox Visual Gallery**: High-resolution photography lightbox for cemetery monuments and historical archives.
* **Personal Memorial Registry (Favorites)**: Authenticated visitors can bookmark and maintain their personal collection of honored luminaries.
* **Community Custodianship (Contributions)**: Public submission workflow for suggesting missing graves, new luminaries, photographic sources, and citation corrections.
* **Archivist Admin Control Panel**: Administrative CRUD interface (`/admin`, `/admin/people`, `/admin/graves`, `/admin/quotes`, `/admin/contributions`) with moderation workflows.
* **SEO & OpenGraph Metadata**: Dynamic per-page titles, descriptions, and Open Graph tags.

---

### Tech Stack

* **Core**: React 18, TypeScript, Vite
* **Routing**: React Router DOM (v6)
* **Data Fetching & State**: TanStack Query (React Query v5)
* **Styling**: Tailwind CSS with custom palette (Forest, Charcoal, Ivory, Stone, Gold)
* **Typography**: Google Fonts (*Cormorant Garamond*, *Cinzel*, *Inter*, *Playfair Display*)
* **Mapping**: Leaflet & React-Leaflet (OpenStreetMap & CARTO Voyager tiles)
* **Icons**: Lucide React
* **Metadata**: React Helmet Async

---

### Quick Start

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
VITE_API_URL=/api
```

#### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### 4. Build for Production
```bash
npm run build
```

---

### Demo Accounts

For testing authentication, the login page features quick one-click demo logins:

* **Archivist Administrator**: `admin@eternallives.org` (Full access to `/admin` dashboard and moderation)
* **Sanctuary Custodian / Visitor**: `visitor@eternallives.org` (Bookmark favorites and manage profile)

---

### Architecture & Folder Structure

```
src/
├── api/             # Modular API layer (people, categories, graves, quotes, auth, search, admin)
├── components/
│   ├── admin/       # Admin table and modal forms (PersonForm, GraveForm, QuoteForm)
│   ├── auth/        # LoginForm, RegisterForm, Route guards
│   ├── categories/  # CategoryCard, CategoryHero
│   ├── common/      # Header, Footer, SearchBar, Map, Lightbox, Modal, Pagination, SEO
│   ├── graves/      # GraveLocation, GraveCard
│   ├── layout/      # Sanctuary Layout, AdminLayout
│   ├── people/      # PersonHero, PersonCard, BiographySection, PhotoGallery, RelatedPeople
│   └── quotes/      # QuoteCard, QuotesSection
├── config/          # Media config (CDN ready) & Seed archival dataset
├── context/         # AuthContext & FavoritesContext
├── hooks/           # TanStack Query custom hooks (usePeople, useGraves, useSearch, etc.)
├── lib/             # Utils, Storage, QueryClient configuration
├── pages/           # HomePage, ExplorePage, PersonPage, CategoryPage, SearchPage, Admin pages...
├── routes/          # AppRoutes with React.lazy code-splitting
├── types/           # TypeScript interfaces & domain models
├── App.tsx          # App entry with Providers
└── main.tsx         # DOM initialization
```
