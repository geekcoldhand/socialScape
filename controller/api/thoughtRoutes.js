const router = require("express").Router();
const db = require("mongoose");
const Thoughts = require("../../model/thought");

router.get("/", (req, res) => {
  try {
    //set the db findAll method to a getThought.
    Thoughts.find().then((thoughts) => {
      if (!thoughts) {
        res.status(404).json({ message: "Hmm... seem no thoughts here " });
        return;
      }
      res.status(200).json(thoughts);
    });
    // respond with the data
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", (req, res) => {
  try {
    //set the db findOne method to a getThought.
    Thoughts.findOne({ _id: req.params.id })
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.status(200).json(thought);
      });
  } catch (err) {
    console.error(err);

    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  try {
    //set the db findOne method to a thoughtData.
    Thoughts.findOneAndDelete({ _id: req.params.id }).then((thought) => {
      if (!thought) {
        res.status(404).json({
          message: "No thoughts to purge",
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
