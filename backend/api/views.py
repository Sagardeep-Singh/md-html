import json

import html2markdown
import markdown

from rest_framework import generics, permissions
from .models import Document
from .serializers import DocumentSerializer
from .permissions import IsOwnerOrAccessDenied
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


class DocumentView(generics.ListCreateAPIView):
    serializer_class = DocumentSerializer

    def get_queryset(self):
        return Document.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


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


# # Create your views here.
# def mdToHtml(request):
#     return Response(markdown.markdown(json.loads(request.body)['md']))

# # Create your views here.
# def htmlToMd(request):
#     return Response(html2markdown.convert(
#         json.loads(request.body)['html']))
