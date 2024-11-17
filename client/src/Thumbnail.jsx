import React from 'react'
import { useState } from 'react'
import { MdPlayCircle, MdPlayCircleFilled } from "react-icons/md";

const Thumbnail = (props) => {
    const [descView, setDescView] = useState({})
    const thumbnailStyles = ['thumbnail-style1', 'thumbnail-style2', 'thumbnail-style3']
    // console.log(props.movies)
    var i = 0
    // console.log(props.movies)

    const toggleDescription = (index) => {
        setDescView((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <>
            <div className='my-10 mx-24'>
                {props.movies.map((movie, index) => (
                    <div key={index} className=''>
                        <ul className='flex'>

                            <li id={thumbnailStyles[(i++) % thumbnailStyles.length]} key={index} className='h-max w-max py-3 px-7 m-2 rounded-md'>

                                <MdPlayCircleFilled className='opacity-60 text-white'></MdPlayCircleFilled>

                            </li>

                            <div className='flex flex-col py-2 px-2'>
                                <p>{movie.name}</p>
                                <p
                                    onClick={() => toggleDescription(index)}
                                    className='opacity-40 text-sm cursor-pointer'
                                >   
                                    {descView[index] ? movie.desc : (movie.desc.length > 25 ? movie.desc.slice(0, 25) + '...' : movie.desc)}
                                </p>
                            </div>
                        </ul >
                    </div >
                ))}
            </div>
        </>
    )

}

export default Thumbnail