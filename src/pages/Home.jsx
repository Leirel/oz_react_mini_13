import movieListData from "../data/movieListData.json";
import MovieCard from "../components/MovieCard";

function Home() {
    return (
        <div className="grid grid-cols-4 gap-4">
            {movieListData.map((movie) => (
                <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    vote_average={movie.vote_average}
                />
            ))}
        </div>
    );
}

export default Home;
