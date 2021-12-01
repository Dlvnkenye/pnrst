from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name = 'home'),
    path("ambitions/",views.Ambitions_view, name="ambitions"),
    path("products/",views.news_view, name="news"),
    path("about/",views.about_view, name="about"),
    path("contact/",views.contact_view, name="contact"),
]
