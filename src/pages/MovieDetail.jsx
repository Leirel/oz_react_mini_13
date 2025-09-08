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

    if (!movie) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <p>⏳ 상세정보 불러오는 중...</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div
                className={`max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden transition-colors duration-700 ease-in-out
                    ${isDarkMode ? "bg-[#1e1e1e] text-white" : "bg-gray-100 text-black"}`}
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
                        {movie.overview || "줄거리 정보가 없습니다."}
                    </p>
                </div>
            </div>
        </div>
    );
}
