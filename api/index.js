"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const Account_1 = __importDefault(require("./routes/Account"));
const Group_1 = __importDefault(require("./routes/Group"));
const socket_io_1 = require("socket.io");
//App set up
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
var server = app.listen(5000, () => {
    console.log('Server is running');
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    console.log(`user ${socket.id} connected`);
});
//Set up mongoose
const uri = `mongodb+srv://sa:${process.env.PASSWORD}@${process.env.CLUSTERNAME}.yuh6by2.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose_1.default.connect(uri, () => {
    console.log(`connecting to mongodb ${process.env.CLUSTERNAME} with name: sa - password: ${process.env.PASSWORD} and database name: ${process.env.DBNAME}`);
});
//Router
app.get("/", (req, res) => {
    res.send("Hell from server");
});
app.use("/api/Account", Account_1.default);
app.use("/api/Group", Group_1.default);
//connect server
