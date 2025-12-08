# Security Guidelines

This document defines the security posture, practices, and guidelines for the StepFault project.

## Security Posture

StepFault follows a defense-in-depth security strategy, implementing multiple layers of security controls to protect data, systems, and users.

### Core Principles
1. **Least Privilege**: Grant minimum necessary permissions
2. **Defense in Depth**: Multiple security layers
3. **Fail Secure**: Default to secure state on errors
4. **Security by Design**: Security built into architecture
5. **Privacy by Default**: Minimize data collection and exposure

## Environment Variables and Secrets Management

### Environment Variables
- **Never commit secrets to version control**
- Use `.env` files for local development (gitignored)
- Use environment variables in production
- Document all required environment variables in `.env.example`

### Secrets Management
- **Local Development**: `.env` file (never committed)
- **CI/CD**: Secure environment variables in CI system
- **Production**: Use secret management service (AWS Secrets Manager, HashiCorp Vault, etc.)
- **Rotation**: Rotate secrets regularly (90 days recommended)

### Environment Variable Naming
- Use `UPPER_SNAKE_CASE`
- Prefix with service name: `DB_`, `REDIS_`, `API_`
- Examples:
  ```
  DATABASE_URL=postgresql://...
  REDIS_URL=redis://...
  JWT_SECRET_KEY=...
  API_KEY_OPENAI=...
  ```

### .env.example Template
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/stepfault

# Redis
REDIS_URL=redis://localhost:6379/0

# JWT
JWT_SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=60
JWT_REFRESH_TOKEN_EXPIRE_DAYS=7

# API Keys (External Services)
API_KEY_OPENAI=sk-...
API_KEY_ANTHROPIC=sk-ant-...

# Application
DEBUG=False
ENVIRONMENT=development
LOG_LEVEL=INFO

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000
```

## Logging Restrictions

### Never Log Sensitive Information
**DO NOT LOG:**
- Passwords or password hashes
- API keys or tokens
- Credit card numbers
- Social Security Numbers
- Full email addresses (log domain only if needed)
- Personal Identifiable Information (PII) without consent
- Health information (HIPAA)
- Authentication tokens (except for debugging in dev)

### Safe Logging Practices
- Log user IDs, not usernames/emails
- Log request IDs for tracing
- Log error types, not full error messages with sensitive data
- Use structured logging (JSON format)
- Sanitize URLs and query parameters
- Mask sensitive fields: `password: ***`, `api_key: sk-***`

### Logging Example
```python
# BAD
logger.error(f"Login failed for user {user.email} with password {password}")

# GOOD
logger.info("Login attempt", extra={
    "user_id": user.id,
    "success": False,
    "request_id": request_id
})
```

### Log Levels
- **DEBUG**: Detailed information for debugging (dev only)
- **INFO**: General informational messages
- **WARNING**: Warning messages for potential issues
- **ERROR**: Error messages for failures
- **CRITICAL**: Critical errors requiring immediate attention

## Authentication

### User Authentication
- **Password Requirements**:
  - Minimum 12 characters
  - Mix of uppercase, lowercase, numbers, special characters
  - Use bcrypt or Argon2 for hashing (never plain text)
  - Salt each password individually

- **Session Management**:
  - JWT tokens with expiration
  - Refresh tokens for long-lived sessions
  - Token rotation on refresh
  - Revocation mechanism for compromised tokens

- **Multi-Factor Authentication (MFA)**:
  - TOTP (Time-based One-Time Password)
  - SMS backup (future)
  - Recovery codes

### API Authentication
- API keys for service-to-service communication
- Rate limiting per API key
- Key rotation policy
- Audit logging of API key usage

## Authorization and RBAC

### Role-Based Access Control (RBAC)
- **Roles**:
  - `admin`: Full system access
  - `user`: Standard user access
  - `guest`: Limited read-only access

- **Permissions**:
  - Granular permissions per resource/action
  - Check permissions at API endpoint level
  - Deny by default

### Access Control Patterns
```python
# Check role
if not current_user.has_role("admin"):
    raise HTTPException(status_code=403, detail="Admin access required")

# Check permission
if not current_user.has_permission("users:delete"):
    raise HTTPException(status_code=403, detail="Permission denied")
```

## Input Validation and Sanitization

### Validation Rules
- Validate all inputs at API boundary
- Use Pydantic models for request validation
- Reject invalid inputs early
- Sanitize user-generated content

### SQL Injection Prevention
- Use parameterized queries (ORM handles this)
- Never concatenate user input into SQL
- Use ORM methods, not raw SQL

### XSS Prevention
- Escape user input in HTML/JavaScript contexts
- Use Content Security Policy (CSP) headers
- Sanitize rich text content (HTML sanitization)

### CSRF Protection
- Use CSRF tokens for state-changing operations
- SameSite cookie attribute
- Verify origin/referer headers

## Data Protection

### Encryption
- **In Transit**: TLS 1.2+ for all communications
- **At Rest**: Encrypt sensitive database fields
- **Secrets**: Encrypt secrets in storage

### Data Minimization
- Collect only necessary data
- Delete data when no longer needed
- Anonymize data for analytics

### PII Handling
- Identify and catalog all PII
- Limit access to PII
- Log access to PII
- Encrypt PII at rest

## HIPAA-Aware Guidelines (Future Readiness)

### HIPAA Requirements (If Applicable)
- **Administrative Safeguards**: Security policies, workforce training
- **Physical Safeguards**: Facility access controls
- **Technical Safeguards**: Access control, audit controls, integrity, transmission security

### HIPAA-Compliant Practices
1. **Access Controls**:
   - Unique user identification
   - Automatic logoff
   - Encryption and decryption

2. **Audit Controls**:
   - Log all access to PHI (Protected Health Information)
   - Regular audit log reviews
   - Tamper-proof logs

3. **Integrity**:
   - Ensure PHI is not improperly altered or destroyed
   - Version control for PHI
   - Checksums/validation

4. **Transmission Security**:
   - End-to-end encryption
   - Secure communication protocols
   - Message authentication

5. **Business Associate Agreements (BAA)**:
   - Required for third-party services handling PHI
   - Document data handling procedures

### PHI Handling (If Applicable)
- **Never log PHI** in application logs
- **Encrypt PHI** at rest and in transit
- **Access controls** restrict PHI access
- **Audit trails** for all PHI access
- **Data retention** policies for PHI
- **Breach notification** procedures

## Security Headers

### HTTP Security Headers
```python
# Recommended headers
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Dependency Security

### Dependency Management
- Regularly update dependencies
- Use dependency scanning tools (Snyk, Dependabot)
- Review security advisories
- Pin dependency versions in `requirements.txt`

### Vulnerability Scanning
- Scan dependencies for known vulnerabilities
- Automate scanning in CI/CD pipeline
- Remediate high/critical vulnerabilities immediately

## Incident Response

### Security Incident Procedure
1. **Detection**: Identify security incident
2. **Containment**: Isolate affected systems
3. **Investigation**: Determine scope and impact
4. **Remediation**: Fix vulnerabilities
5. **Recovery**: Restore services
6. **Post-Incident**: Review and improve

### Breach Notification
- Notify affected users within 72 hours (if required by law)
- Document incident details
- Report to authorities if required (HIPAA, GDPR)

## Security Testing

### Testing Practices
- **Penetration Testing**: Regular security audits
- **Vulnerability Scanning**: Automated scans
- **Code Reviews**: Security-focused reviews
- **Security Tests**: Include security tests in test suite

### Security Test Checklist
- [ ] Authentication bypass attempts
- [ ] Authorization checks
- [ ] Input validation
- [ ] SQL injection attempts
- [ ] XSS attempts
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] Error message information disclosure

## Compliance Considerations

### GDPR (If Applicable)
- Right to access, rectification, erasure
- Data portability
- Privacy by design
- Consent management

### CCPA (If Applicable)
- Consumer privacy rights
- Data disclosure requirements
- Opt-out mechanisms

## Security Checklist for New Features

- [ ] Input validation implemented
- [ ] Authentication/authorization checked
- [ ] Sensitive data encrypted
- [ ] No secrets in code/logs
- [ ] Error messages don't leak information
- [ ] Rate limiting applied
- [ ] Security headers set
- [ ] Tests include security scenarios
- [ ] Documentation updated

## Security Resources

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- CWE Top 25: https://cwe.mitre.org/top25/
- NIST Cybersecurity Framework: https://www.nist.gov/cyberframework

