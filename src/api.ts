import express from "express"
import mongoose from "mongoose"
import serverless from "serverless-http"
import cors from "cors"
import dotenv from "dotenv"
import accountRouter from "./routes/Account"
import groupRouter from "./routes/Group"
import dmChatRouter from "./routes/DMChat"
import groupChatRouter from "./routes/GroupChat"
import imageRouter from "./routes/Image"
import { Server } from "socket.io"
import DMChat from "./model/DMChat"
import Account from "./model/Account"
import { getChatDMDataAndReturn } from "./controller/DMChat"
import { getChatGroupDataAndReturn } from "./controller/GroupChat"
//App set up
dotenv.config()
const app = express()
app.use(
    cors({
        credentials: true,
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
)
app.use(express.static(__dirname + "/public"))
app.use(express.json())
var port = process.env.PORT || 5000
var server = app.listen(port, () => {
    console.log("Server is running")
})
const io = new Server(server, {
    cors: {
        credentials: true,
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
})
io.on("connection", (socket) => {
    console.log(`user ${socket.id} connected`)
    socket.on("on-chat", async (data) => {
        if (data.type === "dm") {
            const result = await getChatDMDataAndReturn(data)
            io.emit("user-chat", result)
        } else {
            const result = await getChatGroupDataAndReturn(data)
            io.emit("user-chat", result)
        }
    })
    socket.on("disconnect", () => {
        console.log(`bye ${socket.id}`)
    })
})
//Set up mongoose
const uri = `mongodb+srv://sa:${process.env.PASSWORD}@${process.env.CLUSTERNAME}.yuh6by2.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose.connect(uri)
//Router
app.get("/.netlify/functions/api/", (req, res) => {
    res.send("This is Sirikakire calling app server api, this server is running very well. Hope you are having a wonderful day")
})
app.use("/.netlify/functions/api/Account", accountRouter)
app.use("/.netlify/functions/api/Group", groupRouter)
app.use("/.netlify/functions/api/DMChat", dmChatRouter)
app.use("/.netlify/functions/api/GroupChat", groupChatRouter)
app.use("/.netlify/functions/api/Image", imageRouter)

//Deployment

module.exports.handler = serverless(app)



