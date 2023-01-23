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
import "./PlayerControls.css";

export default function PlayerControls(props) {
  return (
    <div className="c-player--controls">
      <button className="control-btn" onClick={() => props.SetSong(0)}>
        <FontAwesomeIcon icon={faRepeat} />
        <span class="tooltiptext">Repeat</span>
      </button>
      <button className="control-btn" onClick={() => props.SetSong(1)}>
        <FontAwesomeIcon icon={faBackwardStep} />
        <span class="tooltiptext">Previous</span>
      </button>
      <button
        className="play-btn"
        onClick={() => props.setIsPlaying(!props.isPlaying)}
      >
        <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} />
      </button>
      <button className="control-btn" onClick={() => props.SetSong(2)}>
        <FontAwesomeIcon icon={faForwardStep} />
        <span class="tooltiptext">Next</span>
      </button>
      <button className="control-btn" onClick={() => props.SetSong(3)}>
        <FontAwesomeIcon icon={faShuffle} />
        <span class="tooltiptext">Shuffle</span>
      </button>
    </div>
  );
}
