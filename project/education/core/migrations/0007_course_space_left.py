# Generated by Django 3.2 on 2023-06-18 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_alter_individualplan_courses'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='space_left',
            field=models.PositiveSmallIntegerField(default=25),
        ),
    ]
