from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('signup',views.signup,name="signup"),
    path('login',views.login,name="login"),
    path('changepass',views.changePass,name="changepass"),
    path('writepass',views.writePass,name="writepass"),
    path('verify/',views.verify,name="verify"),
]