import React from "react";
import "./Player.css";
import PlayerControls from "./PlayerControls";
import PlayerDetails from "./PlayerDetails";

export default function Player(props) {
  return (
    <div className="c-player">
      <audio></audio>
      <h4>Playing now</h4>
      <PlayerDetails song={props.song}></PlayerDetails>
      <PlayerControls />
      <p>
        <strong>Next up:</strong> {props.nextSong.title} by{" "}
        {props.nextSong.artist}
      </p>
    </div>
  );
}
