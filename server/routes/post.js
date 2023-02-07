import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/post.js";
import { veriftyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", veriftyToken, getFeedPosts);
router.get('/:userId/posts', veriftyToken, getUserPosts)


router.patch('./:id/like', veriftyToken, likePost)

export default router;