# Campus Lost & Found – Frontend

[![CI](https://github.com/yermokurt/itelect4-project/actions/workflows/ci.yml/badge.svg)](https://github.com/yermokurt/itelect4-project/actions/workflows/ci.yml)

A campus-wide Lost & Found tracker where students can report items they have lost or found, submit claims, and receive AI-generated feedback. Administrators can verify claim requests and update item statuses.

## Live Links

| | URL |
|---|---|
| **Frontend** | https://yermo-itelect4-project.vercel.app |
| **Backend API** | https://yermo-itelect4-backend.vercel.app |
| **Backend Repo** | https://github.com/yermokurt/itelect4-backend |

## Tech Stack

- React 19 + TypeScript
- Vite 8 (bundler)
- Tailwind CSS 4
- TanStack Query (server-state)
- Zustand (client-state)
- React Hook Form + Zod (forms & validation)
- React Router DOM v7

## Architecture

```
┌─────────────────────────────────────┐
│              Browser                │
│  React + Vite + Tailwind CSS        │
│  ┌──────────┐  ┌─────────────────┐  │
│  │  Zustand │  │ TanStack Query  │  │
│  │  (auth,  │  │ (server cache)  │  │
│  │   UI)    │  └────────┬────────┘  │
│  └──────────┘           │           │
└───────────────────────────────────┬─┘
                                    │ fetch / JWT
                          ┌─────────▼──────────┐
                          │  Express + MongoDB  │
                          │  (itelect4-backend) │
                          └────────────────────┘
```

## Local Setup

### Prerequisites

- Node.js ≥ 20
- A running instance of [itelect4-backend](https://github.com/yermokurt/itelect4-backend)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/yermokurt/itelect4-project.git
cd itelect4-project

# 2. Install dependencies
npm install

# 3. Create environment file
echo "VITE_API_URL=http://localhost:4000" > .env.local

# 4. Start the development server
npm run dev
```

Open http://localhost:5173 in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm test` | Run all Vitest tests (verbose) |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Testing

Tests use **Vitest**, **@testing-library/react**, and **jsdom**.

```bash
npm test
```

Three test suites are included:

| File | What it tests |
|---|---|
| `src/test/ItemCard.test.tsx` | Component: renders title, location, status badge; hides description in compact mode |
| `src/test/useToggle.test.ts` | Custom hook: initial value, toggle flip, double-flip |
| `src/test/LoginPage.test.tsx` | Form validation: empty email, missing password – verifies no `fetch` is called |

## UI Pages

- Login Page
![alt text](UI%20Screenhots/image.png)

- Dashboard Page
![alt text](UI%20Screenhots/image-1.png)

- Items Page
![alt text](UI%20Screenhots/image-2.png)

- Item Details Page
![alt text](UI%20Screenhots/image-3.png)

- Not Found Page
![alt text](UI%20Screenhots/image-4.png)

## Types and Interfaces Used

- **Interfaces:** `User`, `Item`, `Claim`, `ApiResponse`
- **Enum:** `ItemStatus` (LOST, FOUND, CLAIMED)
- **Generics:** `getLatestEntry<T>`, `getById<T>`
- **Utility types:** `Partial`, `Pick`, `Omit`, `Record`

## AI-Use Disclosure

Created with the help of Claude Sonnet 4.6 Model through the Antigravity CLI