from djoser.serializers import UserSerializer
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import User, StudentProfile


class StudentProfileSerializer(ModelSerializer):
    semester = serializers.SerializerMethodField()

    def get_semester(self, obj):
        return obj.semester

    class Meta(UserSerializer):
        model = StudentProfile
        fields = ('status', 'course', 'semester', 'avg_score')


class UserInfoSerializer(UserSerializer):
    name = serializers.SerializerMethodField()
    profile = StudentProfileSerializer(source='studentprofile')

    def get_name(self, obj):
        return f'{obj.last_name} {obj.first_name}'

    class Meta(UserSerializer):
        model = User
        fields = ('id', 'name', 'email', 'profile', 'username')
