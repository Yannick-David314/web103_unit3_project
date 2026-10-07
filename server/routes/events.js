import express from 'express'
import EventsController from '../controllers/events.js'


const router = express.Router()

router.get('/', EventsController.getEvents)
router.get('/:id', EventsController.getEventById)
router.get('/location/:id', EventsController.getEventsByLocation)



export default router
