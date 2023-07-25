import { Router } from "express"
import { createCollection, deleteCollection, getAllCollection, updateCollection } from "../controllers/collection.controller.js"
import { authorize, isLoggedIn } from "../middlewares/auth.middleware.js"
import AuthRoles from "../utils/authRoles.js"

const router = Router()

router.post("/", isLoggedIn, authorize(AuthRoles.ADMIN), createCollection)

router.delete("/:id", isLoggedIn, authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR), deleteCollection)

router.put("/action/:id", isLoggedIn, authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR), updateCollection)

router.get("/", isLoggedIn, authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR), getAllCollection)

export default router;












