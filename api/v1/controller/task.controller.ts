import Task from "../models/task.model"
import paginationHelpers from "../../../helpers/pagination"
import searchHelpers from "../../../helpers/search"

//[GET] /api/v1/tasks
export const index = async (req, res) => {
    try {
        interface find {
            deleted: boolean,
            status?: string
        }
        const find: find = {
            deleted: false
        }
        //Lọc trạng thái
        if (req.query.status) {
            find.status = req.query.status
        }
        //sắp xếp
        const sortKey = req.query.sortKey
        const sortValue = req.query.sortValue
        const sort = {};
        if (sortKey && sortValue) {
            sort[sortKey] = sortValue
        }
        //phân trang
        const countRecords = await Task.countDocuments(find);
        const limitNumber = req.query.limit;
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
            find["title"] = objectSearch.regex
        }

        const tasks = await Task.find(find).sort(sort).limit(pagination.limit).skip(pagination.skip)
        res.json(tasks)
    } catch (error) {
        res.json("Không có dữ liệu")
    }
}

//[GET] /api/v1/detail/:id
export const detail = async (req, res) => {
    try {
        //lay id dong
        const id = req.params.id;
        const task = await Task.find({
            deleted: false,
            _id: id
        });
        res.json(task)
    } catch (error) {
        res.json("Không có dữ liệu")
    }
}

