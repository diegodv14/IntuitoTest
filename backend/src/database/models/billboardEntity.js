import { baseEntity } from "./baseEntity.js";
import { DataTypes } from "sequelize";
import { Movie } from "./movieEntity.js";
import { Room } from "./roomEntity.js";
import { sequelize } from '../config/database.js'


export class Billboard extends baseEntity { }

Billboard.init({
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
            model: Movie,
            key: 'id',
        }
    },
    roomID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Room,
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
Billboard.belongsTo(Movie, { foreignKey: 'movieID' })
Billboard.belongsTo(Room, { foreignKey: 'roomID' })