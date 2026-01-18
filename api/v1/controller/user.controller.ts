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

//[GET] /api/v1/user/login
export const login = async (req: Request, res: Response) => {
    //lay body(email+pass)
    const body = req.body;

    //kiểm tra email
    const user = await User.findOne({
        email: body.email
    })

    //nếu email chưa tồn tại
    if (!user) {
        res.json({
            code: 400,
            message: "Email không tồn tại",
        })
        return
    }

    //nếu password sai
    if (md5(body.password) != user.password) {
        res.json({
            code: 400,
            message: "Mật khẩu chưa chính xác",
        })
        return
    }

    const token = user.token;
    res.cookie("token", token)

    res.json({
        code: 200,
        message: "Đăng nhập thành công",
        token: token
    })


}

//[GET] /api/v1/user/profiledetail
export const profileDetail = async (req: Request, res: Response) => {
    //lay user tu middleware luon
    res.json({
        code: 200,
        message: "Lay thong tin thanh cong",
        info: req["user"]
    })
}

