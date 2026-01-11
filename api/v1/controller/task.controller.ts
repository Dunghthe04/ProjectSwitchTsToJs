import Task from "../models/task.model"

//[GET] /api/v1/tasks
export const index = async (req, res) => {
    try {
        const tasks= await Task.find({deleted: false})
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

