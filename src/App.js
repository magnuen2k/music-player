import React, {useState} from "react";
// Import styles
import "./styles/app.scss";
// Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
// Import data
import data from "./util";


function App() {
    // State
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
    <div className="App">
        <Song currentSong={currentSong}/>
        <Player setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong}/>
        <Library setCurrentSong={setCurrentSong} songs={songs}/>
    </div>
    );
}

export default App;
