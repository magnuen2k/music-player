import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({songs, setCurrentSong}) => {
    return(
        <div className="library">
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(s => <LibrarySong songs={songs} setCurrentSong={setCurrentSong} song={s} key={s.id}/>)}
            </div>
        </div>
    )
}

export default Library;