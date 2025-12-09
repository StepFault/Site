"""Tests for contact form API endpoint."""

import pytest
from fastapi.testclient import TestClient


def test_contact_submission_success(client: TestClient):
    """Test successful contact form submission."""
    response = client.post(
        "/api/contact",
        json={
            "name": "John Doe",
            "email": "john.doe@example.com",
            "message": "This is a test message with enough characters to pass validation."
        }
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "message" in data
    assert len(data["message"]) > 0


def test_contact_submission_missing_name(client: TestClient):
    """Test contact form submission with missing name."""
    response = client.post(
        "/api/contact",
        json={
            "email": "test@example.com",
            "message": "This is a test message with enough characters."
        }
    )
    
    assert response.status_code == 422
    data = response.json()
    assert "detail" in data


def test_contact_submission_missing_email(client: TestClient):
    """Test contact form submission with missing email."""
    response = client.post(
        "/api/contact",
        json={
            "name": "Test User",
            "message": "This is a test message with enough characters."
        }
    )
    
    assert response.status_code == 422
    data = response.json()
    assert "detail" in data


def test_contact_submission_missing_message(client: TestClient):
    """Test contact form submission with missing message."""
    response = client.post(
        "/api/contact",
        json={
            "name": "Test User",
            "email": "test@example.com"
        }
    )
    
    assert response.status_code == 422
    data = response.json()
    assert "detail" in data


def test_contact_submission_invalid_email(client: TestClient):
    """Test contact form submission with invalid email format."""
    response = client.post(
        "/api/contact",
        json={
            "name": "Test User",
            "email": "not-an-email",
            "message": "This is a test message with enough characters."
        }
    )
    
    assert response.status_code == 422
    data = response.json()
    assert "detail" in data


def test_contact_submission_message_too_short(client: TestClient):
    """Test contact form submission with message too short."""
    response = client.post(
        "/api/contact",
        json={
            "name": "Test User",
            "email": "test@example.com",
            "message": "Short"
        }
    )
    
    assert response.status_code == 422
    data = response.json()
    assert "detail" in data


def test_contact_submission_name_too_long(client: TestClient):
    """Test contact form submission with name exceeding max length."""
    long_name = "a" * 101  # 101 characters
    response = client.post(
        "/api/contact",
        json={
            "name": long_name,
            "email": "test@example.com",
            "message": "This is a test message with enough characters."
        }
    )
    
    assert response.status_code == 422
    data = response.json()
    assert "detail" in data


def test_contact_submission_message_too_long(client: TestClient):
    """Test contact form submission with message exceeding max length."""
    long_message = "a" * 2001  # 2001 characters
    response = client.post(
        "/api/contact",
        json={
            "name": "Test User",
            "email": "test@example.com",
            "message": long_message
        }
    )
    
    assert response.status_code == 422
    data = response.json()
    assert "detail" in data


def test_contact_submission_v1_endpoint(client: TestClient):
    """Test that /api/v1/contact endpoint also works."""
    response = client.post(
        "/api/v1/contact",
        json={
            "name": "Jane Doe",
            "email": "jane.doe@example.com",
            "message": "This is a test message with enough characters to pass validation."
        }
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True


def test_contact_submission_whitespace_trimming(client: TestClient):
    """Test that whitespace is properly trimmed from inputs."""
    response = client.post(
        "/api/contact",
        json={
            "name": "  Test User  ",
            "email": "  test@example.com  ",
            "message": "  This is a test message with enough characters.  "
        }
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True

