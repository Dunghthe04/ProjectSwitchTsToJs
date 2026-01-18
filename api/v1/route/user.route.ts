
import express,{Router} from "express"
import * as controller from "../controller/user.controller"

const router: Router=express.Router();

router.post('/register',controller.register)

export const userRouter: Router= router