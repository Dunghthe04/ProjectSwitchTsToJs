//tao ra de luu otp, expireAt se xoa ban ghi dua vao thoi gian
import mongoose from "mongoose";
const forgotPasswordSchema=new mongoose.Schema(
    {
        email:String,
        otp: String,
        expireAt:{
            type: Date,
            expire: 0// quy uoc la giay
        }
    },{timestamps: true}
)
const forgotpassword= mongoose.model("Forgotpassword",forgotPasswordSchema,"forgotpassword")
export default forgotpassword