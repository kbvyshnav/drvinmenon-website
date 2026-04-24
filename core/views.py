from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
from .forms import ContactForm


def home(request):
    """
    Main view that renders the home page.
    Also handles contact form AJAX submissions.
    GET: renders index.html with empty form
    POST: processes contact form submission
    """

    if request.method == 'POST':

        # Check if this came from our JavaScript
        # AJAX request in main.js
        is_ajax = request.headers.get(
            'X-Requested-With'
        ) == 'XMLHttpRequest'

        # Create form instance with submitted data
        form = ContactForm(request.POST)

        if form.is_valid():

            # Save valid submission to database
            contact_message = form.save()

            # Send email notification
            # In development this prints to terminal
            # In production it sends a real email
            try:
                send_mail(
                    subject=(
                        f"New contact from "
                        f"{contact_message.name}"
                    ),
                    message=(
                        f"Name: {contact_message.name}\n"
                        f"Email: {contact_message.email}\n\n"
                        f"Message:\n{contact_message.message}"
                    ),
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.CONTACT_EMAIL],
                    fail_silently=True,
                )
            except Exception:
                # Email failure should not break
                # the form — message is still saved
                pass

            if is_ajax:
                return JsonResponse({
                    'success': True,
                    'message': (
                        'Thank you! Your message '
                        'has been received.'
                    )
                })

        else:
            # Return validation errors to JavaScript
            if is_ajax:
                return JsonResponse({
                    'success': False,
                    'errors': form.errors
                })

    # GET request — render page with empty form
    form = ContactForm()
    return render(
        request,
        'core/index.html',
        {'form': form}
    )
