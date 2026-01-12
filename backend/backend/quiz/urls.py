from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet, basename='category')

urlpatterns = [
    path('', include(router.urls)),

    path('add_subject/', views.add_subject),
    path('add_question/', views.add_question),
    path('questions/<int:pk>/', views.QuestionDetailAPIView.as_view()),
    path('submit/', views.submit_attempt),
    path('<int:quiz_id>/', views.QuizDetailAPIView.as_view()),
    path('quiz_attempt/<int:quiz_id>/', views.quiz_detail),
]
