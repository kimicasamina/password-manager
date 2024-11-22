import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import helmet from 'helmet'
import cors from 'cors'
import { corsOption } from './middleware/corsOption'
import { logger } from './middleware/logEvents'
import sequelize from './db/config/sequelize'
import { User } from './db/models/User'
import { Password } from './db/models/Password'

dotenv.config()
const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
// app.use(cors(corsOption))

// custom middleware logger
app.use(logger)

app.use('/api/users/', async (req, res) => {
    console.log('hello')
    const users = await User.findAll()
    res.json({ users })
})

app.use('/api/passwords/', async (req, res) => {
    console.log('hello')
    const passwords = await Password.findAll()
    res.json({ passwords })
})
// app.use('/', (req, res, next) => {
//     res.json({ msg: 'hello world' })
// })

// global error handler
app.use('*', (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(err.message)
})

sequelize
    .sync()
    .then(() => {
        console.log('Connection has been established successfully.')
        app.listen(process.env.PORT, () => {
            console.log(`Server starts at http://localhost:${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.error('Unable to connect to the database: ', error)
    })
