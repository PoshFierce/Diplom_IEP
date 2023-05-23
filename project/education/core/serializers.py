from rest_framework import serializers

from core.models import Course, IndividualPlan, Keyword

from account.serializers import UserInfoSerializer


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
    space_left = serializers.SerializerMethodField()
    keywords = KeywordSerializer(many=True)

    def get_is_disabled(self, obj):
        user = self.context['request'].user
        if user.studentprofile:
            plan, _ = IndividualPlan.objects.get_or_create(user=user)
            courses = plan.courses.values_list('id', flat=True)
            return obj.id in courses or obj.semester < user.studentprofile.semester

    def get_space_left(self, obj):
        return obj.max_students_count - obj.plans.count()

    class Meta:
        model = Course
        fields = '__all__'
