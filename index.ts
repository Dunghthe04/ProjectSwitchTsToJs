import express,{Express, Request, Response} from "express";// import hàm express và các kiểu từ express
import dotenv from "dotenv"
import * as database from "./config/database"
import Task from "./models/task.model";

dotenv.config();
database.connect()

const app: Express= express();// APP  phải là 1  Express application
const port: number| string=process.env.PORT || 3000

app.get("/tasks",async(req: Request,res: Response) =>{
   const tasks= await Task.find({
    deleted: false
   })
   res.send(tasks)
})

app.get("/tasks/detail/:id",async(req: Request,res: Response) =>{
   const id=req.params.id;
   const taskDetail= await Task.findOne({_id: id},{deleted: false})
   res.send(taskDetail)
})

app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})