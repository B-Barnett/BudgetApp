from django.conf import settings
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
import re
import bcrypt

class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(
            email = self.normalize_email(email),
            username = username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email = self.normalize_email(email),
            password = password,
            username = username,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class BudgetManager(models.Manager):
    def validator(
        self,
        name,
        wages,
        rent,
        property_tax,
        rent_insurance,
        water,
        electric,
        natural_gas,
        trash,
        groceries,
        car_payment,
        gas,
        phone,
        internet,
        other_needs,
        clothing,
        fast_food,
        alcohol,
        entertainment,
        travel,
        decor,
        other_wants,
        savings_amount,
        investments,
        emergency,
        credit_card,
        other_savings,
        user,
    ):
        budget = self.create(
            name=name,
            wages=wages,
            rent=rent,
            property_tax=property_tax,
            rent_insurance=rent_insurance,
            water=water,
            electric=electric,
            natural_gas=natural_gas,
            trash=trash,
            groceries=groceries,
            car_payment=car_payment,
            gas=gas,
            phone=phone,
            internet=internet,
            other_needs=other_needs,
            clothing=clothing,
            fast_food=fast_food,
            alcohol=alcohol,
            entertainment=entertainment,
            travel=travel,
            decor=decor,
            other_wants=other_wants,
            savings_amount=savings_amount,
            investments=investments,
            emergency=emergency,
            credit_card=credit_card,
            other_savings=other_savings,
            user=user,
        )

class User(AbstractBaseUser):
    email = models.EmailField(verbose_name="email", max_length=255, unique=True)
    username = models.CharField(max_length=30, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = UserManager()

    def __str__(self):
        return self.email

    # Does the user have permission to view the app? Yes for simplicity.
    def has_module_perms(self, app_label):
        return True
    
    # For checking permissions. Keep it simple, all admins have permission.
    def has_perm(self, perm, obj=None):
        return self.is_admin

class Budget(models.Model):
    name = models.CharField(max_length=45, unique=True)
    wages = models.DecimalField(max_digits=6, decimal_places=2)
    rent = models.DecimalField(max_digits=6, decimal_places=2)
    property_tax = models.DecimalField(max_digits=6, decimal_places=2)
    rent_insurance = models.DecimalField(max_digits=6, decimal_places=2)
    water = models.DecimalField(max_digits=6, decimal_places=2)
    electric = models.DecimalField(max_digits=6, decimal_places=2)
    natural_gas = models.DecimalField(max_digits=6, decimal_places=2)
    trash = models.DecimalField(max_digits=6, decimal_places=2)
    groceries = models.DecimalField(max_digits=6, decimal_places=2)
    car_payment = models.DecimalField(max_digits=6, decimal_places=2)
    gas = models.DecimalField(max_digits=6, decimal_places=2)
    phone = models.DecimalField(max_digits=6, decimal_places=2)
    internet = models.DecimalField(max_digits=6, decimal_places=2)
    other_needs = models.DecimalField(max_digits=6, decimal_places=2)
    clothing = models.DecimalField(max_digits=6, decimal_places=2)
    fast_food = models.DecimalField(max_digits=6, decimal_places=2)
    alcohol = models.DecimalField(max_digits=6, decimal_places=2)
    entertainment = models.DecimalField(max_digits=6, decimal_places=2)
    travel = models.DecimalField(max_digits=6, decimal_places=2)
    decor = models.DecimalField(max_digits=6, decimal_places=2)
    other_wants = models.DecimalField(max_digits=6, decimal_places=2)
    savings_amount = models.DecimalField(max_digits=6, decimal_places=2)
    investments = models.DecimalField(max_digits=6, decimal_places=2)
    emergency = models.DecimalField(max_digits=6, decimal_places=2)
    credit_card = models.DecimalField(max_digits=6, decimal_places=2)
    other_savings = models.DecimalField(max_digits=6, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="budgets", on_delete=models.CASCADE)
    objects = BudgetManager()

# creates a token every time a user is created.
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)