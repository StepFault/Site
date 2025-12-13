# Step-by-Step Implementation Plan

## Current State ✅

- **Static site working on Vercel production**
- HTML page with contact form (no functionality)
- CSS styling complete
- Inline JavaScript for mobile menu only
- No backend API
- No contact form submission handling

## Step-by-Step Implementation

### Phase 1: Frontend Setup (JavaScript Extraction)

#### Step 1.1: Extract JavaScript to External File
- [ ] Create `assets/script.js`
- [ ] Move mobile menu toggle code from inline `<script>` to `assets/script.js`
- [ ] Update `index.html` to reference `assets/script.js`
- [ ] Test mobile menu still works

**Acceptance Criteria:**
- Mobile menu toggle works
- No inline JavaScript in HTML
- JavaScript file loads correctly

---

### Phase 2: Backend Foundation

#### Step 2.1: Set Up Python Environment
- [ ] Create `requirements.txt` with dependencies:
  - FastAPI
  - Uvicorn
  - Pydantic
  - email-validator
  - python-dotenv
  - httpx (for testing)
- [ ] Create `.env.example` template
- [ ] Update `.gitignore` to exclude `.env` and `.venv/`

**Acceptance Criteria:**
- `requirements.txt` exists with all dependencies
- `.env.example` documents required variables
- Virtual environment can be created and dependencies installed

#### Step 2.2: Create FastAPI Application Structure
- [ ] Create `src/__init__.py`
- [ ] Create `src/config.py` - Configuration management with Pydantic
- [ ] Create `src/api/__init__.py`
- [ ] Create `src/api/main.py` - FastAPI app initialization
- [ ] Create `src/api/schemas/__init__.py`
- [ ] Create `src/api/schemas/contact.py` - Pydantic models for contact form
- [ ] Create `src/api/routes/__init__.py`
- [ ] Create `src/api/routes/contact.py` - Contact form API endpoint
- [ ] Create `src/services/__init__.py`
- [ ] Create `src/services/core/__init__.py`
- [ ] Create `src/services/core/contact_service.py` - Business logic

**Acceptance Criteria:**
- All directory structure created
- FastAPI app can start with `uvicorn src.api.main:app`
- Health check endpoint works at `/health`

---

### Phase 3: Contact Form API

#### Step 3.1: Implement Contact Form Schema
- [ ] Create `ContactRequest` model (name, email, message)
- [ ] Add validation:
  - Name: 1-100 characters
  - Email: valid email format
  - Message: 10-2000 characters
- [ ] Create `ContactResponse` model (success, message)

**Acceptance Criteria:**
- Pydantic models validate input correctly
- Invalid data returns 422 with clear error messages

#### Step 3.2: Implement Contact Service
- [ ] Create `ContactService` class
- [ ] Implement `process_contact_submission()` method
- [ ] Log submissions (for now, no database)
- [ ] Return success response

**Acceptance Criteria:**
- Service processes valid submissions
- Logs appear in console
- Returns proper response format

#### Step 3.3: Create API Endpoint
- [ ] Create POST `/api/v1/contact` endpoint
- [ ] Add CORS middleware for local development
- [ ] Connect to ContactService
- [ ] Handle validation errors
- [ ] Add alias route `/api/contact` for Vercel compatibility

**Acceptance Criteria:**
- Endpoint accepts POST requests
- Valid submissions return 200 with success message
- Invalid submissions return 422 with error details
- CORS allows frontend to call API

---

### Phase 4: Frontend Integration

#### Step 4.1: Add Contact Form Handler
- [ ] Add form submission handler to `assets/script.js`
- [ ] Prevent default form submission
- [ ] Collect form data (name, email, message)
- [ ] Add client-side validation
- [ ] Make fetch request to `/api/contact`
- [ ] Handle success/error responses
- [ ] Show user feedback messages
- [ ] Reset form on success

**Acceptance Criteria:**
- Form doesn't submit via default HTML behavior
- JavaScript collects form data correctly
- API request is made to correct endpoint
- Success message displays to user
- Error messages display for failures
- Form resets after successful submission

#### Step 4.2: Update HTML
- [ ] Add `id="contactForm"` to form element
- [ ] Ensure form has proper structure
- [ ] Test form submission flow

**Acceptance Criteria:**
- Form has proper ID for JavaScript targeting
- All form fields are accessible
- Form structure supports JavaScript handling

---

### Phase 5: Testing

#### Step 5.1: Set Up Test Infrastructure
- [ ] Create `tests/__init__.py`
- [ ] Create `tests/conftest.py` with FastAPI test client
- [ ] Create `tests/test_api/__init__.py`
- [ ] Create `tests/test_api/test_contact.py`

**Acceptance Criteria:**
- Test infrastructure set up
- Can run `pytest` successfully

#### Step 5.2: Write Tests
- [ ] Test successful contact submission
- [ ] Test missing required fields
- [ ] Test invalid email format
- [ ] Test message length validation
- [ ] Test name length validation

**Acceptance Criteria:**
- All tests pass
- Test coverage > 80%
- Tests cover happy path and error cases

---

### Phase 6: Vercel Deployment

#### Step 6.1: Create Vercel Serverless Function
- [ ] Create `api/contact.py` - Vercel Python function
- [ ] Use BaseHTTPRequestHandler format (Vercel requirement)
- [ ] Implement same validation as FastAPI endpoint
- [ ] Handle CORS properly
- [ ] Log submissions

**Acceptance Criteria:**
- Function follows Vercel Python format
- Function validates input correctly
- Function returns proper responses
- CORS headers included

#### Step 6.2: Configure Vercel
- [ ] Create `vercel.json` (minimal, let Vercel auto-detect)
- [ ] Ensure static files are served
- [ ] Ensure Python function is detected

**Acceptance Criteria:**
- `vercel.json` doesn't break static file serving
- Function is detected in Vercel Functions tab
- Static site still works

#### Step 6.3: Update Frontend for Vercel
- [ ] Update JavaScript to call `/api/contact.py` (Vercel format)
- [ ] Or use `/api/contact` if routing works
- [ ] Test on Vercel deployment

**Acceptance Criteria:**
- Contact form works on Vercel production
- Submissions are logged
- User sees success/error messages

---

### Phase 7: Documentation & Cleanup

#### Step 7.1: Update Documentation
- [ ] Update README.md with new setup instructions
- [ ] Document contact form API in docs/
- [ ] Update deployment docs if needed

#### Step 7.2: Clean Up
- [ ] Remove any temporary files
- [ ] Ensure .gitignore is complete
- [ ] Verify all files are properly organized

---

## Implementation Order

**Recommended sequence:**
1. Phase 1 (Frontend Setup) - Quick win, improves code organization
2. Phase 2 (Backend Foundation) - Sets up structure
3. Phase 3 (Contact Form API) - Core functionality
4. Phase 4 (Frontend Integration) - Connects frontend to backend
5. Phase 5 (Testing) - Ensures quality
6. Phase 6 (Vercel Deployment) - Makes it work in production
7. Phase 7 (Documentation) - Completes the work

---

## Key Decisions Made

1. **FastAPI for backend** - Per TECH_STACK.md
2. **Vanilla JavaScript** - No frameworks needed
3. **Vercel serverless functions** - For production deployment
4. **Pydantic validation** - Type-safe data validation
5. **No database initially** - Log submissions, add storage later

---

## Next Immediate Steps

1. **Extract JavaScript** (Phase 1.1) - 5 minutes
2. **Set up requirements.txt** (Phase 2.1) - 10 minutes
3. **Create FastAPI structure** (Phase 2.2) - 15 minutes
4. **Implement contact API** (Phase 3) - 30 minutes
5. **Connect frontend** (Phase 4) - 20 minutes

**Total estimated time for MVP: ~1.5 hours**

---

**Ready to start? Let's begin with Phase 1!**

