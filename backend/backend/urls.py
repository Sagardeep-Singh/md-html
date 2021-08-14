from django.urls import path, include
from django.urls.conf import re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('api.urls')),
    re_path(r"^.*", TemplateView.as_view(template_name='index.html'))
]
