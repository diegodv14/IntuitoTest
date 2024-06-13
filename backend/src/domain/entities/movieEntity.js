import { DataTypes } from "sequelize";
import { baseEntity } from "./baseEntity.js";
import { sequelize } from '../../infraestructure/config/database.js'



export class movieEntity extends baseEntity { }


movieEntity.init({
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
}, {
    sequelize,
    timestamps: false,
})