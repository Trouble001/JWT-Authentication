from rest_framework import serializers
from .models import *


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'text', 'is_correct']


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)
    quiz = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'quiz', 'options']

    def update(self, instance, validated_data):
        options_data = validated_data.pop('options', [])
        instance.text = validated_data.get('text', instance.text)
        instance.save()

        existing_option_ids = [opt['id']
                               for opt in options_data if 'id' in opt]
        # Delete removed options
        instance.options.exclude(id__in=existing_option_ids).delete()

        for option_data in options_data:
            option_id = option_data.get('id', None)
            if option_id:
                # Update existing option
                option_instance = instance.options.get(id=option_id)
                option_instance.text = option_data.get(
                    'text', option_instance.text)
                option_instance.is_correct = option_data.get(
                    'is_correct', option_instance.is_correct)
                option_instance.save()
            else:
                # Create new option
                Option.objects.create(question=instance, **option_data)

        return instance



class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description', 'questions']
        read_only_fields = ['id', 'questions', 'created_by']


class AttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attempt
        fields = ['quiz', 'score']


class OptionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['text', 'is_correct']


class QuestionCreateSerializer(serializers.ModelSerializer):
    options = OptionCreateSerializer(many=True)

    class Meta:
        model = Question
        fields = ['quiz', 'text', 'options']

    def create(self, validated_data):
        options_data = validated_data.pop('options')
        question = Question.objects.create(**validated_data)
        for option_data in options_data:
            Option.objects.create(question=question, **option_data)
        return question
