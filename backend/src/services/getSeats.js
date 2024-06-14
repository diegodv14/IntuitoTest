import { Room } from "../database/models/roomEntity.js"
import { Seat } from "../database/models/seatEntity.js"

export const getSeats = async () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const seatsAvailable = await Seat.count({
        where: {
            status: true
        },
        include: {
            model: Room,
            required: true,
        },
        group: ['roomID']
    })

    const seatsBusy = await Seat.count({
        where: {
            status: false
        },
        include: {
            model: Room,
            required: true,
        },
        group: ['roomID']
    })

    return {
        seatsAvailable,
        seatsBusy
    }
}