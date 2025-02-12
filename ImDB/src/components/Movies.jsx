import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import Pagination from './Pagination';

function Movies() {
    const [movies, setMovies] = useState([]);
    const [pageNo, setPageNo] = useState(1);

    const handlePrev = () => {
        if (pageNo > 1) {
            setPageNo(pageNo - 1);
        }
    };

    const handleNext = () => {
        setPageNo(pageNo + 1);
    };

    useEffect(() => {
        axios.get('http://localhost:5000/movies')
            .then(res => {
                console.log(res.data); // Check data in the console
                setMovies(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [pageNo]);

    return (
        <div className="p-5">
            <div className="text-2xl m-5 font-bold text-center">
                <h1>Trending Movies</h1>
            </div>
            <div className="flex flex-row flex-wrap justify-around gap-8">
                {movies.map(movieObj => (
                    <MovieCard key={movieObj.id} movieObj={movieObj} poster_path={movieObj.poster_path} />
                ))}
            </div>
            <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
        </div>
    );
}

export default Movies;
