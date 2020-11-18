import React, {useRef, useState} from "react";
// Import styles
import "./styles/app.scss";
// Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
// Import data
import data from "./data";


function App() {
    // Ref
    const audioRef = useRef(null);

    // State
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [libraryStatus, setLibraryStatus] = useState(false);

    return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
        <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
        <Song currentSong={currentSong}/>
        <Player setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} audioRef={audioRef} setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong}/>
        <Library libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} setCurrentSong={setCurrentSong} songs={songs}/>
    </div>
    );
}

export default App;
