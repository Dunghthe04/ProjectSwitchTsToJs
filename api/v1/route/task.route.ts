
import express,{Router} from "express"
import * as controller from "../controller/task.controller"

const router: Router=express.Router();

router.get('/',controller.index)
router.get('/detail/:id',controller.detail)
router.get('/change-status/:id',controller.changeStatus)


export const taskRouter: Router= router