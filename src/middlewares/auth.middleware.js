import User from "../Models/user.schema.js"
import JWT from "jsonwebtoken"
import asyncHandler from "../service/asyncHandler.js"
import config from "../config/index.js"
import CustomError from "../utils/CustomError.js"

export const isLoggedIn = asyncHandler(async (req, res, next) => {
    let token;

    if (req.cookies.token || (req.header.authorization && req.header.authorization.startsWith("Bearer"))) {
        token = req.cookies.token || req.header.authorization.split(" ")[1] // authoriztion = "Bearer <token string>"
    }
    if (!token) {
        throw new CustomError("Not authorized to access this resource", 401)
    }

    try {
        const decodedJWTPayload = JWT.verify(token, config.JWT_SECRET)
        req.user = await User.findById(decodedJWTPayload._id, "name email role")
        next()
    } catch (error) {
        throw new CustomError("Not authorized to access this resource", 401)
    }
})

export const authorize = (...requiredRoles)=> asyncHandler(async (req, res , next) =>{
if(!requiredRoles.includes(req.user.role)){
    throw new CustomError("You are not authorized to access this resource", 401)
}
next()
})