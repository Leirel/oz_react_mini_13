import React, { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard.jsx";
import { Link } from "react-router-dom";

const App = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`, // .env 사용
                    },
                });
                const data = await res.json();

                // ✅ 성인 영화 제외
                const filtered = data.results.filter((movie) => !movie.adult);
                setMovies(filtered);
            } catch (err) {
                console.error("영화 불러오기 실패:", err);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">🎬 영화 목록</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movies.map((movie) => (
                    <Link to={`/details/${movie.id}`} key={movie.id}>
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
