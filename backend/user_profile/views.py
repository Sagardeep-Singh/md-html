from django.contrib.auth.models import User
from django.contrib import auth
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import permissions, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import UserProfile
from .serializers import UserSerializer, UserProfileSerializer
from .permissions import IsCurrentUser


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


@method_decorator(csrf_protect, name='dispatch')
class IsAuthenticated(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        auth.get_user()
        if User.is_authenticated:
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


class UserProfileList(generics.RetrieveUpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
