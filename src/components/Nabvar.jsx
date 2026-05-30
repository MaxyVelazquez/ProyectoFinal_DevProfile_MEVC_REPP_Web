import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css"

function Navbar(){
    return (
        <nav className={styles.navbar}>

            <Link to="/" className={styles.logo}>
                Dev<span className={styles.logoSpan}>Profile</span>
            </Link>


            <ul className={styles.links}>
                <li><NavLink to="/" className={({isActive}) => isActive ? styles.active : ""} end>Inicio</NavLink></li>
                <li><NavLink to="/about" className={({isActive}) => isActive ? styles.active : ""}>Acerca de</NavLink></li>
                <li><NavLink to="/dashboard" className={({isActive}) => isActive ? styles.active : ""}>Dashboard</NavLink></li>
                <li><NavLink to="/editor" className={({isActive}) => isActive ? styles.active : ""}>Editor</NavLink></li>
                <li><NavLink to="/preview" className={({isActive}) => isActive ? styles.active : ""}>Previsualizar</NavLink></li>
            </ul>

        </nav>
    );
}

export default Navbar