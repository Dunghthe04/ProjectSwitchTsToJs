import {taskRouter} from "../route/task.route"
import {userRouter} from "../route/user.route"
import requireAuthen from "../../../middleware/auth.middleware"
const indexRouter = (app) => {
    const version="/api/v1"
    app.use(`${version}/tasks`, requireAuthen,taskRouter)
    app.use(`${version}/users`, userRouter)
}
export default indexRouter