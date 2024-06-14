import { baseEntity } from "./baseEntity.js";
import { DataTypes } from "sequelize";
import { Customer } from "./customerEntity.js";
import { Billboard } from "./billboardEntity.js";
import { Seat } from "./seatEntity.js";
import { sequelize } from '../config/database.js'


export class Booking extends baseEntity { }

Booking.init({
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    customerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Customer,
            key: 'id'
        }
    },
    billboardID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Billboard,
            key: 'id'
        }
    },
    seatID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Seat,
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

Booking.belongsTo(Customer, { foreignKey: 'customerID' });
Booking.belongsTo(Seat, { foreignKey: 'seatID' });
Booking.belongsTo(Billboard, { foreignKey: 'billboardID' });