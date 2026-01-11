import {taskRouter} from "../route/task.route"

const indexRouter = (app) => {
    const version="/api/v1"
    app.use(`${version}/tasks`, taskRouter)
}
export default indexRouter