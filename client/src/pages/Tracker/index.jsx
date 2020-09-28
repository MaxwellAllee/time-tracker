import React, { useContext, useEffect, useState } from 'react';
import dContext from '../../contexts/DateContext'
import AuthContext from '../../contexts/AuthContext'
import API from '../../lib/API'
import TimeTable from '../../components/TimeTable'
import TimeElement from '../../components/timeElement'
import './tracker.css'
const Tracker = () => {
    const Auth = useContext(AuthContext)
    const dateContext = useContext(dContext)
    const [calendarArray, setCalendarArray] = useState([])
    const [selectedActivity, setSelectedActivity] = useState(0)
    const [time, setTime] = useState("")
    useEffect(() => {
        if (dateContext.day && dateContext.week) {
            API.Calendar.getCalendar(Auth.authToken, dateContext.week, dateContext.day)
                .then(calArray => {
                    if (calArray.data !== "no calendar") {

                        setCalendarArray(calArray.data)
                    }
                })
        }
    }, [dateContext.day, dateContext.week, Auth.authToken])
    const handleActivityClick = (num, mins) => {
        console.log(num)
        setSelectedActivity(num)
        setTime(mins)
    }
    const handleActivitChange = (num) => {
        console.log(num)
        
    }
    return (
        <>
            {time ? <TimeElement
                minutes={time}
                switch={handleActivityClick}
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
        </>
    )
};

export default Tracker; 