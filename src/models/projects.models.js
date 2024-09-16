import mongoose from "mongoose";
const projectsSchema = new mongoose.Schema(
    {
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
            type: ObjectId,
            ref:'Users',
         }],
         tasks:[{
            type:ObjectId,
            ref:'Tasks'
         }],
        createdAt:{
            type:timestamp,
            required:true
        },
        members:[{
            type : ObjectId, 
            ref: 'Users'  
        }]
    },{timestamps:true}
)
export const projects = mongoose.model("Projects", projectsSchema);