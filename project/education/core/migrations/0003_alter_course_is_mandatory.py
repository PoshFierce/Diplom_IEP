# Generated by Django 3.2 on 2023-05-22 21:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20230521_2044'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='is_mandatory',
            field=models.BooleanField(default=False),
        ),
    ]