from rest_framework import serializers

from core.models import Course, IndividualPlan

from account.serializers import UserInfoSerializer


class SimpleCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'title')


class CourseSerializer(serializers.ModelSerializer):
    teacher = UserInfoSerializer()
    past_courses = SimpleCourseSerializer(many=True)
    future_courses = SimpleCourseSerializer(many=True)
    is_disabled = serializers.SerializerMethodField()

    def get_is_disabled(self, obj):
        user = self.context['request'].user
        if user.studentprofile:
            plan, _ = IndividualPlan.objects.get_or_create(user=user)
            courses = plan.courses.values_list('id', flat=True)
            return obj.id in courses or obj.semester < user.studentprofile.semester

    class Meta:
        model = Course
        fields = '__all__'