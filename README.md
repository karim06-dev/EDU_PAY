# EduPay Connect — React/Vite MVP

This is the React/Vite project created from the existing `EduPay_MVP_v2_3.jsx` code.

## Requirements

- Node.js 20+ recommended
- npm

## Run locally

Open a terminal in this folder and run:

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite (normally `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Important

The current payment actions are demo/simulation logic. They do not move real money or connect to CRDB, NMB, Amana Bank, M-Pesa, Airtel Money, Tigo/Yas, or HaloPesa APIs. Real integrations should be implemented through a secure backend, with provider credentials stored server-side.

## Security note

Do not put bank API keys, mobile-money secrets, JWT signing secrets, or other private credentials in React/Vite client code or `VITE_*` variables. Anything bundled into the frontend can be exposed to users.
