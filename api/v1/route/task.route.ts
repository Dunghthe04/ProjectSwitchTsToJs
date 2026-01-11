
import express,{Router} from "express"
import * as controller from "../controller/task.controller"

const router: Router=express.Router();

router.get('/',controller.index)
router.get('/detail/:id',controller.detail)


export const taskRouter: Router= router