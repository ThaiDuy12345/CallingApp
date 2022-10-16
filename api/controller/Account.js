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
exports.getAccountWithId = exports.getAccount = exports.createAnAccount = exports.getAllAccount = void 0;
const Account_1 = __importDefault(require("../model/Account"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Account_1.default.find({
        _id: { $ne: req.body._id }
    }, (err, results) => {
        res.json(results);
    });
});
exports.getAllAccount = getAllAccount;
const createAnAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newAccount = new Account_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name: req.body.username,
        password: req.body.password,
        email: req.body.email,
        group: []
    });
    Account_1.default.create(newAccount, (err, account) => {
        res.json(newAccount);
    });
});
exports.createAnAccount = createAnAccount;
const getAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Account_1.default.findOne({
        email: req.body.email,
        password: req.body.password
    }, (err, account) => {
        res.json(account);
    });
});
exports.getAccount = getAccount;
const getAccountWithId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Account_1.default.findOne({
        _id: req.params.Id
    }, (err, account) => {
        res.json(account);
    });
});
exports.getAccountWithId = getAccountWithId;
