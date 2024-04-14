import {BrowserRouter, Route, Routes} from "react-router-dom";
import {NavBar} from "./components/NavBar";
import MusicPlayer from "./MusicPlayer";
import Songs from "./Songs";

import Hyperfun from './Music/Hyperfun.mp3';
import MagicForest from './Music/Magic Forest.mp3';
import NeonLazerHorizon from './Music/Neon Laser Horizon.mp3';
import RiverFlute from './Music/River Flute.mp3';
import Soaring from './Music/Soaring.mp3';
import SplitInSynapse from './Music/Split In Synapse.mp3';
import TheEntertainer from './Music/The Entertainer.mp3';
import VolatileReaction from './Music/Volatile Reaction.mp3';
import WagonWheel from './Music/Wagon Wheel.mp3';
import {PlayerProvider} from "./components/PlayerContext";





function App() {
    const tracks = [
        Hyperfun,
        MagicForest,
        NeonLazerHorizon,
        RiverFlute,
        Soaring,
        SplitInSynapse,
        TheEntertainer,
        VolatileReaction,
        WagonWheel
    ];
    return (
        <BrowserRouter>
            <PlayerProvider>
                <div className="container">
                    <NavBar></NavBar>
                    <Routes>
                        <Route exact path="/" element={<Songs tracks={tracks} />} />
                        <Route path="/songs" element={<Songs tracks={tracks} />} />
                        <Route path="/player/:trackIndex" element={<MusicPlayer tracks={tracks} />} />
                    </Routes>
                </div>
            </PlayerProvider>
        </BrowserRouter>
    );
}

export default App;
