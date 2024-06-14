import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export class baseEntity extends Model { }

baseEntity.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize,
    timestamps: false,
})