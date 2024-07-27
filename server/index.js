require('dotenv').config()

const express = require("express")
const connectDB = require("./config/db")
const cors = require('cors')
const cookieParser = require("cookie-parser")

const authRoutes = require('./routes/user')

const app = express()
app.use(express.json())
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
))
app.use(cookieParser())

connectDB()

app.use("/api/auth", authRoutes)

app.listen(process.env.PORT || 5000, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`);
})