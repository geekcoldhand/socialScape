const router = require("express").Router();
const db = require("mongoose");
const Users = require("../../model/user");

router.get("/", (req, res) => {
  try {
    //set the db findAll method to a user.
    Users.find().then((users) => {
      if (!users) {
        res.status(404).json({ message: "Hmm... seem no users here " });
        return;
      }
      res.status(200).json(users);
    });
    // respond with the data
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", (req, res) => {
  try {
    //set the db findOne method to a user.
    Users.findOne({ _id: req.params.id }).then((users) => {
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

module.exports = router;
