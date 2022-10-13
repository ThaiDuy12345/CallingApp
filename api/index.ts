import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import fs from 'fs'
import accountRouter from './routes/Account'
import groupRouter from './routes/Group'
import { Server } from 'socket.io'
//App set up
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
var server = app.listen(5000, () => {
    console.log('Server is running')
})
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
io.on("connection", (socket) => {
    console.log(`user ${socket.id} connected`)
})
//Set up mongoose
const uri = `mongodb+srv://sa:${process.env.PASSWORD}@${process.env.CLUSTERNAME}.yuh6by2.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose.connect(uri, () => {
    console.log(`connecting to mongodb ${process.env.CLUSTERNAME} with name: sa - password: ${process.env.PASSWORD} and database name: ${process.env.DBNAME}`)
})
//Router
app.get("/", (req, res) => {
    res.send("Hell from server")
})
app.use("/api/Account", accountRouter)
app.use("/api/Group", groupRouter)
//connect server

