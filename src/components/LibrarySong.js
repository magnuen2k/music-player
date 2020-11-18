import React from "react";


const LibrarySong = ({song, songs, setCurrentSong}) => {

    // Event handler
    const songSelectHandler = () => {
        // const selectedSong = songs.find((state) => state.id === song.id);
        console.log(song)
        setCurrentSong(song)
    }

    return (
        <div onClick={songSelectHandler} className="library-song">
            <img src={song.cover}  alt="cover-art"/>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;