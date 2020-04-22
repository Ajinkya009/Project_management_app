from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from account import views

router = DefaultRouter()
router.register(r'auth', views.AccountViewSet, basename='auth')

urlpatterns = [
    url(r'^', include(router.urls))
]
