from dotenv import load_dotenv
import requests
from requests import post, get
import os
import base64
import json
from flask import Flask, jsonify, request
from flask_cors import CORS

load_dotenv()

access_token = os.getenv("ACCESS_TOKEN")
api_key = os.getenv("API_KEY")

#app instance
app = Flask(__name__)
CORS(app)

def get_genre_ids(api_key, genre_names):
    url = f"https://api.themoviedb.org/3/genre/movie/list"
    params = {"api_key": api_key, "language": "en"}

    response = requests.get(url, params=params)
    genres_data = response.json()

    genres_dict = {genre["name"].lower(): genre["id"] for genre in genres_data.get("genres", [])}
    genre_ids = [genres_dict.get(name.lower(), None) for name in genre_names]

    return [str(genre_id) for genre_id in genre_ids if genre_id is not None]

def get_keyword_ids(api_key, keywords):
    base_url = 'https://api.themoviedb.org/3/search/keyword'
    keyword_ids = []

    for keyword in keywords.split():
        params = {'api_key': api_key, 'query': keyword}
        response = requests.get(base_url, params=params)

        if response.status_code == 200:
            results = response.json().get('results', [])
            if results:
                # Assuming you want the ID of the first keyword in the list
                keyword_ids.append(str(results[0]['id']))
            else:
                print(f"No keyword found for '{keyword}'.")
        else:
            print(f"Error: {response.status_code}")

    return '|'.join(keyword_ids)

def discover_movies(api_key, include_adult, primary_release_date_gte, primary_release_date_lte, vote_average_gte, runtime_lte, genres):
    # https://developer.themoviedb.org/reference/discover-movie
    url = "https://api.themoviedb.org/3/discover/movie"
    
    # url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&primary_release_date.gte=1976-01-01&primary_release_date.lte=2024-12-31&sort_by=popularity.desc&vote_average.gte=3&with_genres=comedy%2C%20horror&with_runtime.lte=180"

    
    params = {
        "api_key": api_key,
        "include_adult": include_adult,
        "primary_release_date.gte": primary_release_date_gte,
        "primary_release_date.lte": primary_release_date_lte,
        "vote_average.gte": vote_average_gte,
        "with_runtime.lte": runtime_lte,
        "with_genres": genres,
        # "with_keywords": keywords,
    }
    
    print(include_adult, primary_release_date_gte, primary_release_date_lte, vote_average_gte, 
        runtime_lte, genres)
        
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        json_result = response.json()
        movies = json_result.get("results", [])

        if not movies:
            print("No movies found for the given criteria.")
            return None

        for movie in movies:
            print(f"Title: {movie.get('title')}, Release Date: {movie.get('release_date')}, Vote Average: {movie.get('vote_average')}, Language: {movie.get('original_language')}, Adult: {movie.get('adult')}")
            # title, release_date, vote_average, original_language, overview, genre_ids

        return movies
    else:
        print(f"Error: {response.status_code}")
        return None
    

@app.route("/api/home", methods=['GET', 'POST'])
def return_home():
    ### authentication ###

    url = "https://api.themoviedb.org/3/authentication"
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {access_token}"
    }
    response = requests.get(url, headers=headers)
    # print(response.text)
            
    if request.method == 'POST':
        ### Discover Movies ###
        
        data = request.json
        
        include_adult = data.get('include_adult', False)
        primary_release_date_gte = str(data.get('primary_release_date_gte', '2023')) + "-01-01"
        primary_release_date_lte = str(data.get('primary_release_date_lte', '2023')) + "-12-31"
        vote_average_gte = data.get('vote_average_gte', 7.0)
        runtime_lte = data.get('runtime_lte', 180)
        
        genre_strings = data.get('genre_strings', [])
        genre_ids = get_genre_ids(api_key, genre_strings)
        genres = "|".join(genre_ids)

        # fetch streaming platforms or query by streaming platform

        movies = discover_movies(api_key, include_adult, primary_release_date_gte, primary_release_date_lte, vote_average_gte, runtime_lte, genres)
        # print("\n", movies)
        return jsonify(movies)
        
    elif request.method == 'GET':
        include_adult = False
        vote_average_gte = 7.0
        genre_strings = []
        primary_release_date_gte = "2023-01-01"
        primary_release_date_lte = "2023-12-31"
        # runtime_gte = 30
        runtime_lte = 120
        genre_ids = get_genre_ids(api_key, genre_strings)
        genres = "|".join(genre_ids)

        movies = discover_movies(api_key, include_adult, primary_release_date_gte, primary_release_date_lte, vote_average_gte, runtime_lte, genres)
        
        return jsonify(movies)

if __name__ == "__main__":
    app.run(debug=False, port=8080)