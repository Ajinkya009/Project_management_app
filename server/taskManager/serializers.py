from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import password_validation
from .models import Task,Project

class TaskSerializer(serializers.ModelSerializer):
	"""
	Task serializer
	"""
	class Meta:
		model = Task
		fields = ('id','name','startDate','endDate','status','description','project','assignee')

class ProjectSerializer(serializers.ModelSerializer):
	"""
	Project serializer
	"""
	tasks = TaskSerializer(many=True, read_only=True)
	admin = serializers.StringRelatedField(read_only=True)
	class Meta:
		model = Project
		fields = ('name','admin','startDate','endDate','description','id','tasks')





