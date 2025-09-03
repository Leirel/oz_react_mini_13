import React, { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard.jsx";
import movieListData from "./data/movieListData.json";
import { Link } from "react-router-dom";

const App = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        setMovies(movieListData.results);
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">🎬 영화 목록</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movies.map((movie) => (
                    <Link to="/details" key={movie.id}>
                        <MovieCard
                            posterPath={movie.poster_path}
                            title={movie.title}
                            voteAverage={movie.vote_average}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default App;
