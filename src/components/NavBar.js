import {NavLink} from "react-router-dom";
import {PlayerContext} from "./PlayerContext";
import {useContext} from "react";

export const NavBar = () => {
    const { currentTrackIndex } = useContext(PlayerContext);
    return (
        <nav className="nav-wrapper red darken">
            <ul className="right">
                <li><NavLink to="/">Songs</NavLink></li>
                <li><NavLink to="/player/${currentTrackIndex}">Player</NavLink></li>
            </ul>
        </nav>
    );
}