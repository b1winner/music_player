import React, { createContext, useState } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);
    const [currentTrackName, setCurrentTrackName] = useState('');
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);

    // Add other state variables and functions here...

    return (
        <PlayerContext.Provider value={{ currentTrackIndex, setCurrentTrackIndex, isPlaying, setIsPlaying, sound, setSound, currentTrackName, setCurrentTrackName, progress, setProgress, currentTime, setCurrentTime, totalTime, setTotalTime }}>
            {children}
        </PlayerContext.Provider>
    );
};