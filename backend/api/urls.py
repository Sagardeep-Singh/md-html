from re import template

from django.urls import include, path

from .views import (CsrfToken, DocumentDetailView, DocumentListView, HtmlToMd,
                    MdToHtml, UserProfileView, IsAuthenticated, LoginView,
                    LogoutView, SignupView, UserDetail, UserList, api_root)

urlpatterns = [
    path('', api_root, name="home"),
    path("profile", UserProfileView.as_view(), name="profile"),
    path('documents/', DocumentListView.as_view(), name="document-list"),
    path('documents/<int:pk>',
         DocumentDetailView.as_view(),
         name="document-detail"),
    path('html', MdToHtml.as_view(), name='md-to-html'),
    path('md', HtmlToMd.as_view(), name='html-to-md'),
]

urlpatterns += [
    path("auth/users/", UserList.as_view(), name="user-list"),
    path("auth/users/<int:pk>", UserDetail.as_view(), name="user-detail"),
    path("auth/signup", SignupView.as_view(), name="signup"),
    path("auth/login", LoginView.as_view(), name="login"),
    path("auth/authenticated", IsAuthenticated.as_view(),
         name="authenticated"),
    path("auth/logout", LogoutView.as_view(), name="logout"),
    path("auth/csrf", CsrfToken.as_view(), name="csrf"),
]
