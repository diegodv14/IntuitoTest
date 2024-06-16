import { Seat } from "../database/models/seatEntity.js"
import { Room } from "../database/models/roomEntity.js"

export const getAllSeats = async (req, res, next) => {
    try {
        const Seats = await Seat.findAll({
            include: [Room]
        })
        res.json(Seats)
    } catch (err) {
        next(err)
    }
}

export const createSeat = async (req, res, next) => {
    try {

        const IfExist = await Seat.findOne({
            where: {
                number: req.body.number,
                rowNumber: req.body.rowNumber,
                roomID: req.body.roomID
            }
        })

        if (IfExist) res.json('Ya existe una butaca registrada a esa fila con ese numero en dicha sala.')

        const RecibedSeat = {
            number: req.body.number,
            rowNumber: req.body.rowNumber,
            roomID: req.body.roomID
        }
        const newSeat = await Seat.create(RecibedSeat)
        res.json(newSeat)
    } catch (err) {
        next(err)
    }
}