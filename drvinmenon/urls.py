from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [

    # Django admin panel at /admin/
    path('admin/', admin.site.urls),

    # All core app URLs start from root /
    path('', include('core.urls')),
]

# Serve media files in development only
# Production uses Nginx or similar
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )
