import { app } from './app.js'
import { sequelize } from './database/config/database.js'
import 'dotenv/config'
import { Customer } from './database/models/customerEntity.js';
import { Movie } from './database/models/movieEntity.js';
import { Room } from './database/models/roomEntity.js';
import { Billboard } from './database/models/billboardEntity.js';
import { Booking } from './database/models/bookingEntity.js';
import { Seat } from './database/models/seatEntity.js';


//Data de Prueba Creada mediate IA
async function createTestData() {
    const customer1 = await Customer.create({
        documentNumber: '12345678',
        name: 'Juan',
        lastname: 'Pérez',
        age: 30,
        phoneNumber: '123456789',
        email: 'juan.perez@example.com',
    });

    const customer2 = await Customer.create({
        documentNumber: '87654321',
        name: 'María',
        lastname: 'Gómez',
        age: 25,
        phoneNumber: '987654321',
        email: 'maria.gomez@example.com',
    });

    const movie1 = await Movie.create({
        name: 'IT',
        genre: 'HORROR',
        allowedAge: 18,
        lengthMinutes: 120,
    });

    const movie2 = await Movie.create({
        name: 'Avengers EndGame',
        genre: 'ACTION',
        allowedAge: 12,
        lengthMinutes: 90,
    });

    const room1 = await Room.create({
        name: 'Sala 1',
        number: 1,
    });

    const room2 = await Room.create({
        name: 'Sala 2',
        number: 2,
    });


    const seat1 = await Seat.create({
        number: 1,
        rowNumber: 1,
        roomID: room1.dataValues.id,
    });

    await Seat.create({
        number: 2,
        rowNumber: 1,
        roomID: room1.dataValues.id,
    });

    const seat3 = await Seat.create({
        number: 1,
        rowNumber: 2,
        roomID: room2.dataValues.id,
    });

    await Seat.create({
        number: 2,
        rowNumber: 2,
        roomID: room2.dataValues.id,
        status: false
    });

    const billboard1 = await Billboard.create({
        date: new Date(),
        startTime: '18:00:00',
        endTime: '20:00:00',
        movieID: movie1.dataValues.id,
        roomID: room1.dataValues.id,
        status: true
    });

    const billboard2 = await Billboard.create({
        date: new Date(),
        startTime: '20:00:00',
        endTime: '22:00:00',
        movieID: movie2.dataValues.id,
        roomID: room2.dataValues.id,
    });

    await Booking.create({
        date: new Date(),
        customerID: customer1.dataValues.id,
        seatID: seat1.dataValues.id,
        billboardID: billboard1.dataValues.id,
    });

    await Booking.create({
        date: new Date(),
        customerID: customer2.dataValues.id,
        seatID: seat3.dataValues.id,
        billboardID: billboard2.dataValues.id,
    });

    console.log('Datos de prueba creados exitosamente');
}


const doConnection = async () => {
    try {
        await sequelize.sync({ force: true })
        await createTestData()
        console.log('Conexion establecida exitosamente.');

    } catch (error) {
        console.error('No se pudo conectar a la base de datos', error);
    }
}
app.listen(process.env.PORT, () => {
    doConnection()
    console.log(`El servidor se esta ejecutando en el puerto ${process.env.PORT}`)
})
