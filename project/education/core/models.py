from django.db import models

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


class Course(models.Model):
    teacher = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(null=True, blank=True, max_length=DEFAULT_MAX_LENGTH, unique=True)
    is_mandatory = models.BooleanField(default=True)
    is_exam = models.BooleanField(default=True)
    is_technical = models.BooleanField(default=True)
    semester = models.PositiveSmallIntegerField(default=SemesterChoices.FIRST, choices=SemesterChoices.choices)
    max_students_count = models.PositiveSmallIntegerField(default=25, null=False, blank=False)
    min_students_count = models.PositiveSmallIntegerField(default=1, null=False, blank=False)
    past_courses = models.ManyToManyField('self', blank=True)
    future_courses = models.ManyToManyField('self', blank=True)

    def __str__(self):
        return self.title


class IndividualPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    semester = models.PositiveSmallIntegerField(default=SemesterChoices.FIRST, choices=SemesterChoices.choices)
    courses = models.ManyToManyField(Course, blank=True)
