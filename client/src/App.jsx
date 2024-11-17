import MoviesList from "./MoviesList"
import OptionBar from "./OptionBar"
import { FaReact } from 'react-icons/fa'
import { MdKeyboardOptionKey, MdKeyboardReturn } from 'react-icons/md';
import axios from 'axios'
import { useState , useEffect } from 'react'


const App = () => {

  const [movies , setMovies] = useState([])

  const fetchAPI = async () => {
    try{
      const res = await axios.get('http://localhost:8000/api/users')
      console.log('hello')
      console.log(res.data.movies)
      setMovies(res.data.movies)
    }
    catch(err){
      console.log('app') 
      console.log(err)
    }
  }


  useEffect(() => {
    fetchAPI()
  } , []) 

  // console.log(movies)

  // var movies = [{
  //   name: 'Avatar Movie',
  //   desc: 'Avatar Movie',
  // },
  // {
  //   name: 'Spiderman',
  //   desc: 'Spiderman Movie'
  // },
  // {
  //   name: 'Ironman',
  //   desc: 'Ironman Movie'
  // },
  // {
  //   name: 'Jackie Chan',
  //   desc: 'Jackie Chan movie'
  // },
  // {
  //   name: 'Venom',
  //   desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi commodi quidem omnis possimus obcaecati asperiores sit fuga ab, ullam esse delectus, similique ad ex officiis, perspiciatis unde vero voluptatem culpa.'
  // },
  // {
  //   name: 'Harry potter',
  //   desc: 'movie  '
  // }
  // ] 

  const movieGenres = [
    "Action", "Adventure", "Comedy", "Crime", "Drama", "Fantasy", 
    "Historical", "Horror", "Mystery", "Romance", "Science Fiction", 
    "Thriller", "Western", "Musical", "War", "Animation", "Biography", 
    "Documentary", "Family", "Film Noir", "Sport", "Superhero"
  ];

  // console.log(movieGenres)
  

  return (
    <>
    <div className = 'flex gap-2 mx-3 my-2 text-xl text-slate-600'>
    <MdKeyboardOptionKey className = 'text-blue-500 text-3xl'/>
    <h1>Recommondation System</h1>
    </div>
      <div className = 'my-36 mx3'>
        <MoviesList movies={movies} movieGenres = {movieGenres}/>
      </div>
    </>
  )
}

export default App