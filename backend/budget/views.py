from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from .models import User, Budget
from .serializers import *
import bcrypt

@api_view(['POST',])
def user_create(request):
    if request.method == 'POST':
        new_user = UserSerializer(data=request.data)
        data = {}
        if new_user.is_valid():
            user = new_user.save()
            data['response'] = "New User created!"
            data['email'] = user.email
            data['username'] = user.username
            token = Token.objects.get(user=user).key
            data['token'] = token
        else:
            data = new_user.errors
        return Response(data)

@api_view(['POST',])
@permission_classes((IsAuthenticated,))
def budget_create(request):
    user = request.user
    budget = Budget(user=user)
    new_budget = BudgetSerializer(budget, data=request.data)
    if new_budget.is_valid():
        new_budget.save()
        return Response(new_budget.data, status=status.HTTP_201_CREATED)
    return Response(new_budget.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE',])
@permission_classes((IsAuthenticated,))
def budget_delete(request, pk):
    try:
        budget = Budget.objects.get(pk=pk)
    except Budget.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    user = request.user
    if budget.user != user:
        return Response({'response': "You do not have permission to delete this!"})
    if request.method == "DELETE":
        operation = budget.delete()
        data = {}
        if operation:
            data["success"] = "delete successful"
        else:
            data["failure"] = "delete failed"
        return Response(data=data)

class Logout(APIView):
    def get(self, request):
        authentication_classes =(TokenAuthentication,)
        permission_classes = (IsAuthenticated,)
        request.user.auth_token.delete()
        data = {"Successful Logout!"}
        return Response(status=status.HTTP_200_OK, data=data)

class ApiBudgetList(ListAPIView):
    serializer_class = BudgetSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        user = self.request.user
        return Budget.objects.filter(user=user)