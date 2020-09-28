import React from 'react'
import Convert from '../../lib/Convert'
const TimeTable = (props) => {
    

    return (
        <>
            <tbody>
                {
                    props.calendar.map(activity => (
                        <tr key={activity.Number} 
                        className={props.selected+1 === parseInt(activity.Number) ?"bg-danger":""} 
                        onClick={() => props.click(parseInt(activity.Number - 1), Convert.timeConvert(activity.Minutes))}>
                            <th scope="row" >{activity.Number}</th>
                            <td>{activity.Time}</td>
                            <td>{activity.Activity}</td>
                            <td>{Convert.timeConvert(activity.Minutes)}</td>
                        </tr>
                    ))
                }
            </tbody>
        </>
    )
}

export default TimeTable;