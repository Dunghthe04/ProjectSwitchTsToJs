import express,{Express, Request, Response} from "express";// import hàm express và các kiểu từ express
import dotenv from "dotenv"
import * as database from "./config/database"
import indexRouter from "./api/v1/route/index.route";

dotenv.config();
database.connect()

const app: Express= express();// APP  phải là 1  Express application
const port: number| string=process.env.PORT || 3000

indexRouter(app)

app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})