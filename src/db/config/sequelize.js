import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize('Password_manager', 'root', 'root_password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    // models: [__dirname + '/src/db/models'],
    // storage: './src/db/storage/mysql',
})

export default sequelize
