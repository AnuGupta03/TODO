import Projects  from "@/models/projects.models";
import mongoose from "mongoose";
type project = {
    id: string
    title: string
    desc: string
    date: Date;
}
let projects: project[] = [];

// handlers
export const getProjects = async () => {
    try{
        const products = await Projects.find({});
        console.log(products);
        return products
    } catch (error) {
        console.log(error);        
    }
};

export const addProject = (project: project) =>{
    projects.push(project);
}

export const deleteProject = (id: string) =>{
    projects = projects.filter((project)=>project.id !== id);
}

export const updateProject = (id: string, title:string, desc:string) =>{
    const project = projects.find((project) => project.id === id)
    if(project){
        project.title = title;
        project.desc = desc;
    } else {
        throw new Error("No project Found")
    }
};

export const getProjectByid = (id:string) =>{
    return projects.find((project) => project.id === id);
};
