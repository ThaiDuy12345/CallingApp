"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DMChat_1 = require("../controller/DMChat");
const router = express_1.default.Router();
router.post("/addAChat", DMChat_1.addAChat);
router.post("/getChat", DMChat_1.getChat);
exports.default = router;
