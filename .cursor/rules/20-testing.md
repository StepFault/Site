# Testing Guidelines

Comprehensive testing rules and best practices for the Stepfault.ai frontend showroom.

## Testing Philosophy
- **Focus on the Simulation:** We are testing the *visual simulation* of MAPOS, not actual agent deterministic logic. Tests should ensure the UI behaves exactly as a VC or client would expect.
- **Visual & Interaction Fidelity:** Tests must verify that terminal outputs, Framer Motion states, and waitlist forms render and function flawlessly.
- Failing tests are blockers - fix tests before merging.

## Test Requirements

### Test Types
#### Unit & Component Tests (Vitest / React Testing Library)
- Test individual UI components (e.g., Terminal Widget, Buttons) in isolation.
- Mock Supabase clients and Framer Motion hooks when necessary to avoid test hangs.
- Fast execution (< 1 second per test).
- Use descriptive test names: `it('should render the emerald accent on successful data flow')`.

#### End-to-End (E2E) Tests (Playwright / Cypress)
- Focus on the critical conversion paths: Waitlist signups, contact form submissions, and scrolling through the Architecture Whitepaper.
- Verify that `<50ms TTFB` targets are not blocked by heavy client-side renders.

#### Test Organization

tests/
├── components/        # UI component tests
│   ├── ui/
│   └── sections/
├── api/               # Next.js Route Handler tests
└── e2e/               # Playwright/Cypress end-to-end flows

## Test Data Management

### Mocking Supabase
- Never hit the production Supabase instance during CI/CD.
- Use mock service workers (MSW) or stubbed functions to intercept `@supabase/ssr` calls.
- Example: Mock a successful waitlist insertion to ensure the UI transitions to the success state.

## Test Coverage

- **Critical Paths:** 100% coverage on the Waitlist form, Supabase API route handlers, and environment variable validation.
- **UI Components:** Focus on structural rendering. Do not obsess over testing exact pixel values in Framer Motion, but *do* test that the correct variants are triggered.

## Best Practices

### Do's
- ✅ Mock external Supabase API calls.
- ✅ Ensure typed environment variables are present in the test environment.
- ✅ Test that the correct Tailwind classes (`bg-zinc-950`, `text-emerald-400`) are applied conditionally.

### Don'ts
- ❌ Do not write tests for Python/legacy backend logic.
- ❌ Do not test the *actual* AI agent logic (this repo is purely a UI simulation).
- ❌ Do not use production database credentials in the testing suite.