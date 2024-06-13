import { baseEntity } from "./baseEntity.js";
import { DataTypes } from "sequelize";
import { customerEntity } from "./customerEntity.js";
import { billboardEntity } from "./billboardEntity.js";
import { seatEntity } from "./seatEntity.js";
import { sequelize } from '../../infraestructure/config/database.js'


export class bookingEntity extends baseEntity { }

bookingEntity.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    customerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: customerEntity,
            key: 'id'
        }
    },
    billboardID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: billboardEntity,
            key: 'id'
        }
    },
    seatID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: seatEntity,
            key: 'id'
        }
    }
}, {
    sequelize,
    timestamps: false,
})

bookingEntity.belongsTo(customerEntity, { foreignKey: 'customerId' });
bookingEntity.belongsTo(seatEntity, { foreignKey: 'seatId' });
bookingEntity.belongsTo(billboardEntity, { foreignKey: 'billboardId' });