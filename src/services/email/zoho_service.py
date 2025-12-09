"""Zoho Mail service for sending emails via SMTP."""

import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import aiosmtplib

from src.config import settings

logger = logging.getLogger(__name__)


class ZohoEmailService:
    """Service for sending emails via Zoho SMTP."""
    
    def __init__(self):
        """Initialize Zoho email service with settings."""
        self.smtp_host = settings.zoho_smtp_host
        self.smtp_port = settings.zoho_smtp_port
        self.email = settings.zoho_email
        self.password = settings.zoho_password
        self.notification_email = settings.notification_email
    
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
        
        try:
            msg = MIMEMultipart()
            msg['From'] = self.email
            msg['To'] = self.notification_email
            msg['Subject'] = f"New Contact Form Submission from {submitter_name}"
            
            body = f"""
New contact form submission received:

Name: {submitter_name}
Email: {submitter_email}
Message:
{message}

---
This is an automated notification from StepFault contact form.
"""
            
            msg.attach(MIMEText(body, 'plain'))
            
            await aiosmtplib.send(
                msg,
                hostname=self.smtp_host,
                port=self.smtp_port,
                username=self.email,
                password=self.password,
                use_tls=True,
            )
            
            logger.info(f"Notification email sent to {self.notification_email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send notification email: {e}", exc_info=True)
            return False
    
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
        
        try:
            msg = MIMEMultipart()
            msg['From'] = self.email
            msg['To'] = recipient_email
            msg['Subject'] = "Thank you for contacting StepFault"
            
            body = f"""Hello {recipient_name},

Thank you for reaching out to StepFault! We've received your message and will get back to you as soon as possible.

We appreciate your interest in our Creative AI & Quantum Computing Solutions.

Best regards,
The StepFault Team

---
This is an automated response. Please do not reply to this email.
"""
            
            msg.attach(MIMEText(body, 'plain'))
            
            await aiosmtplib.send(
                msg,
                hostname=self.smtp_host,
                port=self.smtp_port,
                username=self.email,
                password=self.password,
                use_tls=True,
            )
            
            logger.info(f"Auto-reply email sent to {recipient_email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send auto-reply email: {e}", exc_info=True)
            return False

