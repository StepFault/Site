# Tests

## Current state

- **Python tests** in `test_api/` target a **FastAPI** app (`src.api.main`). They expect a `src/api/main.py` application. If this repo no longer contains that backend (e.g. the app is Next.js-only), these tests will fail on import. To run them you would need to restore or point to the FastAPI app.
- **Next.js API**: The live contact API is implemented in **Next.js** (`app/api/contact/route.ts`). There are no automated tests for it in this repo. Consider adding tests with **Vitest** (or similar) that call the route handler with mocked Supabase and email.

## Recommendations

1. **If the backend is Next.js only**: Add Vitest (or Jest) and test `app/api/contact/route.ts` (validation, 503 when env missing, 500 on DB error, 200 on success with mocked dependencies). You can remove or archive the Python tests.
2. **If you maintain both backends**: Keep Python tests and ensure `src.api.main` exists; add Next.js tests for the contact route as above.
