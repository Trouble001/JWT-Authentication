from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed


class JWTAuthenticationFromCookie(JWTAuthentication):
    def authenticate(self, request):
        # Try to get the access token from cookies
        raw_token = request.COOKIES.get("access")

        if raw_token is None:
            return None  # No token found in cookies

        try:
            # Validate token
            validated_token = self.get_validated_token(raw_token)
            return self.get_user(validated_token), validated_token
        except Exception:
            raise AuthenticationFailed("Invalid or expired token")
