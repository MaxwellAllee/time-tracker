import React, { useContext, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import dContext from '../../contexts/DateContext'
const DatePicker = () => {
    const loop = (count, func) => {
        const list = []
        for (let i = 0; i < count; i++) {
            list.push(<Dropdown.Item key={i} onClick={() => func(i + 1)} className="text-center">{i + 1}</Dropdown.Item>)
        }
        return list
    }
    const dateContext = useContext(dContext)

    return (
        <>
            <li className='nav-item addFlex verticalCenter horzCenter navColor ml-3 topList' style={{ minWidth: "210px" }}>
                      <span className="setWidth">
                Week:
                          </span> 
            <Dropdown className="ml-3" style={{ flex: 1 }} >
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ minWidth: "150px", width: "90%" }}  >
                      {dateContext.week}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="bg-secondary text-light" style={{ width: "100vw" }}>
                        {loop(12, dateContext.setWeek)}
                    </Dropdown.Menu>
                </Dropdown>
            </li>
            <li className='nav-item addFlex verticalCenter horzCenter navColor ml-3 py-2' style={{ minWidth: "210px" }}>
                    <span className="setWidth">
                Day:
                        </span>
            <Dropdown className="ml-3" style={{ flex: 1 }}>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ minWidth: "150px", width: "90%"  }}>
                        {dateContext.day}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="bg-secondary text-light">
                        {loop(5, dateContext.setDate)}
                    </Dropdown.Menu>
                </Dropdown>
            </li>
        </>
    )
}

export default DatePicker;