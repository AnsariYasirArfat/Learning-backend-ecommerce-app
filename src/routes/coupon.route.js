import { Router } from "express"
import { createCoupon, deleteCoupon, getAllCoupon, updateCoupon } from "../controllers/coupon.controller.js"
import { authorize, isLoggedIn } from "../middlewares/auth.middleware.js"
import AuthRoles from "../utils/authRoles.js"

const router = Router()

router.post("/", isLoggedIn, authorize(AuthRoles.ADMIN), createCoupon)

router.delete("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), deleteCoupon)

// delete a single collection
router.put("/action/:id", isLoggedIn, authorize(AuthRoles.ADMIN), updateCoupon)

//Get all Collection
router.get("/", isLoggedIn, authorize(AuthRoles.ADMIN), getAllCoupon)

export default router;