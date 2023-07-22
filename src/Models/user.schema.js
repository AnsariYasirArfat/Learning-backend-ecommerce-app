import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js"
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: ['true', 'Name is required'],
        maxLength: [50, 'Name must be less than 50 chars']

    },
    email: {
        type: String,
        required: ['true', 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: ['true', 'Password is required'],
        minLength: [8, 'password must be at least  8 chars'],
        select: false // i will never bring this thing (in this case password) 
    },
    role: {
        type: String,
        enum: Object.values(AuthRoles),
        default: AuthRoles.USER
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
}, { timeStamp: true })
export default mongoose.model("User", userSchema)