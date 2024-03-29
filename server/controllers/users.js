import Users from "../models/Users.js";
import { Promise} from "mongoose";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all user friends
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstname, lastnmae, occupation, location, picutePath }) => {
        return { _id, firstname, lastnmae, occupation, location, picutePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update and remove friends
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await Users.findById(id);
    const friend = await Users.findById(friendId);

    // if they are included remove
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstname, lastnmae, occupation, location, picutePath }) => {
        return { _id, firstname, lastnmae, occupation, location, picutePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
