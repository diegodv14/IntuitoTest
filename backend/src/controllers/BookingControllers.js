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

export const createBooking = async (req, res, next) => {
    try {
        const isBusy = await Seat.findOne({
            where: {
                id: Number(req.body.seatID)
            }
        })

        if (isBusy.status === false) res.json('La butaca que seleccionaste ya se encuentra ocupada.')
        const newBooking = {
            date: req.body.date,
            customerID: req.body.customerID,
            billboardID: req.body.billboardID,
            seatID: Number(req.body.seatID)
        }
        await Seat.update({ status: false }, {
            where: {
                id: req.body.seatID
            }
        })
        const newBookingCreated = await Booking.create(newBooking)

        if (!newBookingCreated) res.json('Hubo un problema al crear la reservacion.')

        res.status(201).json('Reserva Creada');

    } catch (err) {
        next(err)
    }
}


