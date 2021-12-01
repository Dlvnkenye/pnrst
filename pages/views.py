from django.shortcuts import render
from personnel.models import Personnel
from slider.models import Slide
# Create your views here.


def home_view(request):
    active = {"home": "active", "ambitions": "",
              "news": "", "about": "", "contact": ""}
    content = {
        "title": "home",
        "active": active,
        "slides": Slide.objects.all()
    }
    return render(request, 'pages/home.html', content)


def Ambitions_view(request):
    active = {"home": "", "ambitions": "active",
              "news": "", "about": "", "contact": ""}
    content = {
        "title": "Ambitions",
        "active": active,
        "slides": Slide.objects.all()
    }
    return render(request, "pages/ambitions.html", content)


def news_view(request):
    active = {"home": "", "ambitions": "",
              "news": "active", "about": "", "contact": ""}
    content = {
        "title": "News",
        "active": active,
        "slides": Slide.objects.all()
    }
    return render(request, "pages/news.html", content)


def about_view(request):
    active = {"home": "", "ambitions": "",
              "news": "", "about": "active", "contact": ""}
    content = {
        "title": "About",
        "active": active,
        "personnels": Personnel.objects.all(),
    }

    return render(request, "pages/about.html", content)


def contact_view(request):
    active = {"home": "", "ambitions": "",
              "news": "", "about": "", "contact": "active"}
    content = {"title": "Contacts",
               "active": active,
               }
    return render(request, "pages/contact.html", content)
