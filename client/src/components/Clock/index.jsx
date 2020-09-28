import React, { useEffect, useState } from 'react';

const Clock = (props) => {

    const [seconds, setSeconds] = useState(0);
    useEffect(()=>{
        setSeconds(props.minutes*60)
    },[props.minutes])
    useEffect(() => {
        let timer = null
        if (props.pause) {
            timer = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1)

            }, 1000)
        } 
        return () => {
            clearTimeout(timer);
          }
    }, [props.pause])
    const timeConvert = (secs) => {
        let negative = ""
        if (secs < 0) negative = "-";
        secs = Math.abs(secs)
        const hours = Math.floor(secs / 3600);
        let minutes = Math.floor(secs % 3600 / 60);
        minutes = minutes > 9 ? minutes : "0" + minutes;
        let secz = Math.floor(secs % 3600 % 60);
        secz = secz > 9 ? secz : "0" + secz;
        return `${negative}${hours}:${minutes}:${secz}`;
    }
    return (
        <>
            {timeConvert(seconds)}
        </>
    )
}

export default Clock;