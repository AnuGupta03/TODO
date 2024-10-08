import mongoose from "mongoose";
const tasksSchema = new mongoose.Schema(
    {
        state:{
            type:String,
            required:true,
        },
        taskname:{
            type:String,
            required:true,
        },
        assignee:{
            type:String,
            required:true
        },
        createdBy:{
            type: mongoose.ObjectId,
            ref: 'Users',
            required:true
         }  
    },{timestamps:true}
)
export const tasks = mongoose.model("Tasks", tasksSchema);