from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth import authenticate, get_user_model
from .serializers import CustomUserSerializer, RegisterSerializer

User = get_user_model()

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered'}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def login_view(request):
    username, password = request.data.get('username'), request.data.get('password')
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid credentials'}, status=400)
    refresh = RefreshToken.for_user(user)
    response = Response({'message': 'Logged in'})
    response.set_cookie('access', str(refresh.access_token), httponly=True, max_age=120)
    response.set_cookie('refresh', str(refresh), httponly=True, max_age=604800)
    return response

@api_view(['POST'])
def logout_view(request):
    response = Response({'message': 'Logged out'})
    response.delete_cookie('access')
    response.delete_cookie('refresh')
    return response

@api_view(['POST'])
def refresh_token_view(request):
    token = request.COOKIES.get('refresh')
    if not token:
        return Response({'error': 'No refresh token'}, status=401)
    try:
        new = RefreshToken(token).access_token
        response = Response({'access': str(new)})
        response.set_cookie('access', str(new), httponly=True, max_age=120)
        return response
    except:
        return Response({'error': 'Invalid refresh'}, status=401)

@api_view(['GET'])
def user_view(request):
    token = request.COOKIES.get('access')
    if not token:
        return Response({'error': 'Unauthenticated'}, status=401)
    try:
        u = AccessToken(token)['user_id']
        user = User.objects.get(id=u)
        return Response(CustomUserSerializer(user).data)
    except:
        return Response({'error': 'Invalid token'}, status=401)
