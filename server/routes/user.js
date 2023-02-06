import express from express;
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/user.js";

import {verifyToken } from '../middleware/auth.js'
import { get } from "mongoose";
const router = express.Router();

// Reading users
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

// update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend)
export default router;