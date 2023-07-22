/**
 * Controller for Signup a New user
 */

import User from "../Models/user.schema.js"

import asyncHandler from "../service/asyncHandler";
import CustomError from "../utils/CustomError";

export const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true
}

export const signUp = asyncHandler(async (req, res) => {
    // Get data from user
    const { name, email, password } = req.body
    // validation
    if (!name || !email || !password) {
        throw new CustomError("Please add all fields", 400)
        // throw new Error("Got an error") -  We are using customError
    }

    // Now add this user data to database

    // First check if user already exists
    const exitingUser = await User.findOne({ email })
    if (exitingUser) {
        throw new CustomError("User already exists", 400)
    }
    // Add user data
    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.getJWTtoken()
    // safety 
    user.password = undefined;

    // store this token in user's cookie
    res.cookie("token", token, cookieOptions)


    res.status(200).json({
        success: true,
        token,
        user,
    })
})