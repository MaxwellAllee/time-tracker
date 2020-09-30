import React, { useContext, useEffect, useState } from 'react';
import dContext from '../../contexts/DateContext'
import AuthContext from '../../contexts/AuthContext'
import API from '../../lib/API'
import TimeTable from '../../components/TimeTable'
import TimeElement from '../../components/timeElement'
import convert from '../../lib/Convert'
import ErrorModal from '../../components/ErrorModal'
import './tracker.css'
const Tracker = () => {
    const Auth = useContext(AuthContext)
    const dateContext = useContext(dContext)
    const [calendarArray, setCalendarArray] = useState([])
    const [selectedActivity, setSelectedActivity] = useState(0)
    const [showError, setShowError]=useState(false)
    const [error, setError] =useState('')
    const [time, setTime] = useState("")
    useEffect(() => {
        if (dateContext.day && dateContext.week) {
            API.Calendar.getCalendar(Auth.authToken, dateContext.week, dateContext.day)
                .then(calArray => {
                    if (calArray.data !== "no calendar") {

                        setCalendarArray(calArray.data)
                    }
                    else {
                        setError("There is no time table for this day. This usually means you are in project week. Put on your thinking cap this is going to be a fun day!")
                        setShowError(true)
                    }
                })
        }
    }, [dateContext.day, dateContext.week, Auth.authToken])
    const handleActivityChange = (num) => {
        if((selectedActivity !== 0 && num === -1)||(selectedActivity !== calendarArray.length-1 && num === 1)){
            setTime(convert.timeConvert(calendarArray[selectedActivity+ num].Minutes))
            setSelectedActivity(curr=> curr+ num)

        }
    }
    useEffect(()=>{
        console.log('pop', calendarArray.length)
        if(calendarArray.length){
            setTime(convert.timeConvert(calendarArray[0].Minutes))
        }
    },[calendarArray])
    const handleActivityClick = (num, mins) => {
        setSelectedActivity(num)
        setTime(mins)
    }
    return (
        <>
            {time ? <TimeElement
                minutes={time}
                switch={handleActivityChange}
            /> : "Please select a day"}
            {calendarArray.length ? (
                <table className="table table-bordered table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Time</th>
                            <th scope="col">Activity</th>
                            <th scope="col">Minutes</th>
                        </tr>
                    </thead>
                    <TimeTable calendar={calendarArray} click={handleActivityClick} selected={selectedActivity} />
                </table>
            ) : (<></>)}
            <ErrorModal show={showError} hide={setShowError} text={error}/> 
        </>
    )
};

export default Tracker; 