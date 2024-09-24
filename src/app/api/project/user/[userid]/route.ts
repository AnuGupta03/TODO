import { deleteProject, getProjectByid, updateProject } from "@/lib/data";
import { NextResponse } from "next/server";

export const GET = async(req:Request, res:Response) =>{
    try {
        const id = req.url.split("project/")[1];
        console.log(id);
        
        const post = getProjectByid(id);
        if(!post){
            return NextResponse.json({message:"ERROR"},{status: 404});
        } 
        return NextResponse.json({message:"OK", post},{status: 200});
    } catch (err) {
        return NextResponse.json({message:"OK", err},{status: 500});
    }
};