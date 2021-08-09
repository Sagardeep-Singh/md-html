from django.urls import path

from . import views

urlpatterns = [
    path('html', views.mdToHtml, name='mdToHtml'),
    path('md', views.htmlToMd, name='htmlToMd'),
]