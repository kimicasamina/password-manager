import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import helmet from 'helmet'
import cors from 'cors'
import { corsOption } from './middleware/corsOption'
import { logger } from './middleware/logEvents'
import sequelize from './db/config/sequelize'
import userRouter from './api/routes/user'
import passwordRouter from './api/routes/password'

dotenv.config()
const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors(corsOption))

// custom middleware logger
app.use(logger)

app.use('/api/users/', userRouter)
app.use('/api/passwords', passwordRouter)

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
