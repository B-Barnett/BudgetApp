from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import User, Budget
import bcrypt

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        required=True,
        min_length=8, 
        write_only=True
    )
    confirm_password = serializers.CharField(
        style={'input_type': 'password'}, 
        write_only=True
    )
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def save(self):
        user = User(
            email = self.validated_data['email'],
            username = self.validated_data['username'],
        )
        password = self.validated_data['password']
        confirm_password = self.validated_data['confirm_password']
        if password != confirm_password:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        user.set_password(password)
        user.save()
        return user

class BudgetSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('get_username')

    name = serializers.CharField(
        max_length=45,
        required=True
        )
    wages = serializers.DecimalField(
        max_digits=6, 
        decimal_places=2, 
        required=True
        )
    rent = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    property_tax = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    rent_insurance = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    water = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    electric = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    natural_gas = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    trash = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    groceries = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    car_payment = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    gas = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    phone = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    internet = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    other_needs = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    clothing = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    fast_food = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    alcohol = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    entertainment = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    travel = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    decor = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    other_wants = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    savings_amount = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    investments = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    emergency = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    credit_card = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    other_savings = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        required=False
        )
    def create_budget(self, validated_data):
        budget = Budget.objects.validator(
            name = validated_data['name'],
            wages = validated_data['wages'],
            rent = validated_data['rent'],
            property_tax = validated_data['property_tax'],
            rent_insurance = validated_data['rent_insurance'],
            water = validated_data['water'],
            electric = validated_data['electric'],
            natural_gas = validated_data['natural_gas'],
            trash = validated_data['trash'],
            groceries = validated_data['groceries'],
            car_payment = validated_data['car_payment'],
            gas = validated_data['gas'],
            phone = validated_data['phone'],
            internet = validated_data['internet'],
            other_needs = validated_data['other_needs'],
            clothing = validated_data['clothing'],
            fast_food = validated_data['fast_food'],
            alcohol = validated_data['alcohol'],
            entertainment = validated_data['entertainment'],
            travel = validated_data['travel'],
            decor = validated_data['decor'],
            other_wants = validated_data['other_wants'],
            savings_amount = validated_data['savings_amount'],
            investments = validated_data['investments'],
            emergency = validated_data['emergency'],
            credit_card = validated_data['credit_card'],
            other_savings = validated_data['other_savings'],
        )
    class Meta:
        model = Budget
        fields = [
            'id',
            'name',
            'wages',
            'rent',
            'property_tax',
            'rent_insurance',
            'water',
            'electric',
            'natural_gas',
            'trash',
            'groceries',
            'car_payment',
            'gas',
            'phone',
            'internet',
            'other_needs',
            'clothing',
            'fast_food',
            'alcohol',
            'entertainment',
            'travel',
            'decor',
            'other_wants',
            'savings_amount',
            'investments',
            'emergency',
            'credit_card',
            'other_savings',
            'username',
        ]

    def get_username(self, budget):
        username = budget.user.username
        return username