# Development Workflow

This document defines the complete development lifecycle, from discovery to deployment, for the StepFault project.

## Development Cycle Overview

```
Discovery → Design → Planning → Feature Branch → Implementation → 
Testing → Review → Merge → Deployment → Monitoring
```

## Phase 1: Discovery

### Objectives
- Understand the problem or requirement
- Gather stakeholder input
- Research technical feasibility
- Identify constraints and dependencies

### Activities
1. **Requirement Gathering**: Use templates from `docs/requirements.md`
2. **Technical Research**: Investigate technologies, libraries, patterns
3. **Stakeholder Alignment**: Confirm understanding with product owner
4. **Documentation**: Create or update requirements document

### Deliverables
- User stories with acceptance criteria
- Technical constraints identified
- Open questions documented
- Initial estimates (if possible)

## Phase 2: Design

### Objectives
- Design solution architecture
- Define data models and APIs
- Plan integration points
- Identify risks and mitigation

### Activities
1. **Architecture Design**: High-level component design
2. **API Design**: Define endpoints using `docs/api-design.md` guidelines
3. **Data Modeling**: Design database schema
4. **Security Review**: Identify security considerations
5. **Documentation**: Update `docs/architecture.md` if needed

### Deliverables
- Architecture diagram or description
- API endpoint specifications
- Database schema design
- Security considerations documented

## Phase 3: Planning

### Objectives
- Break down work into tasks
- Estimate effort
- Identify dependencies
- Create implementation plan

### Activities
1. **Task Breakdown**: Divide feature into small, testable tasks
2. **Estimation**: Estimate effort for each task
3. **Dependency Mapping**: Identify task dependencies
4. **Risk Assessment**: Identify and plan for risks
5. **Sprint Planning**: Assign tasks to sprint (if using sprints)

### Deliverables
- Task list with estimates
- Implementation plan
- Risk mitigation strategies
- Sprint backlog (if applicable)

## Phase 4: Feature Branch

### Branching Model

```
main (production-ready)
  └── dev (integration branch)
      └── feature/user-authentication
      └── feature/ai-integration
      └── bugfix/login-error
      └── hotfix/security-patch
```

### Branch Types
- **main**: Production-ready code, always deployable
- **dev**: Integration branch, latest development work
- **feature/***: New features (e.g., `feature/user-authentication`)
- **bugfix/***: Bug fixes (e.g., `bugfix/login-error`)
- **hotfix/***: Critical production fixes (e.g., `hotfix/security-patch`)

### Branch Naming Convention
- Use lowercase with hyphens
- Prefix with type: `feature/`, `bugfix/`, `hotfix/`
- Descriptive name: `feature/user-authentication`, not `feature/auth`

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

## Phase 5: Implementation

### Micro Development Loop

For each task, follow this loop:

1. **Clarify Requirement**: Summarize what needs to be built
2. **Create Plan**: Step-by-step implementation plan
3. **Identify Files**: List all affected files
4. **Implement**: Small, incremental changes
5. **Test**: Write or update tests
6. **Run Tests**: Ensure all tests pass
7. **Document**: Update API docs, code comments
8. **Commit**: Commit with descriptive message

### Implementation Guidelines
- **Small Commits**: Commit frequently with clear messages
- **Test-Driven**: Write tests before or alongside code
- **Code Quality**: Follow coding standards and conventions
- **Documentation**: Update docs for new APIs/features
- **Refactoring**: Keep code clean, refactor as needed

### Commit Message Convention

Format: `type(scope): subject`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Maintenance tasks

Examples:
```
feat(auth): add JWT token refresh endpoint
fix(api): handle null values in user creation
docs(api): update authentication documentation
refactor(services): extract user validation logic
test(auth): add tests for token refresh
```

## Phase 6: Testing

### Testing Levels
1. **Unit Tests**: Test individual functions/classes
2. **Integration Tests**: Test component interactions
3. **API Tests**: Test API endpoints
4. **End-to-End Tests**: Test complete user flows (if applicable)

### Testing Requirements
- **Coverage**: Aim for >80% code coverage
- **Test First**: Write tests before or with implementation
- **Fast Tests**: Unit tests should run quickly
- **Isolated Tests**: Tests should not depend on each other
- **Fixtures**: Use fixtures/factories for test data

### Running Tests
```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=src --cov-report=html

# Run specific test file
pytest tests/test_auth.py

# Run specific test
pytest tests/test_auth.py::test_login_success
```

### Test Organization
```
tests/
├── unit/           # Unit tests
│   ├── test_services/
│   └── test_utils/
├── integration/    # Integration tests
│   └── test_api/
└── fixtures/       # Test fixtures and factories
```

## Phase 7: Review

### Pull Request Process

1. **Create PR**: Open PR from feature branch to `dev`
2. **Self-Review**: Review your own code first
3. **CI Checks**: Ensure CI passes (tests, linting)
4. **Request Review**: Request review from team members
5. **Address Feedback**: Make requested changes
6. **Approval**: Get at least one approval
7. **Merge**: Merge to `dev` branch

### PR Checklist
- [ ] Code follows project conventions
- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] No secrets or sensitive data
- [ ] Error handling implemented
- [ ] Security considerations addressed
- [ ] Performance implications considered
- [ ] Breaking changes documented

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass locally
```

### Code Review Guidelines
- **Be Constructive**: Provide helpful, actionable feedback
- **Be Respectful**: Maintain professional tone
- **Focus on Code**: Review code, not the person
- **Ask Questions**: Clarify understanding before suggesting changes
- **Approve Promptly**: Don't block PRs unnecessarily

## Phase 8: Merge

### Merge Process
1. **Squash or Merge**: Use squash merge for feature branches
2. **Delete Branch**: Delete feature branch after merge
3. **Update Dev**: Ensure `dev` branch is up to date
4. **Deploy to Staging**: Deploy `dev` to staging environment

### Merge to Main
- Only merge `dev` to `main` after:
  - All tests passing
  - Code review approved
  - Staging deployment successful
  - Product owner approval (if required)

## Phase 9: Deployment

### Deployment Environments
1. **Development**: Local development
2. **Staging**: Pre-production testing
3. **Production**: Live environment

### Deployment Process
1. **Pre-Deployment Checks**:
   - All tests passing
   - No secrets in code
   - Environment variables configured
   - Database migrations ready

2. **Deployment Steps**:
   - Run database migrations
   - Deploy application code
   - Run health checks
   - Verify deployment

3. **Post-Deployment**:
   - Monitor logs and metrics
   - Verify functionality
   - Rollback plan ready if needed

### Deployment Checklist
- [ ] Database migrations tested
- [ ] Environment variables set
- [ ] Secrets configured
- [ ] Health checks passing
- [ ] Monitoring enabled
- [ ] Rollback plan documented

## Phase 10: Monitoring

### Monitoring Activities
1. **Log Monitoring**: Watch application logs for errors
2. **Metrics**: Monitor performance metrics
3. **User Feedback**: Collect user feedback
4. **Error Tracking**: Track and resolve errors
5. **Performance**: Monitor response times, throughput

### Monitoring Tools
- Application logs (structured logging)
- Error tracking (Sentry, etc.)
- Performance monitoring (APM tools)
- Uptime monitoring
- User analytics

## Workflow Best Practices

### Daily Practices
- Pull latest changes from `dev` regularly
- Commit work frequently
- Run tests before committing
- Keep branches up to date

### Weekly Practices
- Review and update documentation
- Refactor technical debt
- Update dependencies
- Review security advisories

### Communication
- Update team on progress
- Ask for help when blocked
- Share learnings and insights
- Document decisions in ADRs (Architecture Decision Records)

## Troubleshooting

### Common Issues
- **Merge Conflicts**: Resolve conflicts carefully, test after resolution
- **Failing Tests**: Fix tests before merging
- **CI Failures**: Address CI issues promptly
- **Deployment Issues**: Have rollback plan ready

### Getting Help
- Check documentation first
- Search existing issues/PRs
- Ask team members
- Document solutions for future reference

