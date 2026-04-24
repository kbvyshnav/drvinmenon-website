from django import forms
from .models import ContactMessage


class ContactForm(forms.ModelForm):
    """
    A form based on the ContactMessage model.
    Django automatically creates the right
    input fields based on the model fields.
    """

    class Meta:
        # Which model this form is based on
        model = ContactMessage

        # Only show these three fields
        # created_at and is_read are automatic
        fields = ['name', 'email', 'message']

        # Add CSS classes and placeholder text
        # to match our existing HTML and CSS
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'footer__input',
                'placeholder': 'Your Name',
                'autocomplete': 'name',
                'id': 'form-name',
            }),
            'email': forms.EmailInput(attrs={
                'class': 'footer__input',
                'placeholder': 'Your Email',
                'autocomplete': 'email',
                'id': 'form-email',
            }),
            'message': forms.Textarea(attrs={
                'class': 'footer__textarea',
                'placeholder': 'Your Message',
                'rows': '4',
                'id': 'form-message',
            }),
        }

    def clean_name(self):
        """
        Extra validation for the name field.
        Runs after the basic required check.
        """
        name = self.cleaned_data.get('name', '').strip()
        if len(name) < 2:
            raise forms.ValidationError(
                'Please enter your full name.'
            )
        return name

    def clean_message(self):
        """
        Extra validation for the message field.
        Ensures message is meaningful length.
        """
        message = self.cleaned_data.get(
            'message', ''
        ).strip()
        if len(message) < 10:
            raise forms.ValidationError(
                'Please write at least 10 characters.'
            )
        return message
