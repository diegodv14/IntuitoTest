import { Sequelize } from 'sequelize'
import 'dotenv/config'

export const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    logging: false
})