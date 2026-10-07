import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import '../css/Events.css'

const sorters = {
    'date-asc': (a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`),
    'date-desc': (a, b) => `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`),
    'title': (a, b) => a.title.localeCompare(b.title)
}

const Events = () => {
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])
    const [locationFilter, setLocationFilter] = useState('all')
    const [sortBy, setSortBy] = useState('date-asc')
    const [error, setError] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const [eventsData, locationsData] = await Promise.all([
                    EventsAPI.getAllEvents(),
                    LocationsAPI.getAllLocations()
                ])
                setEvents(eventsData)
                setLocations(locationsData)
            }
            catch (err) {
                setError(err.message)
            }
        }) ()
    }, [])

    const visibleEvents = events
        .filter((event) => locationFilter === 'all' || event.location_id === Number(locationFilter))
        .sort(sorters[sortBy])

    if (error) {
        return <h2><i className='fa-solid fa-triangle-exclamation'></i> {error}</h2>
    }

    return (
        <div className='all-events'>
            <div className='events-controls'>
                <label>
                    Location
                    <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
                        <option value='all'>All locations</option>
                        {
                            locations.map((location) =>
                                <option key={location.id} value={location.id}>{location.name}</option>
                            )
                        }
                    </select>
                </label>

                <label>
                    Sort by
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value='date-asc'>Date (soonest first)</option>
                        <option value='date-desc'>Date (latest first)</option>
                        <option value='title'>Title (A–Z)</option>
                    </select>
                </label>
            </div>

            <main>
                {
                    visibleEvents.length > 0 ? visibleEvents.map((event) =>
                        <Event
                            key={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                            locationName={event.location_name}
                        />
                    ) : <h2><i className='fa-regular fa-calendar-xmark fa-shake'></i> No events found</h2>
                }
            </main>
        </div>
    )
}

export default Events
