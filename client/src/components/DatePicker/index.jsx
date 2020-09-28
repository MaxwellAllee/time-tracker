import React, { useContext, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import dContext from '../../contexts/DateContext'
const DatePicker = () => {
    const [week, setWeek] = useState("Week Number")
    const [day, setDay] = useState("Day Number")
    const loop = (count, func) => {
        const list = []
        for (let i = 0; i < count; i++) {
            list.push(<Dropdown.Item key={i} onClick={() => func(i + 1)} className="text-center">{i + 1}</Dropdown.Item>)
        }
        return list
    }
    const dateContext = useContext(dContext)
    const handleSubmit =()=>{
        dateContext.setDate(day)
        dateContext.setWeek(week)
    }
    return (
        <>
            <li className='nav-item addFlex verticalCenter horzCenter navColor ml-3 topList' style={{ minWidth: "210px" }}>
                      <span className="setWidth">
                Week:
                          </span> 
            <Dropdown className="ml-3" style={{ flex: 1 }} >
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ minWidth: "150px", width: "90%" }}  >
                      {week}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="bg-secondary text-light" style={{ width: "100vw" }}>
                        {loop(12, setWeek)}
                    </Dropdown.Menu>
                </Dropdown>
            </li>
            <li className='nav-item addFlex verticalCenter horzCenter navColor ml-3 py-2' style={{ minWidth: "210px" }}>
                    <span className="setWidth">
                Day:
                        </span>
            <Dropdown className="ml-3" style={{ flex: 1 }}>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ minWidth: "150px", width: "90%"  }}>
                        {day}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="bg-secondary text-light">
                        {loop(5, setDay)}
                    </Dropdown.Menu>
                </Dropdown>
            </li>
            <li className='nav-item addFlex verticalCenter horzCenter navColor ml-3 py-2'>
                <button className="btn btn-danger" onClick={handleSubmit}>submit</button>
            </li>
        </>
    )
}

export default DatePicker;