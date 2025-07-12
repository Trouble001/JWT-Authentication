from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register),
    path('login/', views.login_view),
    path('logout/', views.logout_view),
    path('user/', views.user_view),
    path("refresh/", views.refresh_token_view),
    path('forgot-password/', views.forgot_password),
    path('reset-password/', views.reset_password),
]
