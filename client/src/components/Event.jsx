import React, { useState } from 'react'
import dates from '../utils/dates'
import '../css/Event.css'

const Event = ({ title, date, time, image, locationName }) => {
    const [imageFailed, setImageFailed] = useState(false)
    const passed = dates.hasPassed(date, time)

    return (
        <article className='event-information'>
            {
                imageFailed
                    ? <div className='event-image-fallback'><i className='fa-regular fa-calendar'></i></div>
                    : <img src={image} alt={title} onError={() => setImageFailed(true)} />
            }

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{title}</h3>
                    {locationName && <p><i className='fa-solid fa-location-dot'></i> {locationName}</p>}
                    <p><i className='fa-regular fa-calendar fa-bounce'></i> {dates.formatDate(date)} <br /> {dates.formatTime(time)}</p>
                </div>
            </div>

            <p className={passed ? 'remaining negative-time-remaining' : 'remaining'}>
                {dates.formatRemainingTime(date, time)}
            </p>
        </article>
    )
}

export default Event
