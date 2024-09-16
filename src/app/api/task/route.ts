import { addProject, getProjects } from "@/lib/data";
import { NextResponse} from "next/server";

export const GET = async(req:Request, res:Response)=>{
    try{
        const tasks = getProjects();
        return NextResponse.json({message:"OK", status: 200})
    } catch(err){
        return NextResponse.json(
            {message:"Error", err},
            {
                status: 500,
            }
        );
    }
};

export const POST = async(req:Request, res:Response) =>{
    const {title, desc} = await req.json()
    try {
        const task = {title, desc, date:new Date(),id:Date.now().toString()};
        addProject(task);
        return NextResponse.json({message:"OK", task}, {status:201});

    } catch (err) {
        return NextResponse.json({message:"Error", err},
            {status: 500}
        );
    };
}