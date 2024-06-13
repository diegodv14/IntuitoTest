import { baseEntity } from "./baseEntity.js";
import { DataTypes } from "sequelize";
import { movieEntity } from "./movieEntity.js";
import { roomEntity } from "./roomEntity.js";
import { sequelize } from '../../infraestructure/config/database.js'


export class billboardEntity extends baseEntity { }

billboardEntity.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    movieID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: movieEntity,
            key: 'id',
        }
    },
    roomID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: roomEntity,
            key: 'id'
        }
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

billboardEntity.belongsTo(movieEntity, { foreignKey: 'movieID' })
billboardEntity.belongsTo(roomEntity, { foreignKey: 'roomID' })