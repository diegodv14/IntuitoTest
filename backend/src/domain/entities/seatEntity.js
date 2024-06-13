import { baseEntity } from "./baseEntity.js";
import { roomEntity } from "./roomEntity.js";
import { DataTypes } from "sequelize";
import { sequelize } from '../../infraestructure/config/database.js'


export class seatEntity extends baseEntity { }

seatEntity.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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
            model: roomEntity,
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

seatEntity.belongsTo(roomEntity, { foreignKey: 'roomID' });
