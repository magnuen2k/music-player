import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus}) => {
    return(
        <div className={`library ${libraryStatus ? `active-library` : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(s => <LibrarySong songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} song={s} key={s.id} isPlaying={isPlaying} audioRef={audioRef}/>)}
            </div>
        </div>
    )
}

export default Library;