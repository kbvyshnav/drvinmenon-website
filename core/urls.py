from django.urls import path
from . import views

# URL patterns for the core Django app
urlpatterns = [

    # Root URL / renders the home page
    path('', views.home, name='home'),

    # Contact form POST endpoint
    path('contact/', views.home, name='contact'),
]
