import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import genreids from '../Utility/genre'; // Import genre mapping

function MovieCard({ movieObj, poster_path }) {
    const myContext = useContext(AppContext);

    function doesContain(movieObj) {
        return myContext.watchlist.some(movie => movie.id === movieObj.id);
    }

    // Convert genre_ids string to an array and map to genre names
    const genreNames = movieObj.genre_ids.split(',').map(id => genreids[id]).join(', ');

    return (
      <div
      className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${poster_path})` }} // Change to w500
  >
  
            {doesContain(movieObj) ? (
                <div onClick={() => myContext.handleRemoveFromWatchlist(movieObj)} className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60">
                    &#10060;
                </div>
            ) : (
                <div onClick={() => myContext.handleAddtoWatchlist(movieObj)} className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60">
                    &#128525;
                </div>
            )}
            <div className="text-white text-xl w-full p-2 text-center bg-gray-900/60">
                {movieObj.title}
            </div>
            <div className="text-white text-sm w-full p-2 text-center bg-gray-900/60">
                {genreNames} {/* Display genres here */}
            </div>
        </div>
    );
}

export default MovieCard;
