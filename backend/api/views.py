import json
from re import search
from django.http.response import HttpResponse

import html2markdown
import markdown
from django.contrib import auth
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import generics, permissions, serializers, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView

from .models import Document, UserProfile
from .permissions import IsCurrentUser, IsOwnerOrAccessDenied
from .serializers import (DocumentSerializer, UserProfileSerializer,
                          UserSerializer)


class DocumentView(generics.ListCreateAPIView):
    serializer_class = DocumentSerializer

    def get_queryset(self):
        return Document.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        # md = self.request.data['md']

        profile = UserProfile.objects.get(user=self.request.user)

        auto_save = self.request.data['auto_save'] if self.request.data[
            'auto_save'] is not None else profile.auto_save

        serializer.save(owner=self.request.user, auto_save=auto_save)


class DocumentDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsOwnerOrAccessDenied, )
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'documents':
        reverse('document-list', request=request, format=format),
    })


# Create your views here.
def mdToHtml(request):
    return HttpResponse(markdown.markdown(json.loads(request.body)['md']))


# Create your views here.
def htmlToMd(request):
    return HttpResponse(html2markdown.convert(
        json.loads(request.body)['html']))


@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = request.data

        username = data['username'].strip()
        password = data['password']
        password2 = data['password2']

        first_name = data['first_name'].strip()
        last_name = data['last_name'].strip()
        email = data['email'].strip()

        if len(first_name) == 0 or len(last_name) == 0:
            return Response(
                {
                    "success": False,
                    "message": "Name cannot be empty"
                },
                status=status.HTTP_400_BAD_REQUEST)

        if password != password2:
            return Response(
                {
                    "success": False,
                    "message": "Passwords do not match"
                },
                status=status.HTTP_400_BAD_REQUEST)

        if len(username) <= 3:
            return Response({
                "success": False,
                "message": "Username too short"
            },
                            status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(username=username)

        if len(user) > 0:
            return Response(
                {
                    "success": False,
                    "message": "Username not available"
                },
                status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username,
                                        password=password,
                                        first_name=first_name,
                                        last_name=last_name,
                                        email=email)

        user.save()

        UserProfile(user=user).save()

        return Response(
            {
                "success": True,
                "message": "User created successfully"
            },
            status=status.HTTP_201_CREATED)


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = request.data

        username = data['username'].strip()
        password = data['password']

        try:
            User.objects.get(username=username)

            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({
                    "success": True,
                    "message": "Authenticated",
                    "user": user.id
                })

            return Response(
                {
                    "success": False,
                    "message": "Authentication Failed"
                },
                status=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist as err:
            return Response({
                "success": False,
                "message": "Invalid User"
            },
                            status=500)
        except Exception as err:
            return Response(
                {
                    "success": False,
                    "message": "Error Logging in - " + err
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({
                "success": True,
                "message": "Successfully logged out",
            })
        except Exception as err:
            return Response(
                {
                    "success": False,
                    "message": "Error Logging out - " + err
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@method_decorator(ensure_csrf_cookie, name='dispatch')
class CsrfToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({"success": True, "message": "CSRF token set"})


class IsAuthenticated(APIView):
    def get(self, request, format=None):
        
        if self.request.user.is_authenticated:
            return Response({"success": True, "message": "Authenticated"})

        return Response({
            "success": False,
            "message": "Not Authenticated"
        },
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserList(generics.ListAPIView):
    permission_classes = (permissions.IsAdminUser, )
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsCurrentUser, )
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserProfileView(APIView):
    def get(self, request, format=None):

        try:
            user = request.user
            profile = UserProfile.objects.get(user=user)
            user = UserSerializer(user, context={"request": request}).data
            profile = UserProfileSerializer(profile).data
            return Response({
                "success": True,
                "message": "Profile Found",
                "user": user,
                "profile": profile
            })
        except Exception as err:
            return Response(
                {
                    "success": False,
                    "message": "Error getting user profile - " + err.message
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, format=None):
        try:
            data = request.data

            user = request.user
            profile = UserProfile.objects.get(user=user)

            first_name = data['first_name'].strip()
            last_name = data['last_name'].strip()
            email = data['email'].strip()
            phone = data['phone'].strip()
            auto_save = data['auto_save'].strip()
            city = data['city'].strip()

            if len(first_name) == 0 or len(last_name) == 0:
                return Response(
                    {
                        "success": False,
                        "message": "Name cannot be empty"
                    },
                    status=status.HTTP_400_BAD_REQUEST)

            user.save(first_name=first_name, last_name=last_name, email=email)
            profile.save(phone=phone, auto_save=auto_save, city=city)

            return Response({
                "success":
                True,
                "user":
                UserSerializer(user, context={
                    "request": request
                }).data,
            })
        except Exception as err:
            return Response(
                {
                    "success": False,
                    "message": "Error getting user profile"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
