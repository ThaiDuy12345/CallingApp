"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Account_1 = require("../controller/Account");
const router = express_1.default.Router();
router.get("/getAllAccount", Account_1.getAllAccount);
router.post("/getAccount", Account_1.getAccount);
router.get("/getAccountWithId/:Id", Account_1.getAccountWithId);
router.post("/createAnAccount", Account_1.createAnAccount);
router.put("/putAccount", (req, res) => {
    res.send("HelloWorld");
});
router.delete("/deleteAccount", (req, res) => {
    res.send("HelloWorld");
});
exports.default = router;
