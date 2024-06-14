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

export const createBillboards = async (req, res, next) => {

}
