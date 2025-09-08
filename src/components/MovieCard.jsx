import React from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ posterPath, title, voteAverage, isDarkMode }) => {
    return (
        <div
            className={`shadow-md rounded-lg overflow-hidden transition-colors duration-700 ease-in-out
                ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}
        >
            <img
                src={`${IMAGE_BASE_URL}${posterPath}`}
                alt={title}
                className="w-full h-72 object-cover"
            />
            <div className="p-3">
                <h2 className="font-semibold text-lg truncate">{title}</h2>
                <p className={isDarkMode ? "text-gray-400" : "text-gray-700"}>
                    ⭐ {voteAverage}
                </p>
            </div>
        </div>
    );
};

export default MovieCard;
