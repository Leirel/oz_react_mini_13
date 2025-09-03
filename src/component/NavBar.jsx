import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="bg-blue-500 text-white p-4 flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/details">Details</Link>
        </nav>
    );
}

export default NavBar;
