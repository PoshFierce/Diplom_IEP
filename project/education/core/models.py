from django.db import models
from django.utils.timezone import now

from education.settings import DEFAULT_MAX_LENGTH

from account.models import User


class SemesterChoices(models.IntegerChoices):
    FIRST = 1, '1'
    SECOND = 2, '2'
    THIRD = 3, '3'
    FOURTH = 4, '4'
    FIFTH = 5, '5'
    SIXTH = 6, '6'
    SEVENTH = 7, '7'
    EIGHTH = 8, '8'


class Keyword(models.Model):
    title = models.CharField(null=False, blank=False, max_length=DEFAULT_MAX_LENGTH, unique=True)

    def __str__(self):
        return self.title


class Course(models.Model):
    teacher = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(null=True, blank=True, max_length=DEFAULT_MAX_LENGTH, unique=True)
    is_mandatory = models.BooleanField(default=False)
    is_exam = models.BooleanField(default=True)
    is_technical = models.BooleanField(default=True)
    avg_score = models.PositiveSmallIntegerField(default=0, null=False, blank=False)
    semester = models.PositiveSmallIntegerField(default=SemesterChoices.FIRST, choices=SemesterChoices.choices)
    max_students_count = models.PositiveSmallIntegerField(default=25, null=False, blank=False)
    min_students_count = models.PositiveSmallIntegerField(default=1, null=False, blank=False)
    space_left = models.PositiveSmallIntegerField(default=25, null=False, blank=False)
    past_courses = models.ManyToManyField('self', blank=True)
    future_courses = models.ManyToManyField('self', blank=True)
    keywords = models.ManyToManyField(Keyword, blank=True)

    def __str__(self):
        return self.title


class CourseUsage(models.Model):
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True)
    year = models.PositiveSmallIntegerField(default=now().year)
    students_count = models.PositiveSmallIntegerField(default=0, null=False, blank=False)

    def __str__(self):
        return f'{self.year}| {self.course.title}'


class IndividualPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    semester = models.PositiveSmallIntegerField(default=SemesterChoices.FIRST, choices=SemesterChoices.choices)
    courses = models.ManyToManyField(Course, blank=True, related_name='plans')