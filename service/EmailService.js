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
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.PROD_MAIL_USER,
        pass: process.env.PROD_MAIL_PASS, // your password
    },
    secure: true,
    logger: true,
    debug: true,
});
const EmailService = (emailAddress) => __awaiter(void 0, void 0, void 0, function* () {
    emailAddress.subject = "Generate new password for your email";
    emailAddress.from = "Sirikakire";
    transport.sendMail(emailAddress, (error, info) => {
        if (!error) {
            console.error(error);
        }
        else {
            console.log(info);
        }
    });
});
exports.default = EmailService;
