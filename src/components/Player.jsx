import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong, isPlaying, setIsPlaying, audioRef}) => {

    // State
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    })


    // Event handlers
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo, currentTime: current, duration})
    }

    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        const newTime = e.target.value;
        audioRef.current.currentTime = newTime;
        setSongInfo({
            ...songInfo,
            currentTime: newTime,
        })
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration || 0} onChange={dragHandler} value={songInfo.currentTime} type="range"/>
                <p>{getTime(songInfo.duration - songInfo.currentTime)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-backwards" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon className="play" onClick={playSongHandler} size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
            </div>
            <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}/>
        </div>
    )
} 

export default Player;