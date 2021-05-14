from django.urls import reverse
from rest_framework.test import APITestCase
from .models import User
from rest_framework import status

class UserTest(APITestCase):
    def setUp(self):
        # creating a test user.
        self.test_user = User.objects.create_user('test@example.com', 'testpassword')

        self.create_url = reverse('user-create')
    def test_create_user(self):
        data = {
            'email': 'foobar@example.com',
            'password': 'somepassword',
        }
        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['email'], data['email'])
        self.assertFalse('password' in response.data)