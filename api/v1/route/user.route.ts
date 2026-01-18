
import express,{Router} from "express"
import * as controller from "../controller/user.controller"
import requireAuthen from "../../../middleware/auth.middleware"

const router: Router=express.Router();

router.post('/register',controller.register)
router.get('/login',controller.login)
router.get('/profileDetail',requireAuthen,controller.profileDetail)

export const userRouter: Router= router