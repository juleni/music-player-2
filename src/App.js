import { useState } from "react";
import "./App.css";
import Player from "./components/Player";

function App() {
  const [songs, setSongs] = useState([
    {
      title: "Yesterday",
      artist: "The Beatles",
      img_src: "./assets/yesterday.jpg",
      audio_src: "./assets/yesterday.mp3",
    },
    {
      title: "I'm A Loser",
      artist: "The Beatles",
      img_src: "/assets/beatles-for-sale.jpg",
      audio_src: "/assets/im-a-loser.mp3",
    },
    {
      title: "About A Girl",
      artist: "Nirvana",
      img_src: "/assets/nirvana-unplugged.jpg",
      audio_src: "/assets/about-a-girl.mp3",
    },
    {
      title: "No Reply",
      artist: "The Beatles",
      img_src: "/assets/beatles-for-sale.jpg",
      audio_src: "/assets/no-reply.mp3",
    },
    {
      title: "Rat In The River",
      artist: "SoundHelix",
      img_src: "/assets/soundhelix.jpg",
      audio_src:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);
  return (
    <div className="App">
      <Player
        song={songs[currentSongIndex]}
        nextSong={songs[nextSongIndex]}
      ></Player>
    </div>
  );
}

export default App;
