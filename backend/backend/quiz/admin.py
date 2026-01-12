from django.contrib import admin
from .models import Category, Quiz, Question, Option, Attempt, UserAnswer


class QuizInline(admin.TabularInline):
    model = Quiz
    extra = 1


class OptionInline(admin.TabularInline):
    model = Option
    extra = 2


class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    inlines = [QuizInline]
    list_display = ('id', 'title')


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('category', 'title', 'created_by', 'created_at')
    inlines = [QuestionInline]
    search_fields = ('title', 'description')
    list_filter = ('created_at',)


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'quiz')
    inlines = [OptionInline]
    search_fields = ('text',)
    list_filter = ('quiz',)


@admin.register(Option)
class OptionAdmin(admin.ModelAdmin):
    list_display = ('text', 'question', 'is_correct')
    list_filter = ('is_correct',)


@admin.register(Attempt)
class AttemptAdmin(admin.ModelAdmin):
    list_display = ('user', 'quiz', 'score', 'attempt_at')
    list_filter = ('quiz', 'user', 'attempt_at')
    search_fields = ('user__username', 'quiz__title')


@admin.register(UserAnswer)
class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ('attempt', 'question', 'selected_option', 'submitted_at')
    list_filter = ('question', 'submitted_at')
    search_fields = ('question__text', 'selected_option__text')
