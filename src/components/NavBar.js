import {NavLink} from "react-router-dom";

export const NavBar = () => {
    return (
        <nav className="nav-wrapper red darken">
            <ul className="right">
                <li><NavLink to="/">Songs</NavLink></li>
                <li><NavLink to="/player">Player</NavLink></li>
            </ul>
        </nav>
    );
}