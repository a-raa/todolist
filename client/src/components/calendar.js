
import DatePicker from 'react-calendar';
import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css'
import './../styles/calendar.css';
import styled from 'styled-components'





export default function Calendar() {
    const [value, onChange] = useState(new Date());

    return (
        <div className='wrap'>
            <h2>CALENDAR</h2>
            <SDatePicker
                className="react-calendar"
                onChange={onChange}
                value={value}
            />
        </div>
    )
}


const SDatePicker = styled(DatePicker)`
background: rgba(0,0,0,0);
border:none;
width:80%;

.react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.3;
}
.react-calendar__month-view__days__day--weekend {
    color: #dfdfdf;
}

.react-calendar__tile--range {
    box-shadow: 0 0 6px 2px black;
}

button {
    border-radius:10px;
}

.react-calendar__tile--active {
    background: none;
}

.react-calendar__tile--now {
    background: none;
}

.react-calendar__tile:hover {
    background: grey;
}

.react-calendar__navigation button:hover {
    background: grey;
}

}
`
