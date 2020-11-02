import React, { useContext, useEffect, useState } from "react";
import dContext from "../../contexts/DateContext";
import AuthContext from "../../contexts/AuthContext";
import API from "../../lib/API";
import TimeTable from "../../components/TimeTable";
import TimeElement from "../../components/timeElement";
import convert from "../../lib/Convert";
import ErrorModal from "../../components/ErrorModal";

import "./tracker.css";

const Tracker = () => {
  const Auth = useContext(AuthContext);
  const dateContext = useContext(dContext);
  const [calendarArray, setCalendarArray] = useState([]);
  // const [selectedActivity, setSelectedActivity] = useState(0);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [time, setTime] = useState("");
  const [link, setLink] = useState("")
  const [changeCount, setChangeCount]= useState(0) 
  useEffect(() => {
    if (dateContext.day && dateContext.week) {
      API.Calendar.getCalendar(
        Auth.authToken,
        dateContext.week,
        dateContext.day
      ).then((calArray) => {
        if (calArray.data !== "no calendar") {
          setCalendarArray(calArray.data.sheet);
          setLink(calArray.data.url);
        } else {
          setError(
            "There is no time table for this day. This usually means you are in project week. Put on your thinking cap this is going to be a fun day!"
          );
          setShowError(true);
        }
      });
    }
  }, [dateContext.day, dateContext.week, Auth.authToken]);
  const handleActivityChange = (num) => {
    const selectedActivity = dateContext.activity
    if (
      (selectedActivity !== 0 && num === -1) ||
      (selectedActivity !== calendarArray.length - 1 && num === 1)
    ) {
      setChangeCount(prev=>prev+1)
      setTime(
        convert.timeConvert(calendarArray[selectedActivity + num].Minutes)
      );
      dateContext.setActivity(dateContext.activity + num);
    }
  };
  useEffect(() => {
    console.log("pop", calendarArray.length);
    if (calendarArray.length) {
      setTime(convert.timeConvert(calendarArray[0].Minutes));
    }
  }, [calendarArray]);
  const handleActivityClick = (num, mins) => {
    dateContext.setActivity(num);
    setTime(mins);
  };

  return (
    <>

      {time ? (
        <TimeElement minutes={time} switch={handleActivityChange} link={link} change={changeCount} />
      ) : (
        "Please select a day"
      )}
      {calendarArray.length ? (
        <table className="table table-bordered table-dark m-0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Time</th>
              <th scope="col">Activity</th>
              <th scope="col">Minutes</th>
            </tr>
          </thead>
          <TimeTable
            calendar={calendarArray}
            click={handleActivityClick}
            selected={dateContext.activity}
          />
        </table>
      ) : (
        <></>
      )}
      <ErrorModal show={showError} hide={setShowError} text={error} />
    </>
  );
};

export default Tracker;
