from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator

from rest_framework import status, views
from rest_framework.response import Response

from .serializers import UserSerializer

class LoginView(views.APIView):

    #post method
    #gets a request argument
    @method_decorator(csrf_protect) #for protection from csrf attacks
    def post(self, request):
        #django method "authenticate" compares data passed in to
        #data in the database
        #saves to user variable
        user = authenticate(
            username=request.data.get("username"),
            password=request.data.get("password")
        )

        if user is None or not user.is_active:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username or password incorrect'
            }, status=status.HTTP_401_UNAUTHORIZED)

        #when this point is reached, the credentials are correct
        login(request, user)
        #session id cookie is sent to the browser
        #return a normal repsonse with a status 200 OK
        #UserSerializer converts python code to json
        return Response(UserSerializer(user).data)

class LogoutView(views.APIView):

    def get(self, request):
        logout(request)
        
        return Response({}, status=status.HTTP_204_NO_CONTENT)
