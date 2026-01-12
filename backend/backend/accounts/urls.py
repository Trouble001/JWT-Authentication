from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('register/', views.register),
    path('login/', views.login_view),
    path('logout/', views.logout_view),
    path('user/', views.user_view),
    path("refresh/", views.refresh_token_view),
    path('forgot-password/', views.forgot_password),
    path('reset-password/', views.reset_password),
]

router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')

urlpatterns += router.urls
