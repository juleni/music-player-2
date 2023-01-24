import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
  faRepeat,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  BACKWARD_SONG,
  FORWARD_SONG,
  RANDOM_SONG,
  REPEAT_SONG,
} from "../utils/constants";
import "./PlayerControls.css";

export default function PlayerControls(props) {
  return (
    <div className="c-player--controls">
      <button
        className="control-btn"
        onClick={() => props.SetSong(REPEAT_SONG)}
      >
        <FontAwesomeIcon icon={faRepeat} />
        <span className="tooltiptext">Repeat</span>
      </button>
      <button
        className="control-btn"
        onClick={() => props.SetSong(BACKWARD_SONG)}
      >
        <FontAwesomeIcon icon={faBackwardStep} />
        <span className="tooltiptext">Previous</span>
      </button>
      <button
        className="play-btn"
        onClick={() => props.setIsPlaying(!props.isPlaying)}
      >
        <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} />
      </button>
      <button
        className="control-btn"
        onClick={() => props.SetSong(FORWARD_SONG)}
      >
        <FontAwesomeIcon icon={faForwardStep} />
        <span className="tooltiptext">Next</span>
      </button>
      <button
        className="control-btn"
        onClick={() => props.SetSong(RANDOM_SONG)}
      >
        <FontAwesomeIcon icon={faShuffle} />
        <span className="tooltiptext">Shuffle</span>
      </button>
    </div>
  );
}
