import express from 'express'
import { createRoom, getRooms } from '../controllers/RoomController.js'
export const roomRouter = express.Router()


roomRouter.post('/salas', (req, res, next) => {
    createRoom(req, res, next)
})


roomRouter.get('/salas', async (req, res, next) => {
    getRooms(req, res, next)

})