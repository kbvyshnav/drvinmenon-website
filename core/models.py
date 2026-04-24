from django.db import models


class ContactMessage(models.Model):
    """
    Stores each contact form submission.
    Every time someone fills the contact form
    on the website, a new row is added here.
    """

    # Sender full name — max 100 characters
    name = models.CharField(max_length=100)

    # Sender email address — validated by Django
    email = models.EmailField()

    # The message content — unlimited length
    message = models.TextField()

    # Auto set to exact date and time of submission
    # auto_now_add means it is set once on creation
    # and never changed after that
    created_at = models.DateTimeField(auto_now_add=True)

    # Track whether the message has been read
    # in the Django admin panel
    is_read = models.BooleanField(default=False)

    class Meta:
        # Show newest messages first in admin
        ordering = ['-created_at']
        verbose_name = 'Contact Message'
        verbose_name_plural = 'Contact Messages'

    def __str__(self):
        # Text shown for each message in admin
        return f"Message from {self.name} — {self.email}"
