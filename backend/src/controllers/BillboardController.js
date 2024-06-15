import { Billboard } from "../database/models/billboardEntity.js"
import { Movie } from "../database/models/movieEntity.js"
import { Room } from "../database/models/roomEntity.js"


export const getBillboards = async (req, res, next) => {
    try {
        const Billboards = await Billboard.findAll({
            include: [
                {
                    model: Movie
                },
                {
                    model: Room
                }
            ]
        })
        res.json(Billboards)
    } catch (err) {
        next(err)
    }
}

export const createBillboard = async (req, res, next) => {
    try {

        await Room.update({ status: false }, {
            where: {
                id: req.body.roomID
            }
        })

        const createdBillboard = await Billboard.create(req.body)

        if (!createdBillboard) res.json('Hubo un problema creando la cartelera.')

        const newBillBoard = await Billboard.findOne({
            where: {
                id: createdBillboard.id
            },
            include: [
                {
                    model: Movie
                },
                {
                    model: Room
                }
            ]
        })

        res.json(newBillBoard)
    } catch (err) {
        next(err)
    }

}
