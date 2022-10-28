import React, { useRef } from "react";
import "./player.scss";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipStartCircleFill,
  BsFillSkipEndCircleFill,
} from "react-icons/bs";

const Player = ({
  audioElem,
  isplaying,
  setisplaying,
  currentSong,
  setCurrentSong,
  songs,
}) => {
  const clickRef = useRef();

  const PlayPause = () => {
    setisplaying(!isplaying);
  };

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = (offset / width) * 100;
    audioElem.current.currentTime = (divprogress / 100) * currentSong.length;
  };

  const skipBack = () => {
    const index = songs.findIndex((x) => x.title === currentSong.title);
    if (index === 0) {
      setCurrentSong(songs[songs.length - 1]);
      setisplaying((isplaying = false));
    } else {
      setCurrentSong(songs[index - 1]);
      setisplaying((isplaying = false));
    }
    audioElem.current.currentTime = 0;
  };

  const skiptoNext = () => {
    const index = songs.findIndex((x) => x.title === currentSong.title);

    if (index === songs.length - 1) {
      setCurrentSong(songs[0]);
      setisplaying((isplaying = false));
    } else {
      setCurrentSong(songs[index + 1]);
      setisplaying((isplaying = false));
    }
    audioElem.current.currentTime = 0;
  };

  return (
    <div className="player_container shadow w-75 bg-secondary rounded-5">
      <div className="title">
        <p className="bold bg-dark rounded-3 p-3 text-light shadow-sm">
          {currentSong.title}
        </p>
      </div>
      <div className="navigation">
        <div
          className="navigation_wrapper bg-light"
          onClick={checkWidth}
          ref={clickRef}
        >
          <div
            className="seek_bar bg-warning"
            style={{ width: `${currentSong.progress + "%"}` }}
          ></div>
          <div className="mt-1"></div>
        </div>
      </div>
      <div className="controls">
        <BsFillSkipStartCircleFill className="btn_action" onClick={skipBack} />
        {isplaying ? (
          <BsFillPauseCircleFill
            className="btn_action pp"
            onClick={PlayPause}
          />
        ) : (
          <BsFillPlayCircleFill className="btn_action pp" onClick={PlayPause} />
        )}
        <BsFillSkipEndCircleFill className="btn_action" onClick={skiptoNext} />
      </div>
    </div>
  );
};

export default Player;
