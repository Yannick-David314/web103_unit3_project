const getAllLocations = async () => {
    const response = await fetch('/api/locations')

    if (!response.ok) {
        throw new Error(`Failed to load locations (${response.status})`)
    }

    return response.json()
}

const getLocationById = async (id) => {
    const response = await fetch(`/api/locations/${id}`)

    if (!response.ok) {
        throw new Error(`Failed to load location ${id} (${response.status})`)
    }

    return response.json()
}

export default {
    getAllLocations,
    getLocationById
}
