from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth import authenticate, get_user_model
from .serializers import CustomUserSerializer, RegisterSerializer
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes, force_str
from .utils import account_token
from django.core.mail import EmailMultiAlternatives
from django.utils.html import format_html

User = get_user_model()


@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if not serializer:
        return Response({'error': 'All fields are required'}, status=400)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered'}, status=201)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = User.objects.filter(username=username).first()
    if not user:
        return Response({'error': 'Username not found'}, status=400)

    if not user.check_password(password):
        return Response({'error': 'Incorrect password'}, status=400)

    user = authenticate(username=username, password=password)
    refresh = RefreshToken.for_user(user)
    response = Response({'message': 'Logged in'})
    response.set_cookie('access', str(refresh.access_token),
                        httponly=True, secure=True, max_age=900)
    response.set_cookie('refresh', str(refresh),
                        httponly=True, secure=True, max_age=604800)
    return response


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    response = Response({'message': 'Logged out'})
    response.delete_cookie('access')
    response.delete_cookie('refresh')
    return response


@api_view(['POST'])
def refresh_token_view(request):
    refresh_token = request.COOKIES.get('refresh')
    if not refresh_token:
        response = Response(
            {'error': 'Session end. Please reauthenticate'}, status=401)
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        return response

    try:
        refresh = RefreshToken(refresh_token)
        access_token = str(refresh.access_token)

        response = Response({'access': access_token})
        response.set_cookie(
            key='access',
            value=access_token,
            httponly=True,
            samesite='Lax',
            secure=True,
            max_age=900,
        )
        return response

    except Exception as e:
        print("Refresh error:", e)
        response = Response({'error': 'Invalid refresh token'}, status=401)
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        return response


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]


@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def user_view(request):
    token = request.COOKIES.get('access')
    if not token:
        return Response({'error': 'Unauthenticated'}, status=401)
    try:
        u = AccessToken(token)['user_id']
        user = User.objects.get(id=u)
    except:
        return Response({'error': 'Invalid token'}, status=401)

    if request.method == 'GET':
        return Response(CustomUserSerializer(user).data)

    if request.method == 'PATCH':
        serializer = CustomUserSerializer(
            user, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


@api_view(['POST'])
def forgot_password(request):
    email = request.data.get('email')
    user = User.objects.filter(email=email).first()

    if not user:
        return Response({'error': 'No user found with that email'}, status=400)

    if user:
        token = account_token.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        link = f"http://localhost:5173/reset-password/{uid}/{token}/"

        html_content = format_html(
            '<p>Click the button below to reset your password:</p>'
            '<p><a href="{}" target="_blank" '
            'style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">'
            'Reset Password</a></p>', link
        )

        # Fallback plain text
        text_content = f'Click the link to reset your password: {link}'

        email = EmailMultiAlternatives(
            subject='Password Reset',
            body=text_content,
            from_email='noreply@example.com',
            to=[email],
        )
        email.attach_alternative(html_content, "text/html")
        email.send()
    return Response({'message': 'Password reset link sent to your registered email'})


@api_view(['POST'])
def reset_password(request):
    uidb64 = request.data.get('uid')
    token = request.data.get('token')
    new_password = request.data.get('password')

    if len(new_password) < 8:
        return Response({"error": "Password must be at least 8 characters long."}, status=400)

    if not uidb64 or not token or not new_password:
        return Response({'error': 'Missing fields'}, status=400)

    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)

        if default_token_generator.check_token(user, token):
            user.set_password(new_password)
            user.save()
            return Response({'message': 'Password reset successful'})
        else:
            return Response({'error': 'Invalid or expired token'}, status=400)
    except Exception as e:
        print("Reset error:", e)
        return Response({'error': 'Something went wrong'}, status=400)
