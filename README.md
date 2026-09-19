# Avani Green Solar

Avani Green Solar is a React/Vite frontend backed by an Express/MongoDB API.

## Project structure

```text
src/
  components/       Reusable React UI
  context/          Frontend state and API orchestration
  pages/            Public and admin screens
  services/         Frontend API client
  stylesheets/
    frontend/       Global and page-scoped frontend CSS
server/
  config/           Database and external-service configuration
  middleware/       Express middleware
  models/           MongoDB/Mongoose models
  routes/           API route handlers
  seed/             Database seed data
```

All business data is read from MongoDB through `/api` endpoints. The frontend does
not use demo records or localStorage as a data store; localStorage is used only
for the JWT authentication token.

## Development

Create `.env` from `.env.example`, configure `MONGODB_URI`, then run:

```bash
npm install
npm run dev
```

The Vite development server runs the frontend and proxies `/api` requests to the
Express server on port 5000.
