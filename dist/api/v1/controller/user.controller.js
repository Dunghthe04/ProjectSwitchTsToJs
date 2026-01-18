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
exports.profileDetail = exports.login = exports.register = void 0;
const randomToken_1 = __importDefault(require("../../../helpers/randomToken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const md5_1 = __importDefault(require("md5"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const userExist = yield user_model_1.default.findOne({
        email: body.email
    });
    if (userExist) {
        res.json({
            code: 400,
            message: "Email đã tồn tại"
        });
    }
    else {
        body.password = (0, md5_1.default)(body.password);
        const newUser = new user_model_1.default({
            fullname: body.fullname,
            email: body.email,
            password: body.password,
            token: (0, randomToken_1.default)(20)
        });
        newUser.save();
        const token = newUser.token;
        res.cookie("token", token);
        res.json({
            code: 200,
            message: "Đăng kí thành công",
            token: token
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = yield user_model_1.default.findOne({
        email: body.email
    });
    if (!user) {
        res.json({
            code: 400,
            message: "Email không tồn tại",
        });
        return;
    }
    if ((0, md5_1.default)(body.password) != user.password) {
        res.json({
            code: 400,
            message: "Mật khẩu chưa chính xác",
        });
        return;
    }
    const token = user.token;
    res.cookie("token", token);
    res.json({
        code: 200,
        message: "Đăng nhập thành công",
        token: token
    });
});
exports.login = login;
const profileDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        code: 200,
        message: "Lay thong tin thanh cong",
        info: req["user"]
    });
});
exports.profileDetail = profileDetail;
