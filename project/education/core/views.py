import json

from django.db.models import Q
from rest_framework import viewsets, permissions, status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Course, IndividualPlan, Keyword
from .serializers import CourseSerializer, KeywordSerializer


class KeywordsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Keyword.objects.all()
    serializer_class = KeywordSerializer


class CourseViewSet(viewsets.ViewSet):
    def list(self, request):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_403_FORBIDDEN)

        queryset = Course.objects.none()
        if request.GET.get('view'):
            queryset = Course.objects.filter(is_mandatory=False)
        elif request.user.is_authenticated:
            plan = IndividualPlan.objects.get(user=request.user)
            plan_courses = list(plan.courses.values_list('id', flat=True))
            queryset = Course.objects.filter(Q(is_mandatory=True) | Q(id__in=plan_courses))

        serializer = CourseSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Course.objects.all()
        course = get_object_or_404(queryset, pk=pk)
        serializer = CourseSerializer(course, context={'request': request})
        return Response(serializer.data)

    def patch(self, request, pk=None):
        ''' Используется для добавления курса в план '''
        if request.user.is_authenticated:
            queryset = Course.objects.all()
            course = get_object_or_404(queryset, pk=pk)
            plan = IndividualPlan.objects.get(user=request.user)
            plan.courses.add(course)
            plan.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_403_FORBIDDEN)

    def create(self, request):
        if request.user.is_admin:
            blob = request.data.get('document').read().decode("utf-8")
            blob = json.loads(blob)
            serializer = CourseSerializer(data=blob)
            if serializer.is_valid():
                serializer = serializer.data
                course = Course.objects.create(teacher=request.user,
                                               title=serializer.get('title'),
                                               )
                serializer = CourseSerializer(course, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            response = {'message': 'Function is allowed for teachers only.'}
            return Response(response, status=status.HTTP_403_FORBIDDEN)

    def update(self, request, pk=None):
        if request.user.is_admin:
            blob = request.data.get('document').read().decode("utf-8")
            blob = json.loads(blob)
            serializer = CourseSerializer(data=blob)
            if serializer.is_valid():
                try:
                    course = Course.objects.get(pk=pk, teacher=request.user)
                    serializer = serializer.data

                    course.name = serializer.get('title')
                    course.save()
                    serializer = CourseSerializer(course, context={'request': request})

                    return Response(serializer.data, status=status.HTTP_200_OK)
                except Course.DoesNotExist:
                    response = {'message': 'Function is allowed for manager only.'}
                    return Response(status=status.HTTP_403_FORBIDDEN)
            else:
                return Response(serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            response = {'message': 'Function is allowed for managers only.'}
            return Response(response, status=status.HTTP_403_FORBIDDEN)


class StaticAuth(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, _):
        return Response()
