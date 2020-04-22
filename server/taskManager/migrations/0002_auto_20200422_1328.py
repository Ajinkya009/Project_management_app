# Generated by Django 3.0.5 on 2020-04-22 13:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('taskManager', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='endDate',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='project',
            name='startDate',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='endDate',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='task',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='taskManager.Project'),
        ),
        migrations.AlterField(
            model_name='task',
            name='startDate',
            field=models.DateField(auto_now_add=True),
        ),
    ]
