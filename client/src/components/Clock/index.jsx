import React, { useEffect, useState } from "react";
import Sound from "react-sound";

const Clock = (props) => {
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState("STOPPED");
  useEffect(() => {
    console.log(props.minutes);
    if (props.minutes === "End") {
      setSeconds(0);
    } else {
      setSeconds(props.minutes * 60);
    }
  }, [props.minutes]);
  useEffect(() => {
    let timer = null;
    if (props.pause) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => {
            if(prevSeconds-1 === 0 )setIsPlaying('PLAYING');
           return prevSeconds - 1
        });
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [props.pause]);
  const timeConvert = (secs) => {
    let negative = "";
    if (secs < 0) negative = "-";
    secs = Math.abs(secs);
    const hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs % 3600) / 60);
    minutes = minutes > 9 ? minutes : "0" + minutes;
    let secz = Math.floor((secs % 3600) % 60);
    secz = secz > 9 ? secz : "0" + secz;
    return `${negative}${hours}:${minutes}:${secz}`;
  };
  const playSound = async () => {
    if (isPlaying === "STOPPED") {
      setIsPlaying("PLAYING");
    } else {
      setIsPlaying("STOPPED");
    }
  };
  return (
    <>
      <Sound url="/alarm.mp3" playStatus={isPlaying} />
      <div onClick={()=>playSound()} className="bob">{timeConvert(seconds)}</div>
    </>
  );
};

export default Clock;
