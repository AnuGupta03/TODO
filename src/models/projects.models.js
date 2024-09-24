import mongoose from "mongoose";
const projectsSchema = new mongoose.Schema(
    {
        owner:[{
            type: mongoose.ObjectId,
            ref:'Users',
         }],
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        state:{
            type:String,
            required:true
        },
        admin:[{
            type: mongoose.ObjectId,
            ref:'Users',
         }],
         tasks:[{
            type: mongoose.ObjectId,
            ref:'Tasks'
         }],
        members:[{
            type : mongoose.ObjectId, 
            ref: 'Users'  
        }]
    },{timestamps:true}
)

export const projects = mongoose.models.projects || mongoose.model("projects", projectsSchema)
