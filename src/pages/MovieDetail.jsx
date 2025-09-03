import movieDetailData from "../data/movieDetailData.json";

const baseUrl = "https://image.tmdb.org/t/p/w500";

function MovieDetail() {
    const movie = movieDetailData;

    return (
        <div className="min-h-screen bg-[#242424] text-white p-6">
            <div className="max-w-4xl mx-auto bg-[#1e1e1e] shadow-lg rounded-lg overflow-hidden">
                <img
                    src={`${baseUrl}${movie.backdrop_path || movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-96 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                    <p className="text-gray-300 mb-2">⭐ {movie.vote_average}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {movie.genres.map((genre) => (
                            <span
                                key={genre.id}
                                className="bg-gray-700 px-3 py-1 rounded-full text-sm text-white"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>
                    <p className="text-gray-200">{movie.overview}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
