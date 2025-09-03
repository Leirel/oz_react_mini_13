import { Link } from "react-router-dom";

const baseUrl = "https://image.tmdb.org/t/p/w500";

function MovieCard({ id, title, poster_path, vote_average }) {
    return (
        <Link to="/details">
            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform">
                <img
                    src={`${baseUrl}${poster_path}`}
                    alt={title}
                    className="w-full h-80 object-cover"
                />
                <div className="p-2">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="text-sm text-gray-600">⭐ {vote_average}</p>
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;
