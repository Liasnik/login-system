import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import handleValidationError from './middleware/handleValidationError.js'
import { authValidator } from './helpers/validators.js'
import { getUser, login, register } from './controllers/UserController.js'
import isAuthenticated from './middleware/isAuthenticated.js'

dotenv.config()

mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error))

const app = express()

 app.use(express.json())
 app.use(cors())

 app.post("/register", authValidator, handleValidationError, register)
 app.post("/login", authValidator, handleValidationError, login)
 app.get("/me", isAuthenticated, getUser)

 const PORT = process.env.PORT || 8888

 app.listen(PORT, (error) => {
    if (error) {
        return console.log(error)
    }

    console.log(`Server is running on port ${PORT}`)
 })