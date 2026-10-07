import { pool } from '../config/database.js'

// TO_CHAR keeps date as a plain 'YYYY-MM-DD' string so it can't shift a day due to time zones
const selectEvents = `
    SELECT events.id, events.title, TO_CHAR(events.date, 'YYYY-MM-DD') AS date,
           events.time, events.image, events.location_id, locations.name AS location_name
    FROM events
    JOIN locations ON locations.id = events.location_id
`

const getEvents = async (req, res) => {
    try {
        const results = await pool.query(`${selectEvents} ORDER BY events.date ASC, events.time ASC`)
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getEventById = async (req, res) => {
    try {
        const results = await pool.query(`${selectEvents} WHERE events.id = $1`, [req.params.id])

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' })
        }

        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getEventsByLocation = async (req, res) => {
    try {
        const results = await pool.query(
            `${selectEvents} WHERE events.location_id = $1 ORDER BY events.date ASC, events.time ASC`,
            [req.params.id]
        )
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getEvents,
    getEventById,
    getEventsByLocation
}
