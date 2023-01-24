import { faBars, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import {
  BACKWARD_SONG,
  FORWARD_SONG,
  RANDOM_SONG,
  REPEAT_SONG,
} from "../utils/constants";
import "./Player.css";
import PlayerBar from "./PlayerBar";
import PlayerControls from "./PlayerControls";
import PlayerDetails from "./PlayerDetails";

export default function Player(props) {
  const progressBarRef = useRef(null);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [songDuration, setSongDuration] = useState(0);
  const [songCurrentTime, setSongCurrentTime] = useState(0);
  const [barWidth, setBarWidth] = useState("0%");
  const [isRandomSong, setIsRandomSong] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  });

  /**
   * Set cuttent song index based on control button pressed
   * @param {REPEAT_SONG, BACKWARD_SONG, FORWARD_SONG, RANDOM_SONG} forwards
   * @returns
   */
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
        break;
      case RANDOM_SONG:
        if (isRandomSong) {
          // process random song only in case when "shuffle button"
          // is not highlighted as random
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
            console.log("generated RandomSong = " + temp);
            return temp;
          });
        }
        break;

      default:
        return 0;
    }
  };

  /**
   * Handler function for loaded song
   */
  function handleLoadedData() {
    let musicDuration = audioRef.current.duration;
    setSongDuration(musicDuration);
    // console.log(audioRef);
    //progressBarRef.current.style.width = "0%";
    setShowMessage(false);
  }

  function toggleShowInfo() {
    setShowInfo(!showInfo);
  }

  /**
   * Handler function for song time update
   */
  function handleTimeUpdate() {
    const currentTime = audioRef.current.currentTime;
    let barWidth = (currentTime / songDuration) * 100;
    setBarWidth(barWidth + "%");
    setSongCurrentTime(currentTime);
  }

  /**
   * Handler function for End of the song
   */
  function handleEnded() {
    if (isRandomSong) {
      SetSong(RANDOM_SONG);
    } else SetSong();
  }

  return (
    <div className="c-player">
      <audio
        src={props.songs[props.currentSongIndex].audio_src}
        ref={audioRef}
        onLoadedData={handleLoadedData}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
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

      <PlayerBar
        songDuration={songDuration}
        songCurrentTime={songCurrentTime}
        song={props.songs[props.currentSongIndex]}
        setSongCurrentTime={setSongCurrentTime}
        audioRef={audioRef}
        barWidth={barWidth}
        progressBarRef={progressBarRef}
        setBarWidth={setBarWidth}
      />

      <PlayerControls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        SetSong={SetSong}
        isRandomSong={isRandomSong}
        setIsRandomSong={setIsRandomSong}
      />
      <p>
        <strong>Next up:</strong>{" "}
        {isRandomSong ? "Random song" : props.songs[props.nextSongIndex].title}
      </p>
    </div>
  );
}
