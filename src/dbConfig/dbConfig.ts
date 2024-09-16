import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('connected', () =>{
            console.log('MongoDB connected');
        })
        connection.on('error', (err) => {
            console.log('Mongodb connection error, please make sure db is up and running.' + err);   
            process.exit()      
        })

    } catch(error){
        console.log("Something went wrong in connecting to DB");
        console.log(error);
        
    }
}

// import mongoose from "mongoose";

// type ConnectionObject = {
//     isConnected?: number
// }

// const connection: ConnectionObject = {}

// async function dbConnect() : Promise<void>  {
//     if(connection.isConnected){
//         console.log("Already Connected to database");    
//         return    
//     } 

//     try{
//         const db = await mongoose.connect(process.env.MONGODB_URI || "", {})
//         connection.isConnected = db.connections[0].readyState
//         console.log("DB Connected Successfully");
        
//     } catch(error){
//         console.log("Database Connection failed", error);
        
//         process.exit(1)
//     }
// }
// export default dbConnect;