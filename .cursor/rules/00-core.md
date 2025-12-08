# Core Development Rules

These are the fundamental principles that guide all development work in this project.

## Repository-Level Thinking

- Always reason about changes at repository scope, not just the file in context
- Consider how changes affect other parts of the system
- Think about dependencies, integrations, and downstream impacts
- Maintain consistency across the entire codebase

## Planning Before Implementation

- Explain planned edits before making them:
  - Design intent: Why is this change needed?
  - Affected files: What files will be modified?
  - Risks and benefits: What are the trade-offs?
- Prefer small, incremental, test-preserving changes unless explicitly told otherwise
- Ensure project structure, docs, rules, and tests remain consistent

## Code Quality Standards

- Keep functions under ~40–50 lines when possible
- Prefer clarity, maintainability, and explicitness over cleverness
- Avoid abbreviations unless widely standard (e.g., `id`, `url`, `api`)
- Document "why", not "what" (code should be self-documenting)
- Use meaningful variable and function names

## Documentation and Testing

- Update tests whenever functionality changes
- Update docs for new APIs, modules, or breaking changes
- Maintain consistency between code, tests, and documentation
- Preserve test surfaces during refactors unless instructed otherwise

## Security and Secrets

- Never introduce secrets, API keys, or credentials into code or configuration
- Use environment variables for configuration
- Assume this project may expand to handle sensitive data
- Avoid logging PII (Personally Identifiable Information)
- Follow security guidelines in `docs/security.md`

## Consistency

- Follow established patterns and conventions
- Maintain consistency with existing code style
- Use project-wide conventions for naming, structure, and organization
- When in doubt, match existing patterns in the codebase

