# Generated by Django 5.0.2 on 2024-03-09 19:04

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='History',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('movie_id', models.IntegerField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='history', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]