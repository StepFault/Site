# StepFault

Creative AI & Quantum Computing Solutions

## Project Overview

StepFault is a platform that combines the limitless potential of artificial intelligence with the mind-bending possibilities of quantum computing. From generative design to quantum-accelerated insights, we empower innovators to solve tomorrow's challenges today.

This repository contains the complete codebase for the StepFault platform, including backend APIs, frontend components, and supporting infrastructure.

## Quick Start

### Prerequisites

- Python 3.11+
- PostgreSQL (if using database)
- Redis (if using cache)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Site
   ```

2. **Create virtual environment**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Set up database** (if applicable)
   ```bash
   createdb stepfault_dev
   alembic upgrade head
   ```

6. **Run the application**
   ```bash
   uvicorn src.api.main:app --reload
   ```

7. **Access the application**
   - API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## Running Tests

Run the test suite to verify everything is working:

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=src --cov-report=html

# Run specific test file
pytest tests/test_auth.py
```

See `docs/onboarding.md` for more detailed testing instructions.

## Project Structure

```
Site/
├── .cursor/              # Cursor AI configuration
│   ├── rules/           # Development rules for AI
│   ├── environment.json # Remote dev environment config
│   └── mcp.json         # MCP server configuration
├── docs/                # Project documentation
│   ├── requirements.md  # Requirements management
│   ├── architecture.md  # System architecture
│   ├── api-design.md    # API design guidelines
│   ├── security.md      # Security practices
│   ├── dev-workflow.md  # Development lifecycle
│   └── onboarding.md    # Onboarding guide
├── src/                 # Source code
│   ├── api/            # API endpoints
│   ├── services/       # Business logic
│   ├── repositories/   # Data access
│   ├── models/         # Domain models
│   └── utils/          # Utilities
├── tests/              # Test code
│   ├── unit/          # Unit tests
│   ├── integration/   # Integration tests
│   └── fixtures/      # Test fixtures
├── assets/            # Static assets (images, CSS, etc.)
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## Using Cursor with This Project

This project includes Cursor AI rules that guide code generation and suggestions. The rules are located in `.cursor/rules/`:

- **00-core.md**: Core development principles
- **10-stack.md**: Technology stack conventions
- **20-testing.md**: Testing guidelines

### How to Use

1. **Ask Questions**: Ask Cursor about code, architecture, or patterns
2. **Generate Code**: Request code generation following project conventions
3. **Refactor**: Ask Cursor to refactor code while maintaining tests
4. **Documentation**: Request documentation updates

### Example Interactions

```
# Ask about architecture
"How does authentication work in this project?"

# Request code generation
"Create a new API endpoint for user profiles following our API design guidelines"

# Request refactoring
"Refactor this function to follow our core rules (keep it under 50 lines)"
```

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Requirements Management](docs/requirements.md)**: How requirements are gathered and validated
- **[Architecture](docs/architecture.md)**: System architecture and design patterns
- **[API Design](docs/api-design.md)**: API conventions and standards
- **[Security](docs/security.md)**: Security practices and guidelines
- **[Development Workflow](docs/dev-workflow.md)**: Complete development lifecycle
- **[Onboarding](docs/onboarding.md)**: Guide for new developers

## Development Workflow

This project follows a structured development workflow:

1. **Discovery**: Understand requirements and constraints
2. **Design**: Design solution architecture
3. **Planning**: Break down into tasks
4. **Feature Branch**: Create feature branch from `dev`
5. **Implementation**: Code following project conventions
6. **Testing**: Write and run tests
7. **Review**: Create PR and get code review
8. **Merge**: Merge to `dev` after approval
9. **Deployment**: Deploy to staging/production
10. **Monitoring**: Monitor and iterate

See `docs/dev-workflow.md` for detailed workflow documentation.

## Branching Model

- **main**: Production-ready code
- **dev**: Integration branch for development
- **feature/***: New features
- **bugfix/***: Bug fixes
- **hotfix/***: Critical production fixes

## Contributing

1. Read the [onboarding guide](docs/onboarding.md)
2. Review [development workflow](docs/dev-workflow.md)
3. Create a feature branch from `dev`
4. Follow coding conventions and write tests
5. Create a Pull Request with description
6. Address review feedback
7. Merge after approval

## Extending Documentation

When adding new features or making significant changes:

1. **Update Architecture Docs**: If architecture changes
2. **Update API Docs**: If adding/modifying APIs
3. **Update Security Docs**: If security implications
4. **Update Onboarding**: If setup process changes
5. **Create ADRs**: For significant architectural decisions

## Technology Stack

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL
- **Cache**: Redis
- **ORM**: SQLAlchemy
- **Migrations**: Alembic
- **Validation**: Pydantic

### Frontend
- HTML/CSS/JavaScript (current)
- React (future consideration)

### Development Tools
- **Testing**: pytest
- **Linting**: ruff, black (if configured)
- **Type Checking**: mypy (if configured)

## Environment Variables

Required environment variables are documented in `.env.example`. Never commit `.env` files to version control.

Key variables:
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `JWT_SECRET_KEY`: Secret key for JWT tokens
- `DEBUG`: Debug mode (False in production)
- `ENVIRONMENT`: Environment name (development/staging/production)

## Security

This project follows security best practices:

- Never commit secrets or API keys
- Use environment variables for configuration
- Follow security guidelines in `docs/security.md`
- Regular dependency updates and vulnerability scanning
- HIPAA-aware practices for future readiness

## Support

- **Documentation**: Check `docs/` directory
- **Issues**: Create an issue on GitHub/GitLab
- **Questions**: Ask team members or in team chat

## License

[Add license information here]

## Next Steps

1. Read the [onboarding guide](docs/onboarding.md)
2. Set up your development environment
3. Run the test suite
4. Explore the codebase
5. Pick a first issue or feature to work on

Welcome to StepFault! 🚀
