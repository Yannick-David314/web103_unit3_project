import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Event from '../components/Event'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import '../css/LocationEvents.css'

const LocationEvents = () => {
    const { id } = useParams()
    const [location, setLocation] = useState(null)
    const [events, setEvents] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                setError(null)
                const [locationData, eventsData] = await Promise.all([
                    LocationsAPI.getLocationById(id),
                    EventsAPI.getEventsByLocation(id)
                ])
                setLocation(locationData)
                setEvents(eventsData)
            }
            catch (err) {
                setError(err.message)
            }
        }) ()
    }, [id])

    if (error) {
        return (
            <div className='location-events'>
                <h2><i className='fa-solid fa-triangle-exclamation'></i> {error}</h2>
                <Link to='/' role='button'>Back to all locations</Link>
            </div>
        )
    }

    if (!location) {
        return <h2 aria-busy='true'>Loading...</h2>
    }

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} alt={location.name} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

            <main>
                {
                    events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className='fa-regular fa-calendar-xmark fa-shake'></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents
