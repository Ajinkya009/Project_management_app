from django.contrib.auth import authenticate
from rest_framework import serializers
#from account.models import Account
from django.contrib.auth.models import User
from django.db.models import Q

def authenticateUser(username,password):
	user = authenticate(username=username, password=password)
	if user is None:
		raise serializers.ValidationError("Invalid email/password")
	return user


def create_user_account(username, email, password, **extra_fields):
    user = User.objects.create_user(
        email=email, password=password, username=username)
    return user