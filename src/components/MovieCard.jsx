import React from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ posterPath, title, voteAverage }) => {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <img
                src={`${IMAGE_BASE_URL}${posterPath}`}
                alt={title}
                className="w-full h-72 object-cover"
            />
            <div className="p-3">
                <h2 className="font-semibold text-lg truncate text-black dark:text-white">{title}</h2>
                <p className="text-sm text-gray-700 dark:text-gray-400">⭐ {voteAverage}</p>
            </div>
        </div>
    );
};

export default MovieCard;
