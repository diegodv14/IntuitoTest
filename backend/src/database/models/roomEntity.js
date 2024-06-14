import { baseEntity } from "./baseEntity.js";
import { DataTypes } from "sequelize";
import { sequelize } from '../config/database.js'

export class Room extends baseEntity { }

Room.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 50],
                msg: 'El nombre de la sala debe tener 50 caracteres como maximo.'
            }
        }
    },
    number: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
}, {
    sequelize,
    timestamps: false,
})

