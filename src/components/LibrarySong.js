import React from "react";
import {playAudio} from "../utility";

const LibrarySong = ({song, songs, setCurrentSong, audioRef, isPlaying, setSongs}) => {

    // Event handler
    const songSelectHandler = () => {
        // const selectedSong = songs.find((state) => state.id === song.id);
        console.log(song)
        setCurrentSong(song)

        // Adding active state
        const songId = song.id;
        const newSongs = songs.map((song) => {
            if(song.id === songId){
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
        playAudio(isPlaying, audioRef);
    }

    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? `selected` : ""}`}>
            <img src={song.cover}  alt="cover-art"/>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;