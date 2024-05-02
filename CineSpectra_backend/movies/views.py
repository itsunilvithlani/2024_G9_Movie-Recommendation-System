from .models import Movies
# from accounts.models import SearchLimit
from .serializers import MoviesSerializer, MovieIdSerializer
from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.views.generic import DetailView
import pickle
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status

# Create your views here.

class MovieList(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Movies.objects.all()
    serializer_class = MoviesSerializer

class MovieDetail(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    model = Movies
    serializer_class = MoviesSerializer

    def get_object(self, queryset=None):
        movie_id = self.kwargs.get('movie_id')
        return get_object_or_404(Movies, movie_id=movie_id)

class RecommendMovieList(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = [JWTAuthentication]
    model = Movies
    serializer_class = MovieIdSerializer

    def get_queryset(self):
        user = self.request.user
        search_limit = user.get_search_limit()

        if not user.is_subscribed and search_limit.remaining_count == 0:
            # Render the error response before returning it
            # return Response({"error": "Search limit exceeded"}, status=status.HTTP_400_BAD_REQUEST)
            return Movies.objects.none()

        # Check if the user is subscribed or has remaining search count
        if user.is_subscribed or search_limit.remaining_count > 0:
            movie_id = self.kwargs.get('movie_id')
            movie_obj = get_object_or_404(Movies, movie_id=movie_id)
            movie_index = movie_obj.id

            similarity = pickle.load(open('similarity.pkl', 'rb'))
            distances = similarity[movie_index - 1]
            movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:16]

            recommendations = []
            for i in movies_list:
                obj = Movies.objects.get(id=(i[0] + 1))
                recommendations.append(obj)

            if not user.is_subscribed:
                user.decrement_search_count()

            return recommendations
        # else:
        #     # If the user is unsubscribed and has exceeded the search limit, return error response
        #     return Response({"error": "Search limit exceeded"}, status=status.HTTP_400_BAD_REQUEST)




# def get_queryset(self):
    #     movie_id = self.kwargs.get('movie_id')
    #     movie_obj = Movies.objects.get(movie_id=movie_id)
    #     movie_index = movie_obj.id
    #     print(movie_index)
    #
    #     # movies = pickle.load(open('movies.pkl', 'rb'))
    #     #
    #     # cv = CountVectorizer(max_features=5000, stop_words='english')
    #     # vectors = cv.fit_transform(movies['tags']).toarray()
    #     #
    #     # similarity = cosine_similarity(vectors)
    #
    #     similarity = pickle.load(open('similarity.pkl', 'rb'))
    #
    #     distances = similarity[movie_index - 1]
    #     print(distances)
    #     movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:16]
    #
    #     recommendations = []
    #     for i in movies_list:
    #         obj = Movies.objects.get(id=(i[0] + 1))
    #         recommendations.append(obj)
    #     return recommendations