import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";
import { get } from "mongoose";
const router = express.Router();

// get all ussers
router.get("/user", verifyToken, getUser);
// get specific user
router.get("/:id", verifyToken, getUser);
// get user specific friends
router.get("/:id/friends", verifyToken, getUserFriends);

// update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
export default router;
