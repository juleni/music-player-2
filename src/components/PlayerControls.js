import {
  faBackward,
  faForward,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./PlayerControls.css";

export default function PlayerControls() {
  return (
    <div className="c-player--controls">
      <button className="skip-btn">
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button className="play-btn">
        <FontAwesomeIcon icon={faPlay} />
      </button>
      <button className="skip-btn">
        <FontAwesomeIcon icon={faForward} />
      </button>
    </div>
  );
}
