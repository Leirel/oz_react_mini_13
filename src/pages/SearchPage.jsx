import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (!query) return;

        async function fetchSearchResults() {
            try {
                const res = await fetch(
                    `${API_URL}?query=${encodeURIComponent(query)}&language=ko-KR`,
                    {
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${API_TOKEN}`,
                        },
                    }
                );

                if (!res.ok) {
                    throw new Error(`API 요청 실패: ${res.status}`);
                }

                const data = await res.json();
                setResults(data.results || []);
            } catch (err) {
                console.error("검색 실패:", err);
            }
        }

        fetchSearchResults();
    }, [query]);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">🔍 “{query}” 검색 결과</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {results.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        posterPath={movie.poster_path}
                        title={movie.title}
                        voteAverage={movie.vote_average}
                    />
                ))}
            </div>
        </div>
    );
}

