from dotenv import load_dotenv
import requests
from requests import post, get
import os
import base64
import json

load_dotenv()

access_token = os.getenv("ACCESS_TOKEN")
api_key = os.getenv("API_KEY") 

def get_genre_ids(api_key, genre_names):
    url = f"https://api.themoviedb.org/3/genre/movie/list"
    params = {"api_key": api_key, "language": "en"}

    response = requests.get(url, params=params)
    genres_data = response.json()

    genres_dict = {genre["name"].lower(): genre["id"] for genre in genres_data.get("genres", [])}
    genre_ids = [genres_dict.get(name.lower(), None) for name in genre_names]

    return [str(genre_id) for genre_id in genre_ids if genre_id is not None]
 

def discover_movies(api_key, include_adult, primary_release_date_gte, primary_release_date_lte, vote_average_gte, runtime_gte, runtime_lte, genres, keywords):
    # https://developer.themoviedb.org/reference/discover-movie
    url = "https://api.themoviedb.org/3/discover/movie"
    
    params = {
        "api_key": api_key,
        "limit": 10,
        "include_adult": include_adult,
        # "language": "en",
        "primary_release_date.gte": primary_release_date_gte,
        "primary_release_date.lte": primary_release_date_lte,
        "vote_average.gte": vote_average_gte,
        "with_runtime.gte": runtime_gte,
        "with_runtime.lte": runtime_lte,
        "with_genres": genres,
        "with_keywords": keywords,
    }
    
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        json_result = response.json()
        movies = json_result.get("results", [])

        if not movies:
            print("No movies found for the given criteria.")
            return None

        for movie in movies:
            print(f"Title: {movie.get('title')}, Release Date: {movie.get('release_date')}, Vote Average: {movie.get('vote_average')}, Language: {movie.get('original_language')}")

        return movies
    else:
        print(f"Error: {response.status_code}")
        return None

### authentication ###

url = "https://api.themoviedb.org/3/authentication"
headers = {
    "accept": "application/json",
    "Authorization": f"Bearer {access_token}"
}
response = requests.get(url, headers=headers)
# print(response.text)
    
### search by keywords ###

# print("Genre IDs:", genre_ids)
# print("with_genres Parameter:", "|".join(genre_ids))

include_adult = False
primary_release_date_gte = "2018-01-01"
primary_release_date_lte = "2021-12-31"
vote_average_gte = 7.0
runtime_gte = 30
runtime_lte = 180

genre_strings = ["Comedy", "Romance"]
genre_ids = get_genre_ids(api_key, genre_strings)
genres = "|".join(genre_ids)

keywords = ""

movies = discover_movies(api_key, include_adult, primary_release_date_gte, primary_release_date_lte, vote_average_gte, runtime_gte, runtime_lte, genres, keywords)
print(movies)