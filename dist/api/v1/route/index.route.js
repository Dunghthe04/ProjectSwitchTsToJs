"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_route_1 = require("../route/task.route");
const user_route_1 = require("../route/user.route");
const auth_middleware_1 = __importDefault(require("../../../middleware/auth.middleware"));
const indexRouter = (app) => {
    const version = "/api/v1";
    app.use(`${version}/tasks`, auth_middleware_1.default, task_route_1.taskRouter);
    app.use(`${version}/users`, user_route_1.userRouter);
};
exports.default = indexRouter;
