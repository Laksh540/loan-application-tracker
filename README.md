# Loan Application Tracker

A React + TypeScript + Vite application for reviewing and managing loan applications.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Vitest

## Prerequisites

- Node.js **v22.22.3**
- npm (included with Node.js)

## Installation

```bash
git clone <repository-url>
cd loan-application-tracker
cp .env.example .env
npm install
```

## Run the project

```bash
npm run dev
```

The app will be available at the local Vite development URL shown in the terminal (typically `http://localhost:5173`).

## Testing

Run all unit and component tests:

```bash
npm test
```

## Project Structure

```text
src/
├── components/     # Reusable UI components
├── data/           # Mock loan application dataset
├── pages/          # Route-level pages
├── router/         # Centralized React Router configuration
├── services/       # Mock API layer
├── types/          # Shared TypeScript types
├── utils/          # Status rules and helpers
└── test/           # Test setup
```

The project separates UI, data, business logic, and types so each concern is easier to maintain and test. Route pages handle page composition, components remain reusable, the service layer isolates data access, and the centralized utilities keep business rules independent of the UI.

## Status Transition Rules

Application status transitions are centralized in `src/utils/statusRule.ts`.

The application follows a forward-only workflow:

`submitted → under_review → approved`

`submitted → under_review → rejected`

Backward transitions, skipped statuses, and changes from `approved` or `rejected` are not allowed.

The `canTransition` utility is used by the application detail page to enforce these rules consistently.