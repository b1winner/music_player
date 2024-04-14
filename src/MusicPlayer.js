import React, {useEffect} from 'react';
import { Howl } from 'howler';
import { useContext } from 'react';
import { PlayerContext } from './components/PlayerContext';


const MusicPlayer = ({ tracks }) => {
    const { currentTrackIndex, setCurrentTrackIndex, isPlaying, setIsPlaying, sound, setSound, currentTrackName, setCurrentTrackName, progress, setProgress, currentTime, setCurrentTime, totalTime, setTotalTime } = useContext(PlayerContext);
    let progressInterval;
    useEffect(() => {
        if (sound) {
            sound.unload();
            setIsPlaying(false);
        }
        const newSound = new Howl({
            src: [tracks[currentTrackIndex]],
            onend: () => {
                //clearInterval(progressInterval)
                next();

            },
            onload: () => {
                setTotalTime(newSound.duration());
            }
        });
        setSound(newSound);
        setCurrentTrackName(tracks[currentTrackIndex].split('/').pop().split('.')[0]);
    }, [currentTrackIndex]);

    useEffect(() => {
        if (isPlaying) {
            play();
        } else {
            pause();
        }
    }, [isPlaying]);

    const play = () => {
        if (sound) {
            sound.play();
            setIsPlaying(true);

        }
        progressInterval = setInterval(() => {
            if (sound.playing()) {
                setProgress((sound.seek() / sound.duration()) * 100);
                setCurrentTime(sound.seek());
                console.log(sound.seek());
            }
        }, 500);
    };

    const pause = () => {
        if (sound) {
            sound.stop();
            setIsPlaying(false);
            clearInterval(progressInterval);
        }
        clearInterval(progressInterval)
    };

    const next = () => {
        if (sound) {
            sound.stop();
            setIsPlaying(false);
            setSound(null);
        }
        setCurrentTrackIndex((currentTrackIndex + 1) % tracks.length);
        clearInterval(progressInterval);
    };

    const prev = () => {
        if (sound) {
            sound.stop();
            setIsPlaying(false);
            setSound(null);
        }
        setCurrentTrackIndex((currentTrackIndex - 1 + tracks.length) % tracks.length);
        clearInterval(progressInterval);
    };

    const formatTime = (seconds) => {
        let minutes = Math.floor(seconds / 60);
        let secondsLeft = Math.floor(seconds - minutes * 60);

        let time = minutes < 10 ? '0' + minutes : minutes;
        time += ':';
        time += secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
        return time;
    };

    return (
        <div>
            <h2>Now Playing: {currentTrackName}</h2>
            <div style={{width: '100%', height: '20px', backgroundColor: '#ddd'}}>
                <div style={{width: `${progress}%`, height: '100%', backgroundColor: 'blue'}}></div>
            </div>
            <div>{formatTime(currentTime)} / {formatTime(totalTime)}</div>
            <button className="waves-effect waves-light btn" onClick={prev}>Prev</button>
            {isPlaying ? (
                <button className="btn-floating btn-large waves-effect waves-light red" onClick={pause}>Stop</button>
            ) : (
                <button className="btn-floating btn-large waves-effect waves-light red" onClick={play}>Play</button>
            )}
            <button className="waves-effect waves-light btn" onClick={next}>Next</button>
        </div>
    );
};

export default MusicPlayer;