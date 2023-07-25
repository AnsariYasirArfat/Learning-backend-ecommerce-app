import { Router } from "express";
import { generateOrder, generateRazorpayOrderId, getAllOrders, getMyOrders, updateOrderStatus } from "../controllers/order.controller.js";
import {  isLoggedIn, authorize } from "../middlewares/auth.middleware";
import AuthRoles from "../utils/authRoles.js";



const router = Router()
//Todo: add all routes here

router.post("/razorpay", isLoggedIn, generateRazorpayOrderId)

router.post("/", isLoggedIn, generateOrder)

router.get("/myorder", isLoggedIn, getMyOrders)

router.get("/allorder", isLoggedIn, authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR), getAllOrders)

router.put("/orderstatus", isLoggedIn, authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR), updateOrderStatus)

export default router;