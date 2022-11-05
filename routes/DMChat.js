"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const DMChat_1 = require("../controller/DMChat");
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
router.post("/addAChat", DMChat_1.addAChat);
router.post("/loadImage", upload.single("file"), DMChat_1.loadImage);
router.post("/getChat", DMChat_1.getChat);
exports.default = router;
