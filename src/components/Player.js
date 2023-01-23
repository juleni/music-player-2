import React, { useEffect, useRef, useState } from "react";
import "./Player.css";
import PlayerControls from "./PlayerControls";
import PlayerDetails from "./PlayerDetails";

export default function Player(props) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  });

  const SkipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;
        if (temp > props.songs.length - 1) {
          temp = 0;
        }
        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;
        if (temp < 0) {
          temp = props.songs.length - 1;
        }
        return temp;
      });
    }
  };
  return (
    <div className="c-player">
      <audio
        src={props.songs[props.currentSongIndex].audio_src}
        ref={audioRef}
      ></audio>
      <h4>Playing now</h4>
      <PlayerDetails song={props.songs[props.currentSongIndex]} />
      <PlayerControls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        SkipSong={SkipSong}
      />
      <p>
        <strong>Next up:</strong> {props.songs[props.nextSongIndex].title} by{" "}
        {props.songs[props.nextSongIndex].artist}
      </p>
    </div>
  );
}
