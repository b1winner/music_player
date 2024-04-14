import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PlayerContext } from './components/PlayerContext';
import { Howl } from 'howler';

const Songs = ({ tracks }) => {
    const { setCurrentTrackIndex, setIsPlaying, sound, setSound, setTotalTime } = useContext(PlayerContext);

// In your Songs.js file

const playSong = (index) => {
    if (sound) {
        sound.unload();
    }
    const newSound = new Howl({
        src: [tracks[index]],
        onend: () => {
            setCurrentTrackIndex((index + 1) % tracks.length);
        },
        onload: () => {
            setTotalTime(newSound.duration());
        }
    });
    setSound(newSound);
    setCurrentTrackIndex(index);
    setIsPlaying(false);
};

    return (
        <div>
            <h1>Songs</h1>
            <ul>
                {tracks.map((track, index) => (
                    <li key={index}>
                        <Link to={`/player/${index}`}>
                            <button onClick={() => playSong(index)}>{track.split('/').pop().split('.')[0]}</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Songs;