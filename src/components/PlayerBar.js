import React, { useEffect, useRef } from "react";
import "./PlayerBar.css";

export default function PlayerBar(props) {
  const progressDetailsRef = useRef();

  // Format time format to min:sec (seconds as 2 digits long)
  function formatMusicTime(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    let outputTime = minutes + ":";
    if (seconds < 10) outputTime += "0";
    outputTime += seconds;
    return outputTime;
  }

  function handleProgressDetailsClick(e) {
    e.preventDefault();
    // Get width of progress bar
    let progressTotalWidth = progressDetailsRef.current.clientWidth;
    // Get actual clicked offset X of progress bar
    let clickedOffsetX = e.nativeEvent.offsetX;
    // Get total music duration
    let musicDuration = props.songDuration;

    // Set current music position
    let currentTime = (clickedOffsetX / progressTotalWidth) * musicDuration;
    progressDetailsRef.currentTime =
      (clickedOffsetX / progressTotalWidth) * musicDuration;
    props.setSongCurrentTime(currentTime);
    let barWidth = (currentTime / props.songDuration) * 100;
    props.setBarWidth(barWidth + "%");
    props.progressBarRef.current.style.width = barWidth;
    props.audioRef.current.currentTime = currentTime;
  }

  // Update progress bar when song time is changed
  useEffect(() => {
    props.progressBarRef.current.style.width = props.barWidth;
  }, [props.songCurrentTime]);

  return (
    <div className="c-player--bar ">
      <div
        className="progress-details"
        ref={progressDetailsRef}
        alt="Go to position"
        title="Set position"
        onClick={handleProgressDetailsClick}
      >
        <div className="progress-bar" ref={props.progressBarRef}>
          <span title="Current position"></span>
        </div>
        <div className="time">
          <span className="current">
            {formatMusicTime(props.songCurrentTime)}
          </span>
          <span className="final">{formatMusicTime(props.songDuration)}</span>
        </div>
      </div>{" "}
    </div>
  );
}
