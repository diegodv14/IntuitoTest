import { baseEntity } from "./baseEntity.js";
import { Room } from "./roomEntity.js";
import { DataTypes } from "sequelize";
import { sequelize } from '../config/database.js'


export class Seat extends baseEntity { }

Seat.init({
    number: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    rowNumber: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    roomID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Room,
            key: 'id',
        },
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

Seat.belongsTo(Room, { foreignKey: 'roomID' });
