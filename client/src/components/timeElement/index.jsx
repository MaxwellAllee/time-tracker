import React from 'react';
import { useState } from 'react';
import './time.css'
import Clock from '../Clock'
import Date from  '../../contexts/DateContext'
import { useContext } from 'react';
const TimerElement = (props) => {
    const [pause, setPause] = useState(false)

    const handlePause = () => {
        setPause(prevState => prevState === false ? true : false)
    }
    const dateChanger = useContext(Date)
    console.log(dateChanger)
    // allow user to pause on activity change
    // useEffect(
    //     () => {

    //         setPause(false)
    //     }, [props.minutes]
    // )
    return (
        <>
            <div id="clockRender">
                <Clock pause={pause} minutes={props.minutes} change={props.change}/>
            </div>
            <div className="buttonSection ">
                <button className="btn btn-secondary">
                    <i className="fa fa-step-backward"></i>
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => props.switch(-1)}
                >
                    <i className="fa fa-backward"></i>
                </button>
                <button className="btn btn-secondary" onClick={handlePause}>
                    {pause ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>}
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => props.switch(1)}
                >
                    <i className="fa fa-forward"></i>
                </button>
                <button className="btn btn-secondary">
                    <i className="fa fa-step-forward"></i>
                </button>
            </div>
            <div className="buttonSection">
                 <a href={props.link} target="_blank" rel="noopener noreferrer" ><button className="btn btn-danger">Lesson Plan</button></a> 
            </div>
        </>
    )
}
export default TimerElement;