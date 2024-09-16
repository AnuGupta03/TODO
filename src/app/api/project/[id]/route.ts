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

export const PUT = async(req:Request, res:Response) =>{
    try {
        const {title, desc} = await req.json(); 
        const id = req.url.split("project/")[1];
        updateProject(id, title, desc);
        return NextResponse.json({message:"OK"},{status:200});
    } catch (err) {
        return NextResponse.json({message:"OK", err},{status: 500});
        
    }
};

export const DELETE = async(req:Request, res:Response) =>{
    try {
        const id = req.url.split("project/")[1];
        deleteProject(id);
        return NextResponse.json({message:"OK"},{status:200});
    } catch (err) {
        return NextResponse.json({message:"OK", err},{status: 500});
        
    }
};

