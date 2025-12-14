"""Zoho Mail service for sending emails via SMTP."""

import logging
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

logger = logging.getLogger(__name__)


class ZohoEmailService:
    """Service for sending emails via Zoho SMTP."""
    
    def __init__(self):
        """Initialize Zoho email service from environment variables."""
        # Read directly from os.environ
        self.email = os.environ.get("ZOHO_EMAIL", "")
        self.password = os.environ.get("ZOHO_PASSWORD", "")
        self.smtp_host = os.environ.get("ZOHO_SMTP_HOST", "smtp.zoho.com")
        self.smtp_port = int(os.environ.get("ZOHO_SMTP_PORT", "587"))
        self.notification_email = os.environ.get("NOTIFICATION_EMAIL", "")
        
        # Determine if using SSL (465) or TLS (587)
        self.use_ssl = self.smtp_port == 465
        self.use_tls = self.smtp_port == 587
    
    def _send_email_sync(
        self,
        to_email: str,
        subject: str,
        body: str,
    ) -> bool:
        """
        Internal method to send email synchronously using smtplib.
        
        Args:
            to_email: Recipient email address
            subject: Email subject
            body: Email body (plain text)
            
        Returns:
            True if email sent successfully, False otherwise
        """
        if not self.email or not self.password:
            logger.warning("Zoho email credentials not configured")
            return False
        
        try:
            msg = MIMEMultipart()
            msg['From'] = self.email
            msg['To'] = to_email
            msg['Subject'] = subject
            msg.attach(MIMEText(body, 'plain'))
            
            # Connect to SMTP server
            if self.use_ssl:
                # Port 465: Use SSL
                server = smtplib.SMTP_SSL(self.smtp_host, self.smtp_port)
            else:
                # Port 587: Use TLS
                server = smtplib.SMTP(self.smtp_host, self.smtp_port)
                server.starttls()
            
            # Login and send
            server.login(self.email, self.password)
            server.send_message(msg)
            server.quit()
            
            logger.info(f"Email sent successfully to {to_email}")
            return True
            
        except smtplib.SMTPException as e:
            logger.error(f"SMTP error sending email to {to_email}: {e}", exc_info=True)
            return False
        except Exception as e:
            logger.error(f"Unexpected error sending email to {to_email}: {e}", exc_info=True)
            return False
    
    async def send_notification(
        self,
        submitter_name: str,
        submitter_email: str,
        message: str,
    ) -> bool:
        """
        Send notification email to admin when form is submitted.
        
        Args:
            submitter_name: Name of the person who submitted the form
            submitter_email: Email of the person who submitted the form
            message: Message content
            
        Returns:
            True if email sent successfully, False otherwise
        """
        if not self.notification_email:
            logger.warning("NOTIFICATION_EMAIL not set, skipping notification email")
            return False
        
        if not self.email or not self.password:
            logger.warning("Zoho email credentials not configured, skipping notification")
            return False
        
        subject = f"New Contact Form Submission from {submitter_name}"
        body = f"""New contact form submission received:

Name: {submitter_name}
Email: {submitter_email}
Message:
{message}

---
This is an automated notification from StepFault contact form.
"""
        
        # Run sync smtplib in executor to avoid blocking
        import asyncio
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(
            None,
            self._send_email_sync,
            self.notification_email,
            subject,
            body,
        )
    
    async def send_auto_reply(
        self,
        recipient_name: str,
        recipient_email: str,
    ) -> bool:
        """
        Send auto-reply email to form submitter.
        
        Args:
            recipient_name: Name of the person who submitted the form
            recipient_email: Email of the person who submitted the form
            
        Returns:
            True if email sent successfully, False otherwise
        """
        if not self.email or not self.password:
            logger.warning("Zoho email credentials not configured, skipping auto-reply")
            return False
        
        subject = "Thank you for contacting StepFault"
        body = f"""Hello {recipient_name},

Thank you for reaching out to StepFault! We've received your message and will get back to you as soon as possible.

We appreciate your interest in our Creative AI & Quantum Computing Solutions.

Best regards,
The StepFault Team

---
This is an automated response. Please do not reply to this email.
"""
        
        # Run sync smtplib in executor to avoid blocking
        import asyncio
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(
            None,
            self._send_email_sync,
            recipient_email,
            subject,
            body,
        )

