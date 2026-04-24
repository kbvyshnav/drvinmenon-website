from django.contrib import admin
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    """
    Controls how ContactMessage appears
    in the Django admin panel.
    """

    # Columns shown in the message list view
    list_display = [
        'name',
        'email',
        'created_at',
        'is_read',
    ]

    # Sidebar filters for quick filtering
    list_filter = ['is_read', 'created_at']

    # Search bar searches these fields
    search_fields = ['name', 'email', 'message']

    # Toggle is_read directly from list view
    list_editable = ['is_read']

    # Newest messages appear first
    ordering = ['-created_at']

    # These fields cannot be edited in admin
    # Contact submissions should not be modified
    readonly_fields = [
        'name',
        'email',
        'message',
        'created_at',
    ]
