import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: [true, "Please Provide a username"],
        },
        email:{
            type: String,
            required: [true, "Please Provide an email"],
            unique: true,
            lowerCase: true
        },
        password:{
            type: String,
            required:[true, "Please Provide a password"],
        },  
        isVerified:{
            type: Boolean,
            default: false
        },   
        isAdmin:{
            type: Boolean,
            default: false
        },      
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date
    }, {timestamps: true}
)

const User = mongoose.models.Users || mongoose.model("Users", userSchema)
export default User