from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token
from .views import ApiBudgetList, Logout

urlpatterns = [
    path('register/', views.user_create, name="register"),
    path('login/', obtain_auth_token, name="login"),
    path('logout/', Logout.as_view() , name="logout"),
    path('budget/', views.budget_create , name="budget-create"),
    path('budget/list/', ApiBudgetList.as_view(), name="budget-list"),
    path('budget/delete/<int:pk>/', views.budget_delete, name="budget-delete"),
]