import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const baseUrl = "https://image.tmdb.org/t/p/w500";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function MovieDetail({ isDarkMode }) {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function fetchMovieDetail() {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
                    {
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${API_TOKEN}`,
                        },
                    }
                );
                if (!res.ok) throw new Error("API 요청 실패");
                const data = await res.json();
                setMovie(data);
            } catch (err) {
                console.error("영화 상세 불러오기 실패:", err);
            }
        }
        fetchMovieDetail();
    }, [id]);

    if (!movie) return <p className="p-6">불러오는 중...</p>;

    return (
        <div
            className={`min-h-screen p-6 transition-colors duration-700 ease-in-out
                ${isDarkMode ? "bg-[#141414] text-white" : "bg-white text-black"}`}
        >
            <div
                className={`max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden transition-colors duration-700 ease-in-out
                    ${isDarkMode ? "bg-[#1e1e1e]" : "bg-gray-100"}`}
            >
                <img
                    src={`${baseUrl}${movie.backdrop_path || movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-96 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                    <p className={`mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        ⭐ {movie.vote_average}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {movie.genres?.map((genre) => (
                            <span
                                key={genre.id}
                                className={`px-3 py-1 rounded-full text-sm transition-colors duration-700 ease-in-out
                                    ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"}`}
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>
                    <p className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
                        {movie.overview}
                    </p>
                </div>
            </div>
        </div>
    );
}
