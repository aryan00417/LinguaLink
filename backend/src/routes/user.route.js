import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { acceptFriendRequest, getMyFriends, getRecommendedUsers, sendFriendRequest } from "../controllers/user.controller.js"

const router = express.Router()

//apply this protect route(verify token) for all the routes
router.use(protectRoute)

router.get("/",getRecommendedUsers)
router.get("/friends",getMyFriends)
router.post("/friend-request/:id",sendFriendRequest)
router.post("/friend-request/:id/accept",acceptFriendRequest)

export default router