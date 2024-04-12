import React, { useEffect, useState } from 'react';
import { Howl, Howler } from 'howler';

const MusicPlayer = ({ tracks }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTrackName, setCurrentTrackName] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    let progressInterval;

    useEffect(() => {
        if (isPlaying) {
            play();
        }
    }, [currentTrackIndex]);

    const debounce = (func, delay) => {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        }
    }

   const play = () => {
    if (!sound) {
        const newSound = new Howl({
            src: [tracks[currentTrackIndex]],
            onend: () => {
                next();
            },
            onload: () => {
                setTotalTime(newSound.duration());
            }
        });

        setSound(newSound);
        newSound.play();
        setIsPlaying(true);
        setCurrentTrackName(tracks[currentTrackIndex].split('/').pop().split('.')[0]);

        progressInterval = setInterval(debounce(() => {
            setProgress((newSound.seek() / newSound.duration()) * 100);
            setCurrentTime(newSound.seek());
        }, 500), 2000);
    } else {
        sound.play();
        setIsPlaying(true);

        progressInterval = setInterval(debounce(() => {
            setProgress((sound.seek() / sound.duration()) * 100);
            setCurrentTime(sound.seek());
        }, 500), 2000);
    }
};

    const pause = () => {
        if (sound) {
            sound.pause();
        }
        setIsPlaying(false);
        clearInterval(progressInterval);
    };

    const next = () => {
        if (sound) {
            sound.stop();
            setSound(null);
        }
        setCurrentTrackIndex((currentTrackIndex + 1) % tracks.length);
        clearInterval(progressInterval);
    };

    const prev = () => {
        if (sound) {
            sound.stop();
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
            <button onClick={prev}>Prev</button>
            {isPlaying ? (
                <button onClick={pause}>Pause</button>
            ) : (
                <button onClick={play}>Play</button>
            )}
            <button onClick={next}>Next</button>
        </div>
    );
};

export default MusicPlayer;