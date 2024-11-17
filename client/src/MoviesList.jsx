import React from 'react'
import OptionBar from './OptionBar'

const MoviesList = (props) => {
    const movies = props.movies

    
    return (
        <>
            <div >
            <OptionBar movieGenres={props.movieGenres} />
            </div>
        </>
    )
}

export default MoviesList