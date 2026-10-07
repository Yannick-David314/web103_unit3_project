import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LocationsAPI from '../services/LocationsAPI'
import '../css/Locations.css'

const Locations = () => {
    const [locations, setLocations] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const locationsData = await LocationsAPI.getAllLocations()
                setLocations(locationsData)
            }
            catch (err) {
                setError(err.message)
            }
        }) ()
    }, [])

    if (error) {
        return <h2><i className='fa-solid fa-triangle-exclamation'></i> {error}</h2>
    }

    return (
        <div className='available-locations'>
            <p className='locations-prompt'>Choose a destination to see what's happening there</p>

            <div className='locations-grid'>
                {
                    locations.map((location) =>
                        <Link
                            key={location.id}
                            to={`/locations/${location.id}`}
                            className='location-card'
                            style={{ backgroundImage: `url(${location.image})` }}
                        >
                            <div className='location-card-overlay'>
                                <h3>{location.name}</h3>
                                <p><i className='fa-solid fa-location-dot'></i> {location.city}, {location.state}</p>
                                <span className='location-card-cta'>View events <i className='fa-solid fa-arrow-right'></i></span>
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}

export default Locations
