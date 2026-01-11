import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    token:String,
    deletedAt: Date
},{timestamps: true})

const User=mongoose.model("User",UserSchema,"users");
export default User