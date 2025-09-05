import React, { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard.jsx";
import { useNavigate } from "react-router-dom";

const API_URL = "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const App = ({ isDarkMode }) => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPopularMovies() {
            try {
                const res = await fetch(API_URL, {
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${API_TOKEN}`,
                    },
                });
                if (!res.ok) throw new Error(`API 요청 실패: ${res.status}`);
                const data = await res.json();

                const filteredMovies = data.results.filter(movie => !movie.adult);
                setMovies(filteredMovies);
            } catch (err) {
                console.error("영화 불러오기 실패:", err);
            }
        }

        fetchPopularMovies();
    }, []);

    if (!movies.length) return <p className="p-6">영화를 불러오는 중...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">🎬 인기 영화</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movies.map(movie => (
                    <div
                        key={movie.id}
                        className="cursor-pointer"
                        onClick={() => navigate(`/details/${movie.id}`)}
                    >
                        <MovieCard
                            posterPath={movie.poster_path}
                            title={movie.title}
                            voteAverage={movie.vote_average}
                            isDarkMode={isDarkMode}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
