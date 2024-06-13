import { app } from './app.js'
import { sequelize } from './config/database.js'


const PORT = 3001

try {
    await sequelize.sync({ force: true })

    console.log('Connection has been established successfully.');
    app.listen(PORT, () => {
        console.log(`Server is running in ${PORT}`)
    })
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

