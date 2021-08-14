import os
from posixpath import basename, dirname
import html2markdown
import markdown
from django.contrib import auth
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import generics, permissions, request
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView

from .models import Document, UserProfile
from .permissions import IsCurrentUser, IsOwnerOrAccessDenied
from .serializers import (DocumentSerializer, UserProfileSerializer,
                          UserSerializer)

DOCUMENT_PATH = os.environ.get("DOCUMENT_PATH")


# DOCUMENT_PATH = os.path
class DocumentListView(generics.ListCreateAPIView):
    serializer_class = DocumentSerializer

    def get_queryset(self):
        return Document.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        md = self.request.data.get("md", "")

        profile = UserProfile.objects.get(user=self.request.user)

        auto_save = self.request.data.get('auto_save', profile.auto_save)

        document = serializer.save(owner=self.request.user,
                                   auto_save=auto_save)

        document.path = os.path.join(
            DOCUMENT_PATH,
            "user_{}/{}_{}.md".format(profile.user.id, document.name,
                                      document.id))

        if (not os.path.exists(os.path.dirname(document.path))):
            os.mkdir(os.path.dirname(document.path))

        file = open(document.path, mode="w")
        file.write(md)
        file.close()

        document.save()


class DocumentDetailView(APIView):
    permission_classes = (IsOwnerOrAccessDenied, )

    def put(self, request, pk=None, format=None):

        profile = UserProfile.objects.get(user=self.request.user)
        document = Document.objects.get(id=pk, owner=self.request.user)

        name = self.request.data.get('name', None)
        document.auto_save = self.request.data.get('auto_save',
                                                   document.auto_save)
        md = self.request.data.get("md", "")

        if (name is not None and len(name) > 0):
            new_path = os.path.join(
                DOCUMENT_PATH,
                "user_{}/{}_{}.md".format(profile.user.id, name, document.id))
            if (new_path != document.path):
                os.rename(document.path, new_path)
                document.path = new_path

        if (len(document.path) == 0):
            document.path = os.path.join(
                DOCUMENT_PATH,
                "user_{}/{}_{}.md".format(profile.owner.id, document.name,
                                          document.id))

        document.name = name
        document.save()

        if (not os.path.exists(os.path.dirname(document.path))):
            os.mkdir(os.path.dirname(document.path))

        file = open(document.path, mode="w")
        file.write(md)
        file.close()

        return Response({
            "document":
            DocumentSerializer(document, context={
                'request': request
            }).data,
            "md":
            md
        })

    def get(self, request, pk=None, format=None):

        try:
            document = Document.objects.get(id=pk, owner=self.request.user)

            md = ""

            if len(document.path) > 0 and os.path.isfile(document.path):
                file = open(document.path, 'r')

                md = file.read()

                file.close()

            document = DocumentSerializer(document,
                                          context={
                                              'request': request
                                          }).data

            return Response({"document": document, "md": md})
        except Document.DoesNotExist as err:
            return Response({"success": False, "message": "Invalid Document"})
        except Exception as err:
            print(err)
            return Response({
                "success": False,
                "message": "Error Deleting File."
            })

    def delete(self, request, pk=None, format=None):
        try:
            document = Document.objects.get(id=pk, owner=self.request.user.id)

            if len(document.path) > 0 and os.path.isfile(document.path):
                os.remove(document.path)

            document.delete()

            return Response({"success": True, "message": "File Deleted"})
        except Document.DoesNotExist as err:
            return Response({"success": False, "message": "Invalid Document"})
        except Exception as err:
            print(err)
            return Response({
                "success": False,
                "message": "Error Deleting File."
            })


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'documents':
        reverse('document-list', request=request, format=format),
    })


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
            return Response({
                "success": False,
                "message": "Name cannot be empty"
            })

        if password != password2:
            return Response({
                "success": False,
                "message": "Passwords do not match"
            })

        if len(username) <= 3:
            return Response({
                "success": False,
                "message": "Username too short"
            })

        user = User.objects.filter(username=username)

        if len(user) > 0:
            return Response({
                "success": False,
                "message": "Username not available"
            })

        user = User.objects.create_user(username=username,
                                        password=password,
                                        first_name=first_name,
                                        last_name=last_name,
                                        email=email)

        UserProfile(user=user).save()

        return Response({
            "success": True,
            "message": "User created successfully"
        })


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
                    "success":
                    True,
                    "message":
                    "Authenticated",
                    "user":
                    UserSerializer(user, context={
                        'request': request
                    }).data
                })

            return Response({
                "success": False,
                "message": "Authentication Failed"
            })

        except User.DoesNotExist as err:
            return Response({"success": False, "message": "Invalid User"})
        except Exception as err:
            print(err)
            return Response({"success": False, "message": "Error Logging in"})


class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({
                "success": True,
                "message": "Successfully logged out",
            })
        except Exception as err:
            return Response({
                "success": False,
                "message": "Error Logging out - " + err
            })


@method_decorator(ensure_csrf_cookie, name='dispatch')
class CsrfToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({"success": True, "message": "CSRF token set"})


class IsAuthenticated(APIView):
    def get(self, request, format=None):

        if self.request.user.is_authenticated:
            return Response({"success": True, "message": "Authenticated"})

        return Response({"success": False, "message": "Not Authenticated"})


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
            return Response({
                "success":
                False,
                "message":
                "Error getting user profile - " + err.message
            })

    def put(self, request, format=None):
        try:
            data = request.data

            user = request.user
            profile = UserProfile.objects.get(user=user)

            password = data.get('password', None)
            new_password = data.get('new_password', None)
            new_password2 = data.get('new_password2', None)

            if password is not None and new_password is not None and new_password2 is not None:
                if new_password2 != new_password:
                    return Response({
                        "success": False,
                        "message": "New Passwords do not match"
                    })

                if len(new_password) < 8:
                    return Response({
                        "success": False,
                        "message": "Passwords too short"
                    })
                
                if not user.check_password(password):
                    return Response({
                        "success": False,
                        "message": "Incorrect Password"
                    })
                
                user.set_password(new_password);
                auth.login(request, user)
                

            user.first_name = data.get('first_name', user.first_name).strip()
            user.last_name = data.get('last_name', user.last_name).strip()
            user.email = data.get('email', user.email).strip()
            profile.phone = data.get('phone', profile.phone).strip()
            profile.auto_save = data.get('auto_save', profile.auto_save)
            profile.city = data.get('city', profile.city).strip()

            if len(user.first_name) == 0 or len(user.last_name) == 0:
                return Response({
                    "success": False,
                    "message": "Name cannot be empty"
                })

            user.save()
            profile.save()

            # if user.check_password():

            user = UserSerializer(user, context={"request": request}).data
            profile = UserProfileSerializer(profile).data
            return Response({
                "success": True,
                "message": "Profile Updated Successfully",
                "user": user,
                "profile": profile
            })
        except Exception as err:
            print(err)
            return Response({
                "success": False,
                "message": "Error Updating user profile"
            })


class MdToHtml(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        return Response(markdown.markdown(request.data.get('md', '')))


class HtmlToMd(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        return Response(html2markdown.convert(request.data.get('html', '')))
