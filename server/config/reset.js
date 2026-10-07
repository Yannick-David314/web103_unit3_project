import { pool } from './database.js'
import locations from '../data/locations.js'
import events from '../data/events.js'

const createTables = async () => {
    const createTablesQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(50) NOT NULL,
            zip VARCHAR(20) NOT NULL,
            image TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            image TEXT NOT NULL,
            location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE
        );
    `

    try {
        await pool.query(createTablesQuery)
        console.log('🎉 locations and events tables created successfully')
    }
    catch (error) {
        console.error('⚠️ error creating tables', error)
        throw error
    }
}

const seedLocationsTable = async () => {
    for (const location of locations) {
        const insertQuery = `
            INSERT INTO locations (name, address, city, state, zip, image)
            VALUES ($1, $2, $3, $4, $5, $6)
        `
        const values = [
            location.name,
            location.address,
            location.city,
            location.state,
            location.zip,
            location.image
        ]

        try {
            await pool.query(insertQuery, values)
            console.log(`✅ ${location.name} added successfully`)
        }
        catch (error) {
            console.error(`⚠️ error inserting ${location.name}`, error)
            throw error
        }
    }
}

const seedEventsTable = async () => {
    for (const event of events) {
        const insertQuery = `
            INSERT INTO events (title, date, time, image, location_id)
            VALUES ($1, $2, $3, $4, $5)
        `
        const values = [
            event.title,
            event.date,
            event.time,
            event.image,
            event.location_id
        ]

        try {
            await pool.query(insertQuery, values)
            console.log(`✅ ${event.title} added successfully`)
        }
        catch (error) {
            console.error(`⚠️ error inserting ${event.title}`, error)
            throw error
        }
    }
}

const reset = async () => {
    try {
        await createTables()
        await seedLocationsTable()
        await seedEventsTable()
    }
    finally {
        await pool.end()
    }
}

reset()
