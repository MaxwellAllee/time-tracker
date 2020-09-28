import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Clock from '../Clock'
const TimerElement = (props) => {
    const [pause, setPause] = useState(false)
    const handlePause = () => {
        setPause(prevState => prevState === false ? true : false)
        console.log('bob')
    }
    useEffect(
        () => {
            setPause(false)
        }, [props.minutes]
    )
    return (
        <>
            <Clock pause={pause} minutes={props.minutes} />
            <button className="btn btn-secondary">
                <i class="fa fa-step-backward"></i>
            </button>
            <button 
            className="btn btn-secondary"
                onClick={()=>props.switch(-1)}
            >
                <i class="fa fa-backward"></i>
            </button>
            <button className="btn btn-secondary" onClick={handlePause}>
                {pause ? <i class="fa fa-pause"></i> : <i class="fa fa-play"></i>}
            </button>
            <button 
            className="btn btn-secondary"
                onClick={()=>props.switch(1)}
            >
                <i class="fa fa-forward"></i>
            </button>
            <button className="btn btn-secondary">
                <i class="fa fa-step-forward"></i>
            </button>
        </>
    )
}
export default TimerElement;