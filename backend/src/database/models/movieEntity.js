import { DataTypes } from "sequelize";
import { baseEntity } from "./baseEntity.js";
import { sequelize } from '../config/database.js'



export class Movie extends baseEntity { }


Movie.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 100],
                msg: 'El nombre de la pelicula debe tener 100 caracteres como maximo.'
            }
        }
    },
    genre: {
        type: DataTypes.ENUM(
            'ACTION', 'ADVENTURE', 'COMEDY', 'DRAMA', 'FANTASY', 'HORROR',
            'MUSICALS', 'MYSTERY', 'ROMANCE', 'SCIENCE_FICTION', 'SPORTS',
            'THRILLER', 'WESTERN'
        ),
        allowNull: false,
    },
    allowedAge: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    lengthMinutes: {
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