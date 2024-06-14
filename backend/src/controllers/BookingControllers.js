import { Billboard } from "../database/models/billboardEntity.js"
import { Booking } from "../database/models/bookingEntity.js"
import { Customer } from "../database/models/customerEntity.js"
import { Movie } from "../database/models/movieEntity.js"
import { Room } from "../database/models/roomEntity.js"
import { Seat } from "../database/models/seatEntity.js"

export const getBookings = async (req, res, next) => {
    try {
        const Bookings = await Booking.findAll({
            include: [
                {
                    model: Customer
                },
                {
                    model: Billboard,
                    include: [
                        {
                            model: Movie
                        }
                    ]
                },
                {
                    model: Seat,
                    include: [
                        {
                            model: Room
                        }
                    ]
                }
            ]
        })
        res.json(Bookings)
    } catch (err) {
        next(err)
    }
}

export const getRooms = async (req, res, next) => {
    try {
        const Rooms = await Room.findAll({
            where: {
                status: true
            }
        })
        res.json(Rooms)
    } catch (err) {
        next(err)
    }
}


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