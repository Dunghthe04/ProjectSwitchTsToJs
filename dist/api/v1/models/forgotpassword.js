"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const forgotPasswordSchema = new mongoose_1.default.Schema({
    email: String,
    otp: String,
    expireAt: {
        type: Date,
        expire: 0
    }
}, { timestamps: true });
const forgotpassword = mongoose_1.default.model("Forgotpassword", forgotPasswordSchema, "forgotpassword");
exports.default = forgotpassword;
