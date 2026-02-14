from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, viewsets
from rest_framework.response import Response
from .models import Quiz, Attempt, Question
from .serializers import QuizSerializer, AttemptSerializer, QuestionCreateSerializer, QuestionSerializer
from django.shortcuts import get_object_or_404


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def quiz_list(request):
    quizzes = Quiz.objects.all()
    serializer = QuizSerializer(quizzes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def quiz_detail(request, quiz_id):
    quiz = get_object_or_404(Quiz, id=quiz_id)
    serializer = QuizSerializer(quiz)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_attempt(request):
    user = request.user
    quiz_id = request.data.get('quiz_id')
    answers = request.data.get('answers')

    quiz = Quiz.objects.get(id=quiz_id)
    questions = quiz.questions.all()

    score = 0

    for question in questions:
        selected_option_id = answers.get(str(question.id))
        correct_option = question.options.filter(is_correct=True).first()
        if correct_option and correct_option.id == selected_option_id:
            score += 1

    Attempt.objects.create(user=user, quiz=quiz, score=score)

    return Response({"message": "Attempt submitted", "score": score})


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def add_question(request):
    if not request.user.is_staff:
        return Response({"error": "Only admin can add or modify questions."}, status=403)
    serializer = QuestionCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Question added successfully"}, status=201)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def add_subject(request):
    if not request.user.is_staff:
        return Response({"error": "Only admin can add or modify subjects."}, status=403)
    serializer = QuizSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(created_by=request.user)
        return Response({"message": "Subject added successfully"}, status=201)
    return Response(serializer.errors, status=400)


class QuestionDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Question deleted"}, status=200)


class QuizDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_object(self):
        quiz_id = self.kwargs.get('quiz_id')
        return get_object_or_404(Quiz, id=quiz_id)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        print("Recived Data:", request.data)
        serilizer = self.get_serializer(instance, data=request.data)
        serilizer.is_valid(raise_exception=True)
        serilizer.save()
        return Response({'message': 'Subject updated'}, status=200)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"id": instance.id, 'message': 'Subject deleted'}, status=200)
