import randomToken from "../../../helpers/randomToken";
import User from "../models/user.model"
import { Request, Response } from "express"
import md5 from "md5";
//[POST] /api/v1/user/register
export const register = async (req: Request, res: Response) => {
    //lấy body bên front end gửi lên
    const body = req.body;

    //check xem email đã tồn tại chưa
    const userExist = await User.findOne({
        email: body.email
    })

    if (userExist) {
        res.json({
            code: 400,
            message: "Email đã tồn tại"
        })
    } else {
        body.password = md5(body.password);
        const newUser = new User({
            fullname: body.fullname,
            email: body.email,
            password: body.password,
            token: randomToken(20)
        });
        newUser.save();

        //lưu token vào cookie luôn
        const token = newUser.token;
        res.cookie("token", token)

        res.json({
            code: 200,
            message: "Đăng kí thành công",
            token: token
        })
    }
}