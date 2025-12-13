# Git Commit & Branch Conventions

## Commit Message Format

**Format**: `type(scope): subject`

### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Maintenance tasks

### Examples
```
feat(auth): add JWT token refresh endpoint
fix(api): handle null values in user creation
docs(api): update authentication documentation
refactor(services): extract user validation logic
test(auth): add tests for token refresh
chore(deps): update dependencies
```

### Guidelines
- Use lowercase for type and scope
- Scope is optional but recommended (e.g., `feat(contact)`, `fix(api)`)
- Subject should be clear and descriptive
- Keep subject under 72 characters when possible

---

## Branching Model

### Branch Structure
```
main (production-ready)
  └── dev (integration branch)
      └── feature/user-authentication
      └── feature/ai-integration
      └── bugfix/login-error
      └── hotfix/security-patch
```

### Branch Types

1. **main**: Production-ready code, always deployable
2. **dev**: Integration branch, latest development work
3. **feature/***: New features (e.g., `feature/user-authentication`)
4. **bugfix/***: Bug fixes (e.g., `bugfix/login-error`)
5. **hotfix/***: Critical production fixes (e.g., `hotfix/security-patch`)

### Branch Naming Convention
- Use **lowercase** with **hyphens**
- Prefix with type: `feature/`, `bugfix/`, `hotfix/`
- Use descriptive names: `feature/user-authentication`, not `feature/auth`

### Creating a Feature Branch
```bash
# Start from dev branch
git checkout dev
git pull origin dev

# Create and switch to new branch
git checkout -b feature/your-feature-name

# Push and set upstream
git push -u origin feature/your-feature-name
```

---

## Workflow

### Standard Development Flow
1. Create feature branch from `dev`
2. Make changes and commit frequently
3. Push to feature branch
4. Create Pull Request to `dev`
5. After review, merge to `dev`
6. Deploy `dev` to staging
7. After testing, merge `dev` to `main`
8. Deploy `main` to production

### Commit Guidelines
- **Small Commits**: Commit frequently with clear messages
- **Test-Driven**: Write tests before or alongside code
- **One Change Per Commit**: Each commit should represent one logical change

---

## Current Status

**Note**: We've been committing directly to `main` for quick iterations. 

**Going forward**, we should:
1. Create a `dev` branch (if it doesn't exist)
2. Create feature branches from `dev`
3. Use proper commit message format
4. Create PRs for review before merging

---

**This document summarizes the conventions from `docs/dev-workflow.md`**

