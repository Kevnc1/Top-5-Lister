// Importing Node.js Modules
const express = require('express') // back-end web app framework
const cors = require('cors') // cross-origin resource sharing
const dotenv = require('dotenv') // loads env variables from an .env file into process.env
const cookieParser = require('cookie-parser') // parse cookies from request object

// CREATE OUR SERVER
dotenv.config()
const PORT = process.env.PORT || 4000;
const app = express()

// SETUP THE MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use(express.json()) 
app.use(cookieParser())

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const top5listsRouter = require('./routes/top5lists-router')
app.use('/api', top5listsRouter)

// INITIALIZE OUR DATABASE OBJECT
const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// PUT THE SERVER IN LISTENING MODE
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


