from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import logout
#from account.models import Account
from account.serializers import EmptySerializer,UserRegisterSerializer,AuthTokenSerializer,UserLoginSerializer
from .utils import authenticateUser,create_user_account

class AccountViewSet(viewsets.ModelViewSet):
	
	serializer_class = EmptySerializer
	serializer_classes = {
		'signup': UserRegisterSerializer,
		'login': UserLoginSerializer
	}

	def get_serializer_class(self):
		if not isinstance(self.serializer_classes,dict):
			raise ImproperlyConfigured("serializer_classes should be a dict mapping.")

		if self.action in self.serializer_classes.keys():
			return self.serializer_classes[self.action]
		return super().get_serializer_class()

	@action(methods=['POST',], detail=False)
	def signup(self,request):
		"""
		Custom method for registering new users
		"""
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = create_user_account(**serializer.validated_data)
		data, _ = Token.objects.get_or_create(user=user)
		serializedToken = AuthTokenSerializer(data).data
		return Response(data=serializedToken,status=status.HTTP_201_CREATED)

	@action(methods=['POST',], detail=False)
	def login(self,request):
		"""
		Custom method for logging user in
		"""
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = authenticateUser(**serializer.validated_data)
		data, _ = Token.objects.get_or_create(user=user)
		serializedToken = AuthTokenSerializer(data).data
		return Response(data=serializedToken,status=status.HTTP_200_OK)

	@action(methods=['POST',], detail=False)
	def logout(self,request):
		permission_classes = (IsAuthenticated,)
		logout(request)
		return Response(data="Success", status=status.HTTP_200_OK)
