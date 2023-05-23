from djoser.email import ActivationEmail, PasswordResetEmail


class CustomActivationEmail(ActivationEmail):
    template_name = 'account/activation.html'


class CustomPasswordResetEmail(PasswordResetEmail):
    template_name = 'account/password_reset.html'
