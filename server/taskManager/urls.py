from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from taskManager import views

router = DefaultRouter()
router.register(r'project', views.ProjectViewSet, basename='project')
router.register(r'project/(?P<projectId>\d+)/task', views.TaskViewSet, basename='task')
urlpatterns = [
    url(r'^', include(router.urls))
]
