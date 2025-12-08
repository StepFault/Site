# Testing Guidelines

Comprehensive testing rules and best practices for the StepFault project.

## Testing Philosophy

- Failing tests are blockers - fix tests before merging
- Tests are documentation - they show how code should be used
- Test behavior, not implementation
- Prefer fast, isolated unit tests
- Use integration tests for component interactions

## Test Requirements

### For Any New Feature
- Propose or generate tests alongside implementation
- Cover happy path and error cases
- Test edge cases and boundary conditions
- Maintain or improve test coverage

### Test Types

#### Unit Tests
- Test individual functions/classes in isolation
- Mock external dependencies
- Fast execution (< 1 second per test)
- Test one thing per test function
- Use descriptive test names: `test_should_return_user_when_valid_id_provided`

#### Integration Tests
- Test component interactions
- Test API endpoints end-to-end
- Use test database (not production)
- Clean up test data after tests
- Test real workflows, not just happy paths

#### Test Organization
```
tests/
├── unit/              # Unit tests
│   ├── test_services/
│   ├── test_repositories/
│   └── test_utils/
├── integration/       # Integration tests
│   └── test_api/
└── fixtures/          # Test fixtures and factories
    ├── factories.py
    └── conftest.py
```

## Test Structure

### Test Function Naming
- Use descriptive names: `test_<what>_when_<condition>`
- Examples:
  - `test_login_success_when_valid_credentials`
  - `test_login_fails_when_invalid_password`
  - `test_user_creation_requires_email`

### Test Organization (AAA Pattern)
```python
def test_example():
    # Arrange: Set up test data and conditions
    user = UserFactory(email="test@example.com")
    
    # Act: Execute the code under test
    result = user_service.create_user(user)
    
    # Assert: Verify the results
    assert result.id is not None
    assert result.email == "test@example.com"
```

## Test Data Management

### Fixtures and Factories
- Use factories for creating test data (e.g., Factory Boy)
- Create reusable fixtures in `conftest.py`
- Use fixtures for common setup/teardown
- Keep test data realistic but minimal

### Example Factory
```python
# tests/fixtures/factories.py
class UserFactory:
    @staticmethod
    def create(**kwargs):
        defaults = {
            "email": "user@example.com",
            "name": "Test User",
            "role": "user"
        }
        defaults.update(kwargs)
        return User(**defaults)
```

### Test Database
- Use separate test database
- Reset database state between tests
- Use transactions or fixtures for cleanup
- Never use production database for tests

## Test Coverage

### Coverage Goals
- Aim for >80% code coverage
- Focus on critical paths and business logic
- Don't obsess over 100% coverage (edge cases may be low value)
- Use coverage reports to identify gaps

### Running Coverage
```bash
pytest --cov=src --cov-report=html
```

## Preserving Tests During Refactoring

- Update tests when functionality changes
- Don't delete tests unless functionality is removed
- Refactor tests along with code
- Keep tests maintainable and readable
- If tests are brittle, fix them, don't remove them

## Test Best Practices

### Do's
- ✅ Write tests before or alongside code (TDD when possible)
- ✅ Test edge cases and error conditions
- ✅ Use descriptive test names
- ✅ Keep tests independent (no test dependencies)
- ✅ Use mocks for external services
- ✅ Clean up test data
- ✅ Test one thing per test

### Don'ts
- ❌ Test implementation details
- ❌ Write tests that depend on other tests
- ❌ Use production data in tests
- ❌ Skip tests without good reason
- ❌ Write slow tests unnecessarily
- ❌ Test third-party library code
- ❌ Ignore flaky tests (fix them)

## Testing External Dependencies

### Mocking External Services
- Mock API calls to external services
- Use test doubles for databases (in-memory or test DB)
- Mock file system operations when needed
- Use dependency injection to enable mocking

### Example Mock
```python
from unittest.mock import Mock, patch

@patch('src.services.external_api_client.call_api')
def test_service_with_external_api(mock_api):
    mock_api.return_value = {"status": "success"}
    result = my_service.process()
    assert result is not None
    mock_api.assert_called_once()
```

## Continuous Integration

- All tests must pass before merging
- Run tests in CI/CD pipeline
- Fail builds on test failures
- Run tests on multiple Python versions (if applicable)
- Run tests on different operating systems (if needed)

## Test Performance

- Keep unit tests fast (< 1 second each)
- Use test database for integration tests
- Parallelize test execution when possible
- Identify and fix slow tests
- Use test markers to categorize tests

## Debugging Tests

- Use `pytest -v` for verbose output
- Use `pytest --pdb` to drop into debugger on failure
- Use `print()` statements or logging for debugging
- Check test fixtures and setup
- Verify test data is correct

## Test Documentation

- Document complex test scenarios
- Explain why tests exist (especially for edge cases)
- Keep test code readable (it's documentation)
- Update tests when requirements change

