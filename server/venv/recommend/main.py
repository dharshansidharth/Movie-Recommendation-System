import numpy as np
import pandas as pd
import difflib
from sklearn.metrics.pairwise import cosine_similarity
from collections import Counter
import math


def rec(choices):
    recommendations = []
    
    print(choices)
    
    # Load dataset
    try:
        # Added error handling to ensure the dataset is loaded correctly.
        movies_data = pd.read_csv('movies.csv')
    except FileNotFoundError:
        print("Error: 'movies.csv' not found.")
        return []  # Return an empty list if the file is not found.
    except Exception as e:
        print(f"Error loading dataset: {e}")
        return []  # Catch and print any other loading errors.

    # Fill missing values
    # Ensured columns like genres, director, cast, etc., have default values to avoid NaN issues.
    movies_data['genres'] = movies_data['genres'].fillna('')
    movies_data['director'] = movies_data['director'].fillna('Unknown')
    movies_data['budget'] = movies_data['budget'].fillna(0)
    movies_data['runtime'] = movies_data['runtime'].fillna(0)
    movies_data['popularity'] = movies_data['popularity'].fillna(0)
    movies_data['vote_average'] = movies_data['vote_average'].fillna(0)
    movies_data['cast'] = movies_data['cast'].fillna('')

    # Combine features into a single string
    movies_data['combined_features'] = (
        movies_data['genres'] + ' ' +
        movies_data['director'] + ' ' +
        movies_data['cast'].astype(str)
    )

    # Custom implementation of TF-IDF
    def calculate_tf_idf(corpus):
        # Added comments for clarity and improved readability of this helper function.
        tokenized_docs = [doc.lower().split() for doc in corpus]  # Tokenize the documents.
        vocabulary = sorted(set(word for doc in tokenized_docs for word in doc))  # Build vocabulary.
        
        # Term Frequency (TF)
        tf_matrix = []
        for doc in tokenized_docs:
            word_counts = Counter(doc)
            tf = [word_counts.get(word, 0) / len(doc) for word in vocabulary]
            tf_matrix.append(tf)

        # Inverse Document Frequency (IDF)
        num_docs = len(tokenized_docs)
        idf = [
            math.log((1 + num_docs) / (1 + sum(1 for doc in tokenized_docs if word in doc))) + 1
            for word in vocabulary
        ]

        tf_idf_matrix = np.array(tf_matrix) * np.array(idf)  # Element-wise multiplication.
        return tf_idf_matrix, vocabulary

    # Calculate TF-IDF for combined features
    tf_idf_matrix, _ = calculate_tf_idf(movies_data['combined_features'])

    # Compute cosine similarity matrix
    similarity = cosine_similarity(tf_idf_matrix)

    # User input for favorite movie
    movie_name = choices.get('title', '').strip()
    if not movie_name:
        # Added check for missing title input from the user.
        print("Error: Movie title is required.")
        return []

    list_of_all_titles = movies_data['title'].tolist()
    find_close_match = difflib.get_close_matches(movie_name, list_of_all_titles)
    
    if not find_close_match:
        # Added fallback for no close match found.
        print("No close match found for the movie title.")
        return []

    close_match = find_close_match[0]
    index_of_the_movie = movies_data[movies_data.title == close_match]['index'].values[0]

    similarity_score = list(enumerate(similarity[index_of_the_movie]))
    sorted_similar_movies = sorted(similarity_score, key=lambda x: x[1], reverse=True)

    # Apply filters from user preferences
    preferred_genre = choices.get('genere', '').strip().lower()  # Genre filter is now case-insensitive.
    min_budget = choices.get('budget', 0)
    max_runtime = choices.get('runtime', float('inf'))  # Default to no runtime limit.
    min_popularity = choices.get('popularity', 0)
    min_vote_avg = choices.get('votes', 0)
    num_recommendations = choices.get('count', 10)  # Added default number of recommendations.

    for movie in sorted_similar_movies[1:]:
        movie_data = movies_data.iloc[movie[0]]
        # Added detailed filter checks.
        if (movie_data['budget'] >= min_budget and 
            movie_data['runtime'] <= max_runtime and 
            movie_data['popularity'] >= min_popularity and 
            movie_data['vote_average'] >= min_vote_avg):
            
            # Check if the preferred genre matches or is empty.
            if preferred_genre in movie_data['genres'].lower() or not preferred_genre:
                recommendations.append({
                    'name': movie_data['title'],
                    'desc': movie_data.get('keywords', 'No description available')  # Fallback for missing keywords.
                })
                if len(recommendations) >= num_recommendations:
                    break  # Stop once we have enough recommendations.

    if not recommendations:
        # Added a user-friendly message if no movies matched the filters.
        print("No movies matched the filters.")
    return recommendations


if __name__ == '__main__':
    res = rec({
        'title': 'harry potter',
        'genere': '',
        'budget': 1000,
        'runtime': 200,
        'popularity': 0,
        'votes': 0,
        'count': 10,
    })

    print(res)
