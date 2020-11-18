import React from "react";

const LibrarySong = ({song, songs, setCurrentSong, audioRef, isPlaying, setSongs}) => {

    // Event handler
    const songSelectHandler = async () => {
        // const selectedSong = songs.find((state) => state.id === song.id);
        console.log(song)
        await setCurrentSong(song)

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
        if(isPlaying) audioRef.current.play();
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