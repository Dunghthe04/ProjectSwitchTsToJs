import Task from "../models/task.model"
import paginationHelpers from "../../../helpers/pagination"
import searchHelpers from "../../../helpers/search"
import { Request, Response } from "express"

//[GET] /api/v1/tasks
export const index = async (req: Request, res: Response) => {
    try {
        interface find {
            deleted: boolean,
            status?: string,
            title?: RegExp
        }
        const find: find = {
            deleted: false
        }
        //Lọc trạng thái
        if (req.query.status) {
            find.status = req.query.status.toString()
        }
        //sắp xếp
        const sort = {};
        if (req.query.sortKey && req.query.sortValue) {
            const sortKey = req.query.sortKey.toString()
            sort[sortKey] = req.query.sortValue;
        }
        //phân trang
        const countRecords = await Task.countDocuments(find);
        const limitNumber = req.query.limit?.toString();
        let initPagination = {
            limit: 2,
            currentPage: 1
        }

        if (limitNumber) {
            initPagination.limit = parseInt(limitNumber)
        }

        let pagination = paginationHelpers(initPagination, req.query, countRecords)
        //tìm kiếm
        let objectSearch = searchHelpers(req.query);

        if (objectSearch.regex) {
            find.title = objectSearch.regex
        }

        console.log("find", find);


        const tasks = await Task.find(find).sort(sort).limit(pagination.limit).skip(pagination.skip)
        res.json(tasks)
    } catch (error) {
        res.json("Không có dữ liệu")
    }
}

//[GET] /api/v1/detail/:id
export const detail = async (req: Request, res: Response) => {
    try {
        //lay id dong
        const id: string = req.params.id.toString();
        const task = await Task.find({
            deleted: false,
            _id: id
        });
        res.json(task)
    } catch (error) {
        res.json("Không có dữ liệu")
    }
}


//[PATCH] /api/v1/changeStatus/:id
export const changeStatus = async (req: Request, res: Response) => {
    try {
        ///lay id muuon change
        const id: string = req.params.id.toString();

        //lay ca body front end gui len
        const body = req.body;
        const statusNew: string = body.status;

        await Task.updateOne({
            _id: id
        }, { status: statusNew })
        res.json({
            code: 200,
            message: "Cập nhập trạng thái thành công"
        })

    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại!"
        })
    }
}

//[PATCH] /api/v1/changeMulti
export const changeMulti = async (req: Request, res: Response) => {
    try {
        const { ids, key, value } = req.body;
        enum option {
            STATUS = "status"
        }
        switch (key) {
            case option.STATUS:
                await Task.updateMany({ _id: { $in: ids } }, { status: value })
                res.json({
                    code: 200,
                    message: "Cập nhập trạng thái thành công"
                })
                break;

            default:
                break;
        }

    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại!"
        })
    }
}


//[POST] /api/v1/createTask
export const createTask = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const newTask = new Task(body);
        await newTask.save();
        res.json({
            code: 200,
            message: "Thêm mới thành cồng"
        })


    } catch (error) {
        res.json({
            code: 400,
            message: "Tạo thất bại!"
        })
    }
}


//[PATCH] /api/v1/editTask
export const editTask = async (req: Request, res: Response) => {
    try {
        const id=req.params.id;
        const body = req.body;
        await Task.updateOne({_id: id},body)
        res.json({
            code: 200,
            message: "Sửa công việc thành công"
        })


    } catch (error) {
        res.json({
            code: 400,
            message: "Sửa thất bại!"
        })
    }
}
