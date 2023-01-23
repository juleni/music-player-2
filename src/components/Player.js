import React, { useEffect, useRef, useState } from "react";
import "./Player.css";
import PlayerControls from "./PlayerControls";
import PlayerDetails from "./PlayerDetails";

export default function Player(props) {
  const REPEAT_SONG = 0;
  const FORWARD_SONG = 1;
  const BACKWARD_SONG = 2;
  const RANDOM_SONG = 3;

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  });

  const SetSong = (forwards = FORWARD_SONG) => {
    switch (forwards) {
      case REPEAT_SONG:
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        break;
      case FORWARD_SONG:
        props.setCurrentSongIndex(() => {
          let temp = props.currentSongIndex;
          temp++;
          if (temp > props.songs.length - 1) {
            temp = 0;
          }
          return temp;
        });
        break;
      case BACKWARD_SONG:
        props.setCurrentSongIndex(() => {
          let temp = props.currentSongIndex;
          temp--;
          if (temp < 0) {
            temp = props.songs.length - 1;
          }
          return temp;
        });
        break;
      case RANDOM_SONG:
        const randomIndex = Math.floor(Math.random() * props.songs.length);
        props.setCurrentSongIndex(() => {
          let temp = props.currentSongIndex;
          if (temp === randomIndex) {
            if (temp === 0) {
              temp = props.songs.length - 1;
            } else if (temp === props.songs.length - 1) {
              temp = 0;
            } else {
              temp = randomIndex + 1;
            }
          } else temp = randomIndex;
          return temp;
        });
        break;

      default:
        return 0;
    }
  };

  return (
    <div className="c-player">
      <audio
        src={props.songs[props.currentSongIndex].audio_src}
        ref={audioRef}
      ></audio>
      <h4>ᔕIᗰᑭᒪE ᗰᑌᔕIᑕ ᑭᒪᗩYEᖇ</h4>
      <PlayerDetails song={props.songs[props.currentSongIndex]} />
      <PlayerControls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        SetSong={SetSong}
      />
      <p>
        <strong>Next up:</strong> {props.songs[props.nextSongIndex].title} by{" "}
        {props.songs[props.nextSongIndex].artist}
      </p>
    </div>
  );
}
