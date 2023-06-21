from rest_framework import serializers

from core.models import Course, IndividualPlan, Keyword

from account.serializers import UserInfoSerializer
from core.utils import get_classifier, predict



class SimpleCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'title')


class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = ('id', 'title')


class CourseSerializer(serializers.ModelSerializer):
    teacher = UserInfoSerializer()
    past_courses = SimpleCourseSerializer(many=True)
    future_courses = SimpleCourseSerializer(many=True)
    is_disabled = serializers.SerializerMethodField()
    is_prediction = serializers.SerializerMethodField()
    keywords = KeywordSerializer(many=True)

    def get_is_prediction(self, obj):
        predictions = self.context['predictions']
        return obj.title in predictions

    def get_is_disabled(self, obj):
        user = self.context['request'].user
        if user.studentprofile:
            plan, _ = IndividualPlan.objects.get_or_create(user=user)
            courses = plan.courses.values_list('id', flat=True)
            return obj.id in courses or obj.semester < user.studentprofile.semester

    class Meta:
        model = Course
        fields = '__all__'