const router = require("express").Router();
const db = require("mongoose");
const Users = require("../../model/user");

// get all users
router.get("/", (req, res) => {
  try {
    //set the db findAll method to a user.
    Users.find()
      .populate("thoughts")
      .populate("friends")
      .then((users) => {
        if (!users) {
          res.status(404).json({ message: "Hmm... seem no users here " });
          return;
        }
        res.status(200).json(users);
      });
    // respond with the data
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get a specific user
router.get("/:id", (req, res) => {
  try {
    //set the db findOne method to a user.
    Users.findOne({ _id: req.params.id })
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((users) => {
        if (!users) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.status(200).json(users);
      });
  } catch (err) {
    console.error(err);

    res.status(500).json(err);
  }
});

// delete a specific user
router.delete("/:id", (req, res) => {
  try {
    //set the db findOne method to a user.
    Users.findOneAndDelete({ _id: req.params.id }).then((user) => {
      if (!user) {
        res.status(404).json({
          message: "No user to purge",
        });
      }
      res.status(200).json({
        message: "deleted successfully.",
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new user
router.post("/", async (req, res) => {
  try {
    // Users.create
    const newUser = await Users.create(req.body);

    res.status(201).json(newUser);
  } catch (err) {
    console.log("Uh oh server..", err);
    res.status(500).json(err);
  }
});

//update a user
router.put("/:id", (req, res) => {
  try {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    }).then((user) => {
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.status(200).json(user);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// create a new friend
router.post("/:id/friends/:friendId", (req, res) => {
  try {
    // Users.findOneAndUpdate

    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    ).then((user) => {
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.status(200).json(user);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
