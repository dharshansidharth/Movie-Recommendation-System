from flask import  Flask , jsonify , request
from flask_cors import CORS
from recommend.main import rec


app = Flask(__name__)
cors = CORS(app , origins = '*')

@app.route('/api/users' , methods = ['GET' , 'POST'])

def movies():
    
    user_movie = ''
    user_budget = 1000
    user_runtime = 100
    user_popularity = 0
    user_votes = 0
    user_count = 10
    
    
    if request.method == 'POST':
        print(request)
        if request.content_type != 'application/json':
            return jsonify({'error': 'Content-Type must be application/json'}), 415

        data = request.get_json()
        if not data or 'movie' not in data:
            return jsonify({'error': 'Invalid JSON or missing "movie" key'}), 400

        user_movie = data.get('movie') if data.get('movie') else ''
        user_genere = data.get('genere') if data.get('genere') else ''
        user_budget = data.get('budget') if data.get('budget') else 1000
        user_runtime = data.get('runtime') if data.get('runtime') else 100
        user_popularity = data.get('popularity') if data.get('popularity') else 0
        user_votes = data.get('votes') if data.get('votes') else 0
        user_count = data.get('count') if data.get('count') else 0
        
        print(f'Received movie: {user_movie}')
        print(f'Received genere: {user_genere}')
        print(f'Received budget: {user_budget}')
        print(f'Received runtime: {user_runtime}')
        print(f'Received popularity: {user_popularity}')
        print(f'Received votes: {user_votes}')
        print(f'Received count: {user_count}')
        
    
    
    
    choices = {
        'title' : user_movie.title(),
        'genere' : user_genere,
        'budget' : user_budget,
        'runtime' : user_runtime,
        'popularity' : user_popularity,
        'votes' : user_votes,
        'count' : user_count,
    }
    
    print(user_movie)
    
    recommended_movies = rec(choices)
    
    print(recommended_movies)
    return jsonify({'movies' : recommended_movies}) , 200
    
    
                
    return jsonify({
        'movies' : [{
            'name': 'Avatar Movie',
            'desc': 'Avatar Movie',
        },
        {
            'name': 'Spiderman',
            'desc': 'Spiderman Movie'
        },
        {
            'name': 'Ironman',
            'desc': 'Ironman Movie'
        },
        {
            'name': 'Jackie Chan',
            'desc': 'Jackie Chan movie'
        },
        {
            'name': 'Venom',
            'desc': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi commodi quidem omnis possimus obcaecati asperiores sit fuga ab, ullam esse delectus, similique ad ex officiis, perspiciatis unde vero voluptatem culpa.'
        },
        {
            'name': 'Harry potter',
            'desc': 'movie  '
        },
        {
            'name': 'Harry potter',
            'desc': 'movie  '
        }
        ] 
    }
    )
    
if __name__ == '__main__':
    app.run(debug = True , port = 8000)