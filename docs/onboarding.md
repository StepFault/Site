# Onboarding Guide

Welcome to the StepFault project! This guide will help you get started as a new developer.

## How to Read This Repository

### Start Here
1. **README.md**: Project overview and quick start
2. **docs/onboarding.md**: This file - comprehensive onboarding
3. **docs/architecture.md**: System architecture and design
4. **docs/api-design.md**: API conventions and standards
5. **docs/dev-workflow.md**: Development process and practices

### Documentation Structure
```
docs/
├── requirements.md    # How requirements are managed
├── architecture.md    # System architecture
├── api-design.md     # API design guidelines
├── security.md       # Security practices
├── dev-workflow.md   # Development lifecycle
└── onboarding.md     # This file
```

### Code Structure
```
src/                  # Source code
├── api/             # API endpoints
├── services/        # Business logic
├── repositories/    # Data access
├── models/          # Domain models
└── utils/           # Utilities

tests/               # Test code (mirrors src structure)
.cursor/            # Cursor AI configuration
  ├── rules/        # Development rules for AI
  ├── environment.json
  └── mcp.json
```

## Prerequisites

### Required Software
- **Python 3.11+**: [Download Python](https://www.python.org/downloads/)
- **Git**: [Download Git](https://git-scm.com/downloads)
- **PostgreSQL** (if using database): [Download PostgreSQL](https://www.postgresql.org/download/)
- **Redis** (if using cache): [Download Redis](https://redis.io/download)
- **Code Editor**: VS Code, PyCharm, or your preferred editor

### Recommended Tools
- **Docker**: For containerized development
- **Postman/Insomnia**: For API testing
- **pgAdmin/DBeaver**: Database management

## Setting Up the Development Environment

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Site
```

### 2. Create Virtual Environment
```bash
# Create virtual environment
python3 -m venv .venv

# Activate virtual environment
# On Linux/Mac:
source .venv/bin/activate
# On Windows:
.venv\Scripts\activate
```

### 3. Install Dependencies
```bash
# Upgrade pip
pip install --upgrade pip

# Install project dependencies
pip install -r requirements.txt

# Install development dependencies (if separate file)
pip install -r requirements-dev.txt
```

### 4. Configure Environment Variables
```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your local configuration
# Never commit .env to version control!
```

### 5. Set Up Database (If Applicable)
```bash
# Create database
createdb stepfault_dev

# Run migrations
alembic upgrade head

# Seed database (if applicable)
python scripts/seed_db.py
```

### 6. Verify Installation
```bash
# Run tests to verify setup
pytest

# Check that application starts
python -m src.main  # or appropriate entry point
```

## Running the Development Environment

### Start Development Server
```bash
# Activate virtual environment
source .venv/bin/activate

# Run development server
uvicorn src.api.main:app --reload --port 8000

# Or using FastAPI CLI
fastapi dev src/api/main.py
```

### Access Application
- **API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs (Swagger UI)
- **ReDoc**: http://localhost:8000/redoc

### Start Supporting Services
```bash
# Start Redis (if using)
redis-server

# Start PostgreSQL (if using)
# Usually runs as a service, check with:
sudo systemctl status postgresql
```

## Running Tests

### Run All Tests
```bash
# Activate virtual environment
source .venv/bin/activate

# Run all tests
pytest

# Run with verbose output
pytest -v

# Run with coverage report
pytest --cov=src --cov-report=html
```

### Run Specific Tests
```bash
# Run specific test file
pytest tests/test_auth.py

# Run specific test function
pytest tests/test_auth.py::test_login_success

# Run tests matching pattern
pytest -k "test_login"

# Run only unit tests
pytest tests/unit/

# Run only integration tests
pytest tests/integration/
```

### Test Coverage
```bash
# Generate HTML coverage report
pytest --cov=src --cov-report=html

# Open coverage report
open htmlcov/index.html  # Mac
xdg-open htmlcov/index.html  # Linux
```

## Using Cursor with This Project

### Cursor Rules
The project includes Cursor AI rules in `.cursor/rules/`:
- **00-core.md**: Core development principles
- **10-stack.md**: Technology stack conventions
- **20-testing.md**: Testing guidelines

### How Cursor Uses Rules
- Cursor AI reads these rules automatically
- Rules guide code generation and suggestions
- Rules ensure consistency across the codebase

### Working with Cursor
1. **Ask Questions**: Ask Cursor about code, architecture, or patterns
2. **Generate Code**: Request code generation following project conventions
3. **Refactor**: Ask Cursor to refactor code while maintaining tests
4. **Documentation**: Request documentation updates

### Example Cursor Interactions
```
# Ask about architecture
"How does authentication work in this project?"

# Request code generation
"Create a new API endpoint for user profiles following our API design guidelines"

# Request refactoring
"Refactor this function to follow our core rules (keep it under 50 lines)"

# Request tests
"Generate unit tests for the UserService class"
```

## Development Workflow

### 1. Create a Feature Branch
```bash
# Update dev branch
git checkout dev
git pull origin dev

# Create feature branch
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Write code following project conventions
- Write tests for new functionality
- Update documentation as needed

### 3. Test Your Changes
```bash
# Run tests
pytest

# Run linter (if configured)
ruff check src/
# or
black --check src/
```

### 4. Commit Changes
```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat(auth): add JWT token refresh endpoint"
```

### 5. Push and Create PR
```bash
# Push branch
git push -u origin feature/your-feature-name

# Create Pull Request on GitHub/GitLab
# Follow PR template and checklist
```

### 6. Code Review
- Address review feedback
- Make requested changes
- Re-request review when ready

### 7. Merge
- After approval, merge to `dev`
- Delete feature branch
- Deploy to staging for testing

## Common Tasks

### Adding a New Dependency
```bash
# Install package
pip install package-name

# Add to requirements.txt
pip freeze > requirements.txt

# Or add manually to requirements.txt
echo "package-name==1.2.3" >> requirements.txt
```

### Creating a Database Migration
```bash
# Create migration
alembic revision --autogenerate -m "add user table"

# Review generated migration
# Edit if needed

# Apply migration
alembic upgrade head
```

### Running Linters/Formatters
```bash
# Format code (if using black)
black src/ tests/

# Check formatting
black --check src/ tests/

# Lint code (if using ruff/flake8)
ruff check src/ tests/
```

## Getting Help

### Documentation
- Check `docs/` directory for detailed documentation
- Review code comments and docstrings
- Check API documentation at `/docs` endpoint

### Team Resources
- Ask questions in team chat/Slack
- Request code review from team members
- Pair program with experienced developers

### External Resources
- FastAPI Documentation: https://fastapi.tiangolo.com/
- Python Documentation: https://docs.python.org/3/
- PostgreSQL Documentation: https://www.postgresql.org/docs/

## Next Steps

1. **Explore the Codebase**: Read through key files to understand structure
2. **Run the Application**: Get it running locally
3. **Run Tests**: Ensure all tests pass
4. **Make a Small Change**: Fix a typo or add a comment to test workflow
5. **Pick a First Issue**: Start with a good first issue or small feature
6. **Ask Questions**: Don't hesitate to ask for help

## Checklist for New Developers

- [ ] Repository cloned
- [ ] Virtual environment created and activated
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Database set up (if applicable)
- [ ] Application runs locally
- [ ] Tests pass
- [ ] Read README.md
- [ ] Read architecture.md
- [ ] Read dev-workflow.md
- [ ] Read API design guidelines
- [ ] Understand branching model
- [ ] First feature branch created
- [ ] First commit made
- [ ] First PR created

## Tips for Success

1. **Start Small**: Begin with small tasks to learn the codebase
2. **Read Code**: Read existing code to understand patterns
3. **Ask Questions**: Better to ask than to guess
4. **Write Tests**: Tests help you understand expected behavior
5. **Follow Conventions**: Consistency makes code easier to maintain
6. **Document as You Go**: Update docs when you add features
7. **Review Others' Code**: Learn from code reviews

Welcome to the team! 🚀

