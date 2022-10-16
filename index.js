"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const DMChat_1 = __importDefault(require("./routes/DMChat"));
const GroupChat_1 = __importDefault(require("./routes/GroupChat"));
const socket_io_1 = require("socket.io");
const DMChat_2 = require("./controller/DMChat");
const GroupChat_2 = require("./controller/GroupChat");
//App set up
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: 'https://keen-fudge-bfc7f6.netlify.app/',
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express_1.default.json());
var port = process.env.PORT || 5000;
var server = app.listen(port, () => {
    console.log('Server is running');
});
const io = new socket_io_1.Server(server, {
    cors: {
        credentials: true,
        origin: "https://keen-fudge-bfc7f6.netlify.app/",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});
io.on("connection", (socket) => {
    console.log(`user ${socket.id} connected`);
    socket.on('on-chat', (data) => __awaiter(void 0, void 0, void 0, function* () {
        if (data.type === 'dm') {
            const result = yield (0, DMChat_2.getChatDMDataAndReturn)(data);
            console.log(result);
            io.emit('user-chat', result);
        }
        else {
            const result = yield (0, GroupChat_2.getChatGroupDataAndReturn)(data);
            console.log(result);
            io.emit('user-chat', result);
        }
    }));
    socket.on('disconnect', () => {
        console.log(`bye ${socket.id}`);
    });
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
app.use("/api/DMChat", DMChat_1.default);
app.use("/api/GroupChat", GroupChat_1.default);
//connect server
