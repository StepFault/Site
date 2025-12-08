# API Design Guidelines

This document defines the API design standards, conventions, and best practices for the StepFault project.

## API Style

### RESTful Principles
- Use HTTP methods correctly: GET, POST, PUT, PATCH, DELETE
- Resource-based URLs (nouns, not verbs)
- Stateless requests
- Consistent response formats
- Proper HTTP status codes

### Example URL Structure
```
GET    /api/v1/users              # List users
GET    /api/v1/users/{id}         # Get user by ID
POST   /api/v1/users              # Create user
PUT    /api/v1/users/{id}         # Replace user (full update)
PATCH  /api/v1/users/{id}         # Partial update
DELETE /api/v1/users/{id}         # Delete user
```

## Naming Conventions

### URLs
- Use lowercase with hyphens: `/api/v1/user-profiles`
- Use plural nouns for collections: `/users`, not `/user`
- Use nested resources for relationships: `/users/{id}/posts`
- Avoid verbs in URLs: use `/users/{id}/activate` (POST) instead of `/users/{id}/activate-user`

### Query Parameters
- Use snake_case: `?sort_by=created_at&order=desc`
- Common parameters:
  - `page`: Page number (default: 1)
  - `per_page` or `limit`: Items per page (default: 20, max: 100)
  - `sort_by`: Field to sort by
  - `order`: `asc` or `desc`
  - `filter`: Filter criteria (JSON or query string)

### Request/Response Fields
- Use snake_case for JSON fields: `{"user_id": 123, "created_at": "2025-01-01T00:00:00Z"}`
- Be consistent across all endpoints
- Use descriptive names: `user_email` not `email` (if context needed)

## Versioning Strategy

### URL Versioning (Current Approach)
- Include version in URL: `/api/v1/`, `/api/v2/`
- Increment major version for breaking changes
- Maintain backward compatibility when possible

### Version Lifecycle
1. **v1**: Current stable version
2. **v2**: New version with breaking changes
3. **Deprecation**: Announce deprecation 6 months before removal
4. **Sunset**: Remove deprecated versions after grace period

### Breaking Changes
- Changes to request/response structure
- Removal of endpoints or fields
- Changes to authentication/authorization
- Changes to error response format

### Non-Breaking Changes
- Adding new endpoints
- Adding optional fields to requests
- Adding new fields to responses
- Adding new query parameters

## Request/Response Formats

### Request Headers
```
Content-Type: application/json
Authorization: Bearer {jwt_token}
Accept: application/json
X-Request-ID: {unique_request_id}  # Optional, for tracing
```

### Response Structure
```json
{
  "data": {
    // Resource data
  },
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "total_pages": 5
  },
  "links": {
    "self": "/api/v1/users?page=1",
    "next": "/api/v1/users?page=2",
    "prev": null,
    "first": "/api/v1/users?page=1",
    "last": "/api/v1/users?page=5"
  }
}
```

### Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input provided",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ],
    "request_id": "req_1234567890",
    "timestamp": "2025-01-01T00:00:00Z"
  }
}
```

### HTTP Status Codes
- `200 OK`: Successful GET, PUT, PATCH
- `201 Created`: Successful POST (resource created)
- `204 No Content`: Successful DELETE
- `400 Bad Request`: Invalid request format or parameters
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Authenticated but not authorized
- `404 Not Found`: Resource doesn't exist
- `409 Conflict`: Resource conflict (e.g., duplicate)
- `422 Unprocessable Entity`: Validation errors
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: Service temporarily unavailable

## Authentication & Authorization

### Authentication
- JWT tokens in `Authorization: Bearer {token}` header
- Token expiration: 1 hour (access), 7 days (refresh)
- Refresh token endpoint: `POST /api/v1/auth/refresh`

### Authorization
- Role-based access control (RBAC)
- Roles: `admin`, `user`, `guest`
- Permissions checked at endpoint level
- Return `403 Forbidden` for unauthorized access

## Pagination

### Standard Pagination
```
GET /api/v1/users?page=1&per_page=20
```

Response includes:
- `meta.page`: Current page
- `meta.per_page`: Items per page
- `meta.total`: Total items
- `meta.total_pages`: Total pages
- `links`: Navigation links

### Cursor-Based Pagination (for large datasets)
```
GET /api/v1/users?cursor={cursor_token}&limit=20
```

## Filtering and Sorting

### Filtering
```
GET /api/v1/users?status=active&role=admin
GET /api/v1/users?created_after=2025-01-01&created_before=2025-12-31
```

### Sorting
```
GET /api/v1/users?sort_by=created_at&order=desc
GET /api/v1/users?sort_by=name&order=asc
```

### Multiple Filters
Use query string format or JSON in query parameter:
```
GET /api/v1/users?filter={"status":"active","role":"admin"}
```

## Rate Limiting

- Rate limits per API key/user
- Headers included in response:
  ```
  X-RateLimit-Limit: 1000
  X-RateLimit-Remaining: 999
  X-RateLimit-Reset: 1640995200
  ```
- Return `429 Too Many Requests` when exceeded

## Endpoint Template

### New Endpoint Checklist
- [ ] Define route and HTTP method
- [ ] Create request schema (Pydantic model)
- [ ] Create response schema (Pydantic model)
- [ ] Implement endpoint handler
- [ ] Add authentication/authorization
- [ ] Add input validation
- [ ] Add error handling
- [ ] Add logging
- [ ] Write tests (unit + integration)
- [ ] Update OpenAPI/Swagger docs
- [ ] Add rate limiting if needed
- [ ] Document in this file

### Endpoint Template
```python
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/v1/users", tags=["users"])

# Request/Response Schemas
class UserCreateRequest(BaseModel):
    email: str
    name: str
    role: Optional[str] = "user"

class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    role: str
    created_at: datetime

# Endpoint
@router.post(
    "",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new user",
    description="Creates a new user account with the provided information"
)
async def create_user(
    request: UserCreateRequest,
    current_user: User = Depends(get_current_user)
) -> UserResponse:
    """
    Create a new user.
    
    Requires authentication and admin role.
    """
    # Implementation
    pass
```

## Documentation

### OpenAPI/Swagger
- Auto-generated from FastAPI
- Available at `/docs` (Swagger UI) and `/redoc` (ReDoc)
- Include descriptions, examples, and response codes

### Endpoint Documentation Requirements
- Summary (one line)
- Description (detailed)
- Request body schema
- Response schemas (success + errors)
- Query parameters
- Authentication requirements
- Example requests/responses

## Testing

### API Testing Checklist
- [ ] Happy path (successful request)
- [ ] Validation errors (invalid input)
- [ ] Authentication errors (missing/invalid token)
- [ ] Authorization errors (insufficient permissions)
- [ ] Not found errors (404)
- [ ] Edge cases (empty results, boundary values)
- [ ] Rate limiting
- [ ] Error handling

## Best Practices

1. **Idempotency**: POST/PUT operations should be idempotent when possible
2. **Consistency**: Use consistent patterns across all endpoints
3. **Validation**: Validate all inputs at the API boundary
4. **Error Messages**: Provide clear, actionable error messages
5. **Logging**: Log all requests, errors, and important events
6. **Performance**: Optimize queries, use caching, paginate large results
7. **Security**: Never expose internal errors, sanitize inputs, use HTTPS
8. **Documentation**: Keep API docs up to date with code

## Migration Guide

When creating a new API version:
1. Copy existing endpoints to new version
2. Document breaking changes
3. Update client libraries
4. Provide migration guide for consumers
5. Maintain old version during transition period

