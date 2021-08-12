from django.contrib import admin
from django.urls import path, include

from .views import IsAuthenticated, LoginView, SignupView, LogoutView, CsrfToken,UserList,UserDetail

urlpatterns = [
    path("signup", SignupView.as_view(), name="signup"),
    path("login", LoginView.as_view(), name="login"),
    path("authenticated", IsAuthenticated.as_view(), name="authenticated"),
    path("logout", LogoutView.as_view(), name="logout"),
    path("csrf", CsrfToken.as_view(), name="csrf"),
    path("users/", UserList.as_view(), name="user-list"),
    path("users/<int:pk>", UserDetail.as_view(), name="user-detail"),
]
