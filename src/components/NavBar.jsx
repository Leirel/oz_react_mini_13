import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

function NavBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 500);
    const navigate = useNavigate();

    useEffect(() => {
        if (debouncedSearch.trim()) {
            navigate(`/search?query=${debouncedSearch}`);
        }
    }, [debouncedSearch, navigate]);

    return (
        <header className="bg-[#242424] text-white px-6 py-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2 text-xl font-bold">
                <span role="img" aria-label="logo">🎬</span>
                <Link to="/">영화 정보</Link>
            </div>

            <div className="flex-1 mx-6 max-w-md">
                <input
                    type="text"
                    placeholder="영화를 검색하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-[#1e1e1e] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex gap-2">
                <Link
                    to="/login"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
                >
                    로그인
                </Link>
                <Link
                    to="/signup"
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white text-sm"
                >
                    회원가입
                </Link>
            </div>
        </header>
    );
}

export default NavBar;
