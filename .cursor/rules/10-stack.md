# Technology Stack Rules

Guidelines specific to the technologies and frameworks used in this project.

## Backend Rules

### Python Standards
- Assume modern Python (3.11+) with full type hints
- Use type annotations for all function parameters and return types
- Prefer `typing` module for complex types (Optional, List, Dict, etc.)
- Use dataclasses or Pydantic models for data structures

### FastAPI Conventions
- Follow FastAPI best practices and conventions
- Use Pydantic models for request/response validation
- Separate route handlers from business logic
- Use dependency injection for services and repositories
- Document endpoints with OpenAPI annotations

### Data Layer Separation
- Separate ORM models from schema/validation models
- Use repository pattern to abstract data access
- Keep business logic out of ORM models
- Document migration expectations when schemas evolve
- Use Alembic for database migrations

### Service Layer
- Keep services focused on business logic
- Services should not depend on HTTP/API concerns
- Use dependency injection to provide dependencies
- Keep services testable and mockable

## Frontend Rules (If Applicable)

### React Standards
- Use React functional components with hooks
- Prefer hooks over class components
- Keep components small and focused
- Extract reusable logic into custom hooks

### Component Organization
- Keep UI pure; isolate business logic into hooks/services
- Maintain a clean folder hierarchy:
  ```
  components/
    ├── common/      # Reusable components
    ├── features/    # Feature-specific components
    └── layouts/     # Layout components
  ```
- Use TypeScript for type safety (if applicable)

### State Management
- Use React Context for global state (if simple)
- Consider Redux/Zustand for complex state (if needed)
- Keep state as local as possible
- Avoid prop drilling

## Data & Persistence

### Data Models
- Keep data models, schemas, and service layers cleanly separated
- Use Pydantic for validation schemas
- Use SQLAlchemy (or similar) for ORM models
- Ensure consistent validation and transformation pipelines

### Database Conventions
- Use migrations for all schema changes
- Never modify production schema directly
- Test migrations on staging before production
- Keep migrations small and focused
- Document complex migrations

### Caching Strategy
- Use Redis for session management and caching
- Cache expensive operations appropriately
- Implement cache invalidation strategies
- Document cache TTLs and invalidation logic

## API Design

- Follow RESTful conventions (see `docs/api-design.md`)
- Use consistent naming (snake_case for JSON, kebab-case for URLs)
- Version APIs appropriately
- Document all endpoints with OpenAPI
- Handle errors consistently

## Error Handling

- Use custom exception classes
- Return appropriate HTTP status codes
- Log errors with context (but not sensitive data)
- Never expose internal errors to clients
- Provide clear, actionable error messages

## Performance

- Optimize database queries (use indexes, avoid N+1 queries)
- Use async/await for I/O-bound operations
- Implement pagination for large datasets
- Cache frequently accessed data
- Monitor and profile performance-critical paths

