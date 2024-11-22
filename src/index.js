import express from 'express'

const app = express()

const PORT = 9000
app.listen(PORT, () => {
    console.log(`Server starts at http://localhost:${PORT}`)
})
