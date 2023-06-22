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
    is_good = serializers.SerializerMethodField()
    is_bad = serializers.SerializerMethodField()
    keywords = KeywordSerializer(many=True)

    def get_is_good(self, obj):
        predictions = self.context['predictions']
        return obj.title in predictions

    def get_is_disabled(self, obj):
        user = self.context['request'].user
        if user.studentprofile:
            plan, _ = IndividualPlan.objects.get_or_create(user=user)
            has_chosen = plan.courses.filter(id=obj.id).exists()
            has_chosen_similar = plan.courses.filter(is_technical=obj.is_technical).exists()
            required_courses = obj.past_courses.values_list('id', flat=True)
            plan_courses = plan.courses.values_list('id', flat=True)
            has_not_required_course = len(list(set(required_courses).difference(set(plan_courses)))) > 0
            return has_not_required_course or not obj.space_left or has_chosen or has_chosen_similar or obj.semester < user.studentprofile.semester

    def get_is_bad(self, obj):
        user = self.context['request'].user
        if user.studentprofile:
            return obj.avg_score > user.studentprofile.avg_score

    class Meta:
        model = Course
        fields = '__all__'