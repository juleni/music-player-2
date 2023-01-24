import { faBars, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import "./Player.css";
import PlayerControls from "./PlayerControls";
import PlayerDetails from "./PlayerDetails";

export default function Player(props) {
  const REPEAT_SONG = 0;
  const BACKWARD_SONG = 1;
  const FORWARD_SONG = 2;
  const RANDOM_SONG = 3;

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

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
        if (isPlaying) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
        break;
      case BACKWARD_SONG:
        setShowMessage(true);
        props.setCurrentSongIndex(() => {
          let temp = props.currentSongIndex;
          temp--;
          if (temp < 0) {
            temp = props.songs.length - 1;
          }
          console.log("SETSONG BACK ... showMessage = " + showMessage);
          return temp;
        });
        break;
      case FORWARD_SONG:
        setShowMessage(true);
        props.setCurrentSongIndex(() => {
          let temp = props.currentSongIndex;
          temp++;
          if (temp > props.songs.length - 1) {
            temp = 0;
          }
          return temp;
        });
        console.log("SETSONG FORW ... showMessage = " + showMessage);
        break;
      case RANDOM_SONG:
        const randomIndex = Math.floor(Math.random() * props.songs.length);
        setShowMessage(true);
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
          console.log("SETSONG RAND ... showMessage = " + showMessage);
          return temp;
        });
        break;

      default:
        return 0;
    }
  };

  function handleLoadedData() {
    setShowMessage(false);
  }

  function toggleShowInfo() {
    setShowInfo(!showInfo);
  }

  return (
    <div className="c-player">
      <audio
        src={props.songs[props.currentSongIndex].audio_src}
        ref={audioRef}
        onLoadedData={handleLoadedData}
      ></audio>
      <div className="top-bar">
        <span className="info" onClick={toggleShowInfo}>
          <FontAwesomeIcon icon={faInfo} />
        </span>
        <span>
          <h4>ᔕIᗰᑭᒪE ᗰᑌᔕIᑕ ᑭᒪᗩYEᖇ</h4>
        </span>
        <span className="menu">
          <FontAwesomeIcon icon={faBars} />
        </span>
      </div>
      {showInfo && (
        <div className="loading-wrapper" onClick={toggleShowInfo}>
          <div className="message">
            <p>Simple Music Player v0.1</p>
            <p className="info-text">
              Music from{" "}
              <a href="https://www.allesgemafrei.de/en/" target="_blank">
                AllesGemaFrei
              </a>
            </p>
            <p className="author-text">
              2023, Created by{" "}
              <a href="https://github.com/juleni" target="_blank">
                JULENI
              </a>
            </p>
          </div>
        </div>
      )}

      <PlayerDetails song={props.songs[props.currentSongIndex]} />
      {showMessage && (
        <div className="loading-wrapper">
          <div className="message">Loading song ...</div>
        </div>
      )}

      <PlayerControls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        SetSong={SetSong}
      />
      <p>
        <strong>Next up:</strong> {props.songs[props.nextSongIndex].title}
      </p>
    </div>
  );
}
