import { Room } from "../database/models/roomEntity.js"

export const getRooms = async (req, res, next) => {
    try {
        const Rooms = await Room.findAll()
        res.json(Rooms)
    } catch (err) {
        next(err)
    }
}

export const createRoom = async (req, res, next) => {
    try {
        const Rooms = await Room.findAll()
        const RoomsNumber = Rooms.map(room => room.number)
        const maxValue = Math.max(...RoomsNumber);

        const newRoom = {
            name: `Sala ${maxValue + 1}`,
            number: maxValue + 1
        }

        const CreatedRoom = await Room.create(newRoom)
        res.json(CreatedRoom)

    } catch (err) {
        next(err)
    }
}