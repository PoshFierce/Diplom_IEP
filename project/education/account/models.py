from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser, User
from django.db import models
from django.utils.timezone import now


class CourseChoices(models.IntegerChoices):
    FIRST = 1, '1'
    SECOND = 2, '2'
    THIRD = 3, '3'
    FOURTH = 4, '4'


class StatusChoices(models.IntegerChoices):
    FIRED = 0, 'Отчислен'
    ACTIVE = 1, 'Учится'
    GRADUATED = 3, 'Выпустился'
    BREAKING = 2, 'В академическом отпуске'


class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)


class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    course = models.PositiveSmallIntegerField(default=CourseChoices.FIRST, choices=CourseChoices.choices)
    status = models.PositiveSmallIntegerField(default=StatusChoices.ACTIVE, choices=StatusChoices.choices)

    def __str__(self):
        return f'{self.status} | {self.course} | {self.user.last_name} {self.user.first_name}'

    @property
    def semester(self):
        today = now().today()
        semester = self.course * 2
        return semester if today.month < 7 else semester - 1