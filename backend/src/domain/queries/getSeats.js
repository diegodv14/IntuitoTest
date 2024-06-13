import { Sequelize } from "sequelize"
import { billboardEntity } from "../entities/billboardEntity.js"
import { movieEntity } from "../entities/movieEntity.js"
import { roomEntity } from "../entities/roomEntity.js"
import { seatEntity } from "../entities/seatEntity.js"

export const getSeats = async () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    await movieEntity.create({
        id: 1,
        name: "avengers",
        genre: 'ACTION',
        allowedAge: 12,
        lengthMinutes: 32
    })

    const room = await roomEntity.create({
        name: 'Sala 1',
        number: 1
    });

    await seatEntity.bulkCreate([
        { number: 1, rowNumber: 1, roomID: room.id, status: true },
        { number: 2, rowNumber: 1, roomID: room.id, status: true },
        { number: 3, rowNumber: 1, roomID: room.id, status: false }
    ]);

    await billboardEntity.create({
        date: new Date(),
        startTime: '18:00',
        endTime: '20:00',
        movieID: 1,
        roomID: room.id
    });



    const seatsAvailable = await seatEntity.count({
        where: {
            status: true
        },
        include: {
            model: roomEntity,
            required: true,
        },
        group: ['roomID']
    })

    const seatsBusy = await seatEntity.count({
        where: {
            status: false
        },
        include: {
            model: roomEntity,
            required: true,
        },
        group: ['roomID']
    })

    return {
        seatsAvailable,
        seatsBusy
    }
}