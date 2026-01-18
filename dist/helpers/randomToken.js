"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randomToken = (length) => {
    let character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += character.charAt(Math.floor(Math.random() * character.length));
    }
    return result;
};
exports.default = randomToken;
