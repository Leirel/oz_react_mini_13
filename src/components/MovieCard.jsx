import React from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ posterPath, title, voteAverage }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform">
            <img
                src={`${IMAGE_BASE_URL}${posterPath}`}
                alt={title}
                className="w-full h-72 object-cover"
            />
            <div className="p-3">
                <h2 className="font-semibold text-lg truncate">{title}</h2>
                <p className="text-sm text-gray-600">⭐ {voteAverage}</p>
            </div>
        </div>
    );
};

export default MovieCard;
