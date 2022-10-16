import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import accountRouter from './routes/Account'
import groupRouter from './routes/Group'
import dmChatRouter from './routes/DMChat'
import groupChatRouter from './routes/GroupChat'
import { Server } from 'socket.io'
import DMChat from './model/DMChat'
import Account from './model/Account'
import { getChatDMDataAndReturn } from './controller/DMChat'
import { getChatGroupDataAndReturn } from './controller/GroupChat'
//App set up
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
var port = process.env.PORT || 5000
var server = app.listen(port, () => {
    console.log('Server is running')
})
const io = new Server(server, {
    cors: {
        origin: "https://sirichat.000webhostapp.com/",
        methods: ["GET", "POST"]
    }
})
io.on("connection", (socket) => {
    console.log(`user ${socket.id} connected`)
    socket.on('on-chat', async(data) => {
        if(data.type === 'dm'){
            const result = await getChatDMDataAndReturn(data)
            console.log(result)
            io.emit('user-chat', result)
        }else{
            const result = await getChatGroupDataAndReturn(data)
            console.log(result)
            io.emit('user-chat', result)
        }
    })
    socket.on('disconnect', () => {
        console.log(`bye ${socket.id}`);
    });

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
app.use("/api/DMChat", dmChatRouter)
app.use("/api/GroupChat", groupChatRouter)
//connect server

