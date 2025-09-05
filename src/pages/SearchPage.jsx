import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function SearchPage({ isDarkMode }) {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!query) return;

        async function fetchSearchResults() {
            setLoading(true);
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
                if (!res.ok) throw new Error(`API 요청 실패: ${res.status}`);
                const data = await res.json();
                const filteredResults = (data.results || []).filter(movie => !movie.adult);
                setResults(filteredResults);
            } catch (err) {
                console.error("검색 실패:", err);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }

        fetchSearchResults();
    }, [query]);

    return (
        <div className={`p-6 transition-colors duration-700 ease-in-out
            ${isDarkMode ? "bg-[#141414] text-white" : "bg-white text-black"}`}>
            {!query && <p>검색어를 입력해주세요.</p>}
            {loading && <p>검색 중...</p>}
            {!loading && query && results.length === 0 && <p>검색 결과가 없습니다.</p>}

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
                {results.map(movie => (
                    <div key={movie.id} className="cursor-pointer" onClick={() => navigate(`/details/${movie.id}`)}>
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
}
