const getAllEvents = async () => {
    const response = await fetch('/api/events')

    if (!response.ok) {
        throw new Error(`Failed to load events (${response.status})`)
    }

    return response.json()
}

const getEventsById = async (id) => {
    const response = await fetch(`/api/events/${id}`)

    if (!response.ok) {
        throw new Error(`Failed to load event ${id} (${response.status})`)
    }

    return response.json()
}

const getEventsByLocation = async (locationId) => {
    const response = await fetch(`/api/events/location/${locationId}`)

    if (!response.ok) {
        throw new Error(`Failed to load events for location ${locationId} (${response.status})`)
    }

    return response.json()
}

export default {
    getAllEvents,
    getEventsById,
    getEventsByLocation
}
