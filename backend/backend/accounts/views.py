import json
import random
import arrow
from django.core.mail import send_mail
from django.conf import settings
from django.forms import ValidationError
from django.db import IntegrityError
from usermodels.models import Account as User
from django.http import *
from django.views.decorators.csrf import csrf_exempt

def sendMail(email,subject,message):
    try:
        email = {
            "from" : settings.EMAIL_HOST_USER,
            "receipient_List" : [email]
        }
        send_mail(subject,message,email['from'],email['receipient_List'])
        return True
    except Exception as err:
        print(err)
        return False

# Create your views here.
@csrf_exempt
def signup(request):
    try:
        user = json.loads(request.body.decode('utf-8'))
        createdUser = User.objects.create(
            name=user['name'],
            email=user['email'],
            password=user['password'],
            gender=user['gender'],
            dob=arrow.get(user['dob'], 'DD-MM-YYYY').format("YYYY-MM-DD")
        )
        token = str(createdUser.unique_id)
        body = "Click or Paste this link in your browser to verify your account\nhttp://localhost:5000/verify/?id="+token
        if sendMail(createdUser.email,"Your Email needs to be Verified",body):
            return JsonResponse("User Data received Successfully",safe=False)
        else:
            return JsonResponse("Mail couldn't be send",safe=False)
    except IntegrityError as err:
        print(err)
        return JsonResponse(str(err),safe=False)
    except Exception as err:
        print(err)
        return HttpResponseServerError()

@csrf_exempt
def login(request):
    try:
        user = json.loads(request.body.decode('utf-8'))
        userOBJ = User.objects.get(name = user['username'])
        if user['password'] == userOBJ.password:
            if userOBJ.is_verified:
                return JsonResponse("Login Successful",safe=False)
            else:
                return JsonResponse("User not Verified",safe=False)
        else:
            return JsonResponse("Bad Credentials",safe=False)
    except Exception as err:
        print(err)
        return HttpResponseServerError()

def verify(request):
    user_id = request.GET.get('id', '')
    try:
        user = User.objects.get(unique_id = user_id)
        name = user.name
        if(user.is_verified):
            return HttpResponse(name+" is already verified")
        else:
            user.is_verified = True
            user.save()
            return HttpResponse(name+" is now verified")
    except ValidationError:
        return HttpResponse("User not Found")
    except Exception:
        return HttpResponse("Bad Response 403")

@csrf_exempt
def changePass(request):
    try:
        user = json.loads(request.body.decode('utf-8'))
        userOBJ = User.objects.get(email = user['Email'])
        if userOBJ.is_verified:
            OTP = random.randint(10000,99999)
            body = "Your OTP to change your password is "+str(OTP)
            if sendMail(userOBJ.email,"OTP to change your Password",body):
                return JsonResponse({"Done":True,"OTP":OTP},safe=False)
            else:
                return JsonResponse({"Done":False},safe=False)
        else:
            return JsonResponse({"Done":False,"Response":"User not Verified"},safe=False)
    except ValidationError:
        return JsonResponse("User not Found",safe=False)
    except Exception as exc:
        print("ERROR",exc)
        return JsonResponse("Bad Response 403",safe=False)

@csrf_exempt
def writePass(request):
    try:
        user = json.loads(request.body.decode('utf-8'))
        userOBJ = User.objects.get(email = user['Email'])
        userOBJ.password = user['Password']
        userOBJ.save()
        return JsonResponse("Password changed",safe=False)
    except Exception as exc:
        print(exc)
        return JsonResponse("Bad Response 403",safe=False)