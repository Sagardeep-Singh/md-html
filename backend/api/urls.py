from re import template
from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.api_root,name="home"),
    path('documents/',views.DocumentView.as_view(),name="document-list"),
    path('documents/<int:pk>',views.DocumentDetailView.as_view(),name="document-detail"),
    # path('html', views.mdToHtml, name='mdToHtml'),
    # path('md', views.htmlToMd, name='htmlToMd'),
]