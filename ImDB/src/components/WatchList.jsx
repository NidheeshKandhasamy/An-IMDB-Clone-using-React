import React, { useContext, useEffect, useState } from "react";
import genreids from '../Utility/genre';
import { AppContext } from "../context/AppContext";

function WatchList() {
    const { watchlist, setWatchList, handleRemoveFromWatchlist } = useContext(AppContext);
    const [search, setSearch] = useState("");
    const [genreList, setGenreList] = useState(['All Genres']);
    const [currGenre, setCurrGenre] = useState('All Genres');

    useEffect(() => {
        // Get unique genres from watchlist
        let tempGenres = watchlist.map((movieObj) => {
            return genreids[movieObj.genre_ids.split(',')[0]]; // Get first genre ID
        });
        tempGenres = new Set(tempGenres);
        setGenreList(['All Genres', ...tempGenres]); // Add All Genres option
    }, [watchlist]);

    const handleFilter = (genre) => {
        setCurrGenre(genre);
    };

    return (
        <>
            <div className="flex justify-center flex-wrap m-4">
                {genreList.map((genre) => (
                    <div
                        key={genre}
                        onClick={() => handleFilter(genre)}
                        className={currGenre === genre ? "flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold mx-4" : 'flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold mx-4'}
                    >
                        {genre}
                    </div>
                ))}
            </div>

            <div className="flex justify-center my-4">
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    type="text"
                    placeholder="Search Movies"
                    className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4"
                />
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
                <table className="w-full text-gray-500 text-center">
                    <thead className="border-b-2">
                        <tr>
                            <th>Name</th>
                            <th>Ratings</th>
                            <th>Popularity</th>
                            <th>Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {watchlist.filter((movieObj) => {
                            // Filter by genre
                            if (currGenre === 'All Genres') {
                                return true;
                            } else {
                                const genreIds = movieObj.genre_ids.split(','); // Get genre IDs
                                return genreIds.some(id => genreids[id] === currGenre);
                            }
                        }).filter((movieObj) => {
                            return movieObj.title.toLowerCase().includes(search.toLowerCase());
                        }).map((movieObj) => {
                            const genreNames = movieObj.genre_ids.split(',').map(id => genreids[id]).join(', '); // Convert IDs to names
                            return (
                                <tr className="border-b-2" key={movieObj.id}>
                                    <td className="flex items-center px-6 py-4">
                                        <img
                                            className="h-[6rem] w-[10rem]"
                                            src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                                            alt={movieObj.title}
                                        />
                                        <div className="mx-10">{movieObj.title}</div>
                                    </td>
                                    <td>{movieObj.vote_average}</td>
                                    <td>{movieObj.popularity}</td>
                                    <td>{genreNames}</td>
                                    <td onClick={() => handleRemoveFromWatchlist(movieObj)} className="text-red-800 cursor-pointer">Delete</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default WatchList;
