import { Link, NavLink } from "react-router-dom";

function Navbar(){
    return (
        <nav className="navbar">

            <Link to="/" className="logo">
                Dev<span className="logoSpan">Profile</span>
            </Link>


            <ul className="links">
                <li><NavLink to="/" className={({isActive}) => isActive ? "active" : ""} end>Inicio</NavLink></li>
                <li><NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>Acerca de</NavLink></li>
                <li><NavLink to="/dashboard" className={({isActive}) => isActive ? "active" : ""}>Dashboard</NavLink></li>
                <li><NavLink to="/editor" className={({isActive}) => isActive ? "active" : ""}>Editor</NavLink></li>
                <li><NavLink to="/preview" className={({isActive}) => isActive ? "active" : ""}>Previsualizar</NavLink></li>
            </ul>

        </nav>
    );
}

export default Navbar