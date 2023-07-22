import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js"
import bcrypt from "bcryptjs"

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

/**
 * Encryption of  the password before saving 
 */
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next;
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// Methods for userSchema
userSchema.method ={
    // compare password 
    comparePassword: async function(enterPassword){
       return await bcrypt.compare(enterPassword, this.password)
    }
}



export default mongoose.model("User", userSchema)