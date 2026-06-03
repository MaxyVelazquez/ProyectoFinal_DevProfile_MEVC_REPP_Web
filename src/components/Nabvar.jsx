import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar(){
    const [tema, setTema] = useState(
        localStorage.getItem('tema') || 'claro'
    );

    useEffect(() => {
        document.documentElement.classList.toggle(
            'dark',
            tema === 'oscuro'
        );
    }, [tema]);

    function cambiarTema() {
        const nuevoTema =
        tema === 'oscuro'
            ? 'claro'
            : 'oscuro';

        setTema(nuevoTema);
        localStorage.setItem('tema', nuevoTema);
    }

    return (
        <nav className="navbar">

            <Link to="/" className="logo">
                Dev<span className="resaltar">Profile</span>
            </Link>


            <ul className="links">
                <li><NavLink to="/" className={({isActive}) => isActive ? "active" : ""} end>Inicio</NavLink></li>
                <li><NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>Acerca de</NavLink></li>
                <li><NavLink to="/dashboard" className={({isActive}) => isActive ? "active" : ""}>Panel de control</NavLink></li>
                <li><NavLink to="/editor" className={({isActive}) => isActive ? "active" : ""}>Editor</NavLink></li>
                <li><NavLink to="/preview" className={({isActive}) => isActive ? "active" : ""}>Previsualizar</NavLink></li>
            </ul>

            <button className="btnModoOscuro" onClick={cambiarTema}>
                {localStorage.getItem('tema') === 'oscuro' ? 'Modo Claro' : 'Modo Oscuro'}
            </button>

        </nav>
    );
}

export default Navbar