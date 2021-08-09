from django.shortcuts import HttpResponse
import json
import logging
import markdown
import html2markdown

logger = logging.getLogger(__name__)


# Create your views here.
def mdToHtml(request):
    return HttpResponse(markdown.markdown(json.loads(request.body)['md']))

# Create your views here.
def htmlToMd(request):
    return HttpResponse(html2markdown.convert(json.loads(request.body)['html']))