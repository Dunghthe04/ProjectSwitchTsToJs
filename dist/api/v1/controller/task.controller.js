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
exports.deleteTask = exports.editTask = exports.createTask = exports.changeMulti = exports.changeStatus = exports.detail = exports.index = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const pagination_1 = __importDefault(require("../../../helpers/pagination"));
const search_1 = __importDefault(require("../../../helpers/search"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const find = {
            deleted: false
        };
        if (req.query.status) {
            find.status = req.query.status.toString();
        }
        const sort = {};
        if (req.query.sortKey && req.query.sortValue) {
            const sortKey = req.query.sortKey.toString();
            sort[sortKey] = req.query.sortValue;
        }
        const countRecords = yield task_model_1.default.countDocuments(find);
        const limitNumber = (_a = req.query.limit) === null || _a === void 0 ? void 0 : _a.toString();
        let initPagination = {
            limit: 2,
            currentPage: 1
        };
        if (limitNumber) {
            initPagination.limit = parseInt(limitNumber);
        }
        let pagination = (0, pagination_1.default)(initPagination, req.query, countRecords);
        let objectSearch = (0, search_1.default)(req.query);
        if (objectSearch.regex) {
            find.title = objectSearch.regex;
        }
        console.log("find", find);
        const tasks = yield task_model_1.default.find(find).sort(sort).limit(pagination.limit).skip(pagination.skip);
        res.json(tasks);
    }
    catch (error) {
        res.json("Không có dữ liệu");
    }
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id.toString();
        const task = yield task_model_1.default.find({
            deleted: false,
            _id: id
        });
        res.json(task);
    }
    catch (error) {
        res.json("Không có dữ liệu");
    }
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id.toString();
        const body = req.body;
        const statusNew = body.status;
        yield task_model_1.default.updateOne({
            _id: id
        }, { status: statusNew });
        res.json({
            code: 200,
            message: "Cập nhập trạng thái thành công"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại!"
        });
    }
});
exports.changeStatus = changeStatus;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ids, key, value } = req.body;
        let option;
        (function (option) {
            option["STATUS"] = "status";
            option["DELETE"] = "delete";
        })(option || (option = {}));
        switch (key) {
            case option.STATUS:
                yield task_model_1.default.updateMany({ _id: { $in: ids } }, { status: value });
                res.json({
                    code: 200,
                    message: "Cập nhập trạng thái thành công"
                });
                break;
            case option.DELETE:
                yield task_model_1.default.updateMany({ _id: { $in: ids } }, { deleted: true });
                res.json({
                    code: 200,
                    message: "Xóa tasks thành công"
                });
                break;
            default:
                break;
        }
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại!"
        });
    }
});
exports.changeMulti = changeMulti;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newTask = new task_model_1.default(body);
        yield newTask.save();
        res.json({
            code: 200,
            message: "Thêm mới thành cồng"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Tạo thất bại!"
        });
    }
});
exports.createTask = createTask;
const editTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const body = req.body;
        yield task_model_1.default.updateOne({ _id: id }, body);
        res.json({
            code: 200,
            message: "Sửa công việc thành công"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Sửa thất bại!"
        });
    }
});
exports.editTask = editTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({ _id: id }, { deleted: true });
        res.json({
            code: 200,
            message: "Xóa công việc thành công"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Xóa thất bại!"
        });
    }
});
exports.deleteTask = deleteTask;
