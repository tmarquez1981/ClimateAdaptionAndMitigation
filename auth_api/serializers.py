#user class to hold user information to be serializer
#django has its own User class which is being set to serializer here

from django.contrib.auth.models import User

from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):

    #send only the id and username fields to the client
    #for security reasons
    class Meta:
        model = User
        fields = ('id', 'username')
