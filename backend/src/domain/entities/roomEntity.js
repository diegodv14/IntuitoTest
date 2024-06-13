import { baseEntity } from "./baseEntity.js";
import { DataTypes } from "sequelize";
import { sequelize } from '../../infraestructure/config/database.js'

export class roomEntity extends baseEntity { }

roomEntity.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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
}, {
    sequelize,
    modelName: 'room',
    timestamps: false,
})

