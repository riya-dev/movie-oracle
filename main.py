from dotenv import load_dotenv
import requests
from requests import post, get
import os
import base64
import json

load_dotenv()

access_token = os.getenv("ACCESS_TOKEN")
api_key = os.getenv("API_KEY")    

def discover_movies(api_key):
    # https://developer.themoviedb.org/reference/discover-movie
    url = "https://api.themoviedb.org/3/discover/movie"

### authentication ###

url = "https://api.themoviedb.org/3/authentication"
headers = {
    "accept": "application/json",
    "Authorization": f"Bearer {access_token}"
}
response = requests.get(url, headers=headers)
print(response.text)
    
### search by keywords ###
search_term = "comedy"
# keyword_id = discover_movies(api_key)