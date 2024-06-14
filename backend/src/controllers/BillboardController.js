import { Billboard } from "../database/models/billboardEntity.js"
import { Movie } from "../database/models/movieEntity.js"


export const getBillboards = async (req, res, next) => {
    try {
        const Billboards = await Billboard.findAll({
            include: [Movie]
        })
        res.json(Billboards)
    } catch (err) {
        next(err)
    }
}