import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import helmet from 'helmet'
import cors from 'cors'
import { corsOption } from './middleware/corsOption'

dotenv.config()
const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors(corsOption))

// serve static files
app.use(express.static(path.join(__dirname, '/build')))

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})
// not found handler
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404_page.html'))
})
// global error handler
app.use('*', (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(err.message)
})

app.listen(process.env.PORT, () => {
    console.log(`Server starts at http://localhost:${process.env.PORT}`)
})
