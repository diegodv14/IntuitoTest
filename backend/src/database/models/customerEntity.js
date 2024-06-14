import { baseEntity } from "./baseEntity.js";
import { DataTypes } from "sequelize";
import { sequelize } from '../config/database.js'

export class Customer extends baseEntity { }

Customer.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    documentNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [1, 20],
                msg: 'El documento debe tener 20 caracteres como maximo.'
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 30],
                msg: 'Su nombre debe tener 30 caracteres como maximo.'
            }
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [1, 20],
                msg: 'Su numero de telefono debe tener 20 caracteres como maximo.'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [1, 100],
                msg: 'Su email debe tener 100 caracteres como maximo.'
            }
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
