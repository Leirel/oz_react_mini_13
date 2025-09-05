import { useState, useEffect } from "react";
<<<<<<< HEAD
import { useSearchParams, useNavigate } from "react-router-dom";
=======
import { useSearchParams } from "react-router-dom";
>>>>>>> ccd48814a291c023a58615c1ac70435e29754ba4
import MovieCard from "../components/MovieCard";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

<<<<<<< HEAD
export default function SearchPage({ isDarkMode }) {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
=======
export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [results, setResults] = useState([]);
>>>>>>> ccd48814a291c023a58615c1ac70435e29754ba4

    useEffect(() => {
        if (!query) return;

        async function fetchSearchResults() {
<<<<<<< HEAD
            setLoading(true);
=======
>>>>>>> ccd48814a291c023a58615c1ac70435e29754ba4
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
<<<<<<< HEAD
                if (!res.ok) throw new Error(`API 요청 실패: ${res.status}`);
                const data = await res.json();
                const filteredResults = (data.results || []).filter(movie => !movie.adult);
                setResults(filteredResults);
            } catch (err) {
                console.error("검색 실패:", err);
                setResults([]);
            } finally {
                setLoading(false);
=======

                if (!res.ok) {
                    throw new Error(`API 요청 실패: ${res.status}`);
                }

                const data = await res.json();
                setResults(data.results || []);
            } catch (err) {
                console.error("검색 실패:", err);
>>>>>>> ccd48814a291c023a58615c1ac70435e29754ba4
            }
        }

        fetchSearchResults();
    }, [query]);

    return (
<<<<<<< HEAD
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
=======
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
>>>>>>> ccd48814a291c023a58615c1ac70435e29754ba4
                ))}
            </div>
        </div>
    );
}
<<<<<<< HEAD
=======

>>>>>>> ccd48814a291c023a58615c1ac70435e29754ba4
