import React from 'react'
import { FaRegKeyboard } from "react-icons/fa"
import { useState } from 'react'
import axios from 'axios'
import Thumbnail from './Thumbnail'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { SiTicktick } from "react-icons/si";



const OptionBar = (props) => {
    const [movie, setMovie] = useState('')
    const [genere, setGenere] = useState('')
    const [recommendedMovies, setRecommendedMovies] = useState([])
    const [budget, setBudget] = useState('')
    const [runtime, setRuntime] = useState('')
    const [popularity, setPopularity] = useState('')
    const [votes, setVotes] = useState('')
    const [showContent, setShowContent] = useState(false)
    const [count, setCount] = useState('')
    const [selected, setSelected] = useState(false)
    const [select, setSelect] = useState(false)

    const movieGenres = props.movieGenres
    // console.log(movieGenres)

    const handleSelected = () => {
        setSelected((prevState) => !prevState)
    }

    const handleSelect = () => {
        setSelect((prevState) => !prevState)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!movie.trim()) { return }

        try {

            const requestData = { movie }
            console.log(genere)
            if (genere) {
                console.log('hello genere')
                requestData.genere = genere
            }

            if (budget && !isNaN(Number(budget))) requestData.budget = Number(budget);
            if (runtime && !isNaN(Number(runtime))) requestData.runtime = Number(runtime);
            if (popularity && !isNaN(Number(popularity))) requestData.popularity = Number(popularity);
            if (votes && !isNaN(Number(votes))) requestData.votes = Number(votes);
            if (count && !isNaN(Number(count))) requestData.count = Number(count);


            const { data } = await axios.post(
                'http://localhost:8000/api/users',
                requestData,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log("Recommended Movies:", data.movies);
            setRecommendedMovies(data.movies)
            setMovie('')
        } catch (error) {
            console.log('hello')
            console.error("Error fetching recommendations:", error);
        }
    }


    const handleGenere = (genereVal) => {
        setGenere(genereVal)
        console.log(genere)
    }

    const handleShowContent = () => {
        setShowContent((prevState) => !prevState)
        console.log(showContent)
    }

    // console.log(recommendedMovies)


    return (
        <>
            <form className='flex items-center justify-center flex-col' onSubmit={(e) => handleSubmit(e)}>
                <div className='px-4 w-[80%] bg-slate-200 rounded-2xl m-5 flex p-2 items-center align-center gap-1'>
                    <FaRegKeyboard className='text-xl text-slate-500' />
                    <input
                        type="text"
                        className='w-full text-slate-900 text-lg bg-transparent border-none outline-none  rounded-2xl p-1'
                        placeholder="Enter your favourite movie"
                        onChange={(e) => setMovie(e.target.value)}
                    />
                    <button onClick={handleSelect} className={`${select ? 'opacity-60' : ''}`} type='submit'>
                        <SiTicktick className = 'text-3xl opacity-60'/>
                    </button>

                </div>

                <div className="mx-52 my-4 flex gap-4 flex-wrap justify-center">
                    {movieGenres.map((genre, index) => (
                        <span onClick={() => handleSelected}>
                            <p
                                key={index}
                                onClick={() => setGenere(genre)} // Pass genre value directly
                                className={`p-1 px-2 rounded-3xl opacity-80 text-slate-800 cursor-pointer ${genere === genre ? 'bg-blue-200' : ''
                                    } ${selected ? 'bg-blue-200' : ''}`}
                            >
                                {genre}
                            </p>
                        </span>
                    ))}
                </div>


                <div className={`self-start ms-[11%] flex items-center mb-4 pt-3`}>
                    <IoIosArrowDropdownCircle onClick={handleShowContent} className={`text-xl ${showContent ? 'opacity-50' : ''}`} />
                    <p className='ml-2 text-lg text-slate-500 opacity-80'>Additional Filters</p>
                </div>

                <div className={`self-start ms-[11%] mt-4 gap-4 ${showContent ? '' : 'hidden'}`}>
                    <div className='w-[500px] p-10'>
                        <div className='flex justify-between'><p className='opacity-80 text-slate-800 my-3'>BUDGET(min 1000)</p>
                            <input onChange={(e) => setBudget(e.target.value)} className='opacity-80 text-slate-900 text-lg bg-slate-200 border-none outline-none  rounded-md focus:border focus:border-black mt-4' type="number" />
                        </div>
                        <div className='flex justify-between'><p className='opacity-80 text-slate-800 my-3'>RUNTIME(min 100)</p>
                            <input onChange={(e) => setRuntime(e.target.value)} className='opacity-80 text-slate-900 text-lg bg-slate-200 border-none outline-none  rounded-md focus:border focus:border-black mt-4' type="number" />
                        </div>
                        <div className='flex justify-between'><p className='opacity-80 text-slate-800 my-3'>POPULARITY(min 0)</p>
                            <input onChange={(e) => setPopularity(e.target.value)} className='opacity-80 text-slate-900 text-lg bg-slate-200 border-none outline-none  rounded-md focus:border focus:border-black mt-4' type="number" />
                        </div>
                        <div className='flex justify-between'><p className='opacity-80 text-slate-800 my-3'>VOTES(min 0)</p>
                            <input onChange={(e) => setVotes(e.target.value)} className='opacity-80 text-slate-900 text-lg bg-slate-200 border-none outline-none  rounded-md focus:border focus:border-black mt-4' type="number" />
                        </div>
                        <div className='flex justify-between'><p className='opacity-80 text-slate-800 my-3'>COUNT(min 0)</p>
                            <input onChange={(e) => setCount(e.target.value)} className='opacity-80 text-slate-900 text-lg bg-slate-200 border-none outline-none  rounded-md focus:border focus:border-black mt-4' type="number" />
                        </div>
                    </div>
                </div>
            </form>
            {
                recommendedMovies &&
                <>
                    <Thumbnail movies={recommendedMovies} />
                </>
            }
        </>
    );
}

export default OptionBar;