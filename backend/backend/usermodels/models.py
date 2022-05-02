import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager

# Create your models here.
class accountManager(BaseUserManager):
    def create_user(self,name,email,password,gender,dob):
        if not name or not email:
            raise ValueError("Users must have an unique username and email")
        elif not password:
            raise ValueError("Users must have a Password")
        user = self.model(
            name = name,
            dob = dob,
            gender = gender,
            email = self.normalize_email(email)
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,name,email,password,gender,dob):
        user = self.model(
            name = name,
            dob = dob,
            gender = gender,
            email = self.normalize_email(email),
        )
        user.set_password(password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class Account(AbstractBaseUser):
    name = models.CharField(verbose_name="username",max_length=100,unique=True)
    email = models.EmailField(verbose_name="email",max_length=100,unique=True)
    password = models.CharField(verbose_name="password",max_length=500)
    dob = models.DateField(verbose_name="DOB")
    gender = models.CharField(verbose_name="gender",max_length=10,default="Male")
    last_login = models.DateTimeField(verbose_name="Last Login",auto_now=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    unique_id = models.UUIDField(primary_key = True,default = uuid.uuid4,editable = False,verbose_name="id")

    def has_perm(self,perm,obj=None):
        return self.is_admin

    def has_module_perms(self,app_label):
        return True

    objects = accountManager()
    USERNAME_FIELD = 'name'
    REQUIRED_FIELDS = ['email','gender','dob']