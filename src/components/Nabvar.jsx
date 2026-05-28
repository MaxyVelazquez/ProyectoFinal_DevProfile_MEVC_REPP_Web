import { Link } from "react-router-dom";

function Navbar(){
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/editor">Editor</Link>
            <Link to="/preview">Preview</Link>
        </nav>
    )
}

export default Navbar