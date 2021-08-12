from django.urls import path, include

urlpatterns = [
    path('auth/', include('user_profile.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('', include('api.urls')),
]
