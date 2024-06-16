import { Sequelize } from "sequelize";
import { Billboard } from "../database/models/billboardEntity.js";
import { Seat } from "../database/models/seatEntity.js"
import { Room } from "../database/models/roomEntity.js";
//Funcion para obtener los asientos disponibles y ocupados de todas las salas que se encuentran con funciones el dia de hoy.

const formatDateToDDMMYYYY = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
};

export const getSeats = async () => {
    const today = formatDateToDDMMYYYY(new Date())

    const BillboardsToday = await Billboard.findAll({
        where: {
            date: today
        },
    })

    const roomsID = BillboardsToday.map(billboard => billboard.roomID)

    const SeatsAvalialableInTodayRooms = await Seat.count({
        where: {
            roomID: { [Sequelize.Op.in]: roomsID },
            status: true
        },
        group: ['roomID']
    })

    const SeatBusyInTodayRooms = await Seat.count({
        where: {
            roomID: { [Sequelize.Op.in]: roomsID },
            status: false
        },
        group: ['roomID']
    })

    return {
        SeatsAvalialableInTodayRooms,
        SeatBusyInTodayRooms
    }
}