import { useEffect, useState } from "react";
import "./App.css";
import Player from "./components/Player";
import {PLAYLIST} from "./components/PlayList";

function App() {
  const [songs] = useState(PLAYLIST);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else return currentSongIndex + 1;
    });
  }, [currentSongIndex]);

  return (
    <div className="App">
      <Player
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        songs={songs}
      ></Player>
    </div>
  );
}

export default App;
