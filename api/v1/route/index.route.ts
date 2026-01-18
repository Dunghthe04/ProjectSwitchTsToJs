import {taskRouter} from "../route/task.route"
import {userRouter} from "../route/user.route"

const indexRouter = (app) => {
    const version="/api/v1"
    app.use(`${version}/tasks`, taskRouter)
    app.use(`${version}/users`, userRouter)
}
export default indexRouter