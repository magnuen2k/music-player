import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";
//import {playAudio} from "../utility";

const Player = ({setSongs, currentSong, setCurrentSong, isPlaying, setIsPlaying, audioRef, songs}) => {

    // State
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
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

        const roundedCurrent = Math.round(current);
        const roundedDuration = Math.round(duration);
        const animation = Math.round((roundedCurrent / roundedDuration) * 100);
        console.log(animation);

        setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animation,})
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

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === "skip-forward") {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length])
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
        }
        if (direction === "skip-back") {
            if ((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length-1])
                activeLibraryHandler(songs[songs.length-1])
                if(isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length])
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length])
        }
        if(isPlaying) audioRef.current.play();
    }

    const songEndHandler = async () => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        await setCurrentSong(songs[(currentIndex + 1) % songs.length])
        if(isPlaying) audioRef.current.play();
    }

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if(song.id === nextPrev.id){
                return{
                    ...song,
                    active: true,
                }
            } else {
                return {
                    ...song,
                    active: false,
                }
            }
        })
        setSongs(newSongs);
    }

    // Add styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    }

    const sliderColor = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={sliderColor} className="track">
                    <input min={0} max={songInfo.duration || 0} onChange={dragHandler} value={songInfo.currentTime} type="range"/>
                    <div style={trackAnim} className="animate-track"/>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration - songInfo.currentTime) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler("skip-back")} className="skip-backwards" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon className="play" onClick={playSongHandler} size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={() => skipTrackHandler("skip-forward")} className="skip-forward" size="2x" icon={faAngleRight} />
            </div>
            <audio onEnded={songEndHandler} onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}/>
        </div>
    )
} 

export default Player;