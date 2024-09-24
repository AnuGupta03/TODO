import { getDataFromToken } from "@/helpers/getDataFromToken";
import { addProject, getProjects } from "@/lib/data";
import connectToDatabase from "@/lib/db";
import { projects } from "@/models/projects.models";
import { NextRequest, NextResponse } from "next/server";

// Handler for GET requests
export const GET = async (req: NextRequest) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch projects
    const posts = await getProjects();
    return NextResponse.json({ message: "OK", posts }, { status: 200 });
  } catch (err) {
    // Handle errors and send a response
    return NextResponse.json(
      { message: "Error", err},
      { status: 500 }
    );
  }
};

// Handler for POST requests
export const POST = async (req: NextRequest) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const { name, description } = await req.json();
    const userId = await getDataFromToken(req)
    console.log(name, description, userId);
    


    // Validate required fields
    if (!name || !description) {
      return NextResponse.json(
        { message: "Name and description are required" },
        { status: 400 }
      );
    }

    // Create a new project instance
    const newProject = new projects({ name, description, owner: userId, state: "active" });
    console.log(newProject);
    
    // Save the project to the database
    await newProject.save();

    // Send success response
    return NextResponse.json(
      { message: "Project Created Successfully", project: newProject },
      { status: 201 }
    );
  } catch (error) {
    // Handle errors and send a response
    console.log(error);
    
    return NextResponse.json(
      { message: "Error Creating Project", error},
      { status: 500 }
    );
  }
};
