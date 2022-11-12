const router = require("express").Router();
const db = require("mongoose");
const Thoughts = require("../../model/thought");

// get all thoughts
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

// get specific thought
router.get("/:id", (req, res) => {
  try {
    //set the db findOne method to a getThought.
    Thoughts.findOne({ _id: req.params.id }).then((thought) => {
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

// delete a specifc thought
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

// create a new thought
router.post("/", (req, res) => {
  try {
    // Thoughts.create
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        console.log("user created", user);
        if (!user) {
          return res.status(404).json({ message: "No user with this id!" });
        }

        res.status(201).json({ message: "Thought sucessfully created!" });
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

//update thought
router.put("/:id", (req, res) => {
  try {
    Thoughts.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    }).then((thought) => {
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.status(200).json(thought);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// create a new reaction
router.post("/:id/reactions", (req, res) => {
  try {
    // Thoguths.findOneAndUpdate
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    ).then((thought) => {
      if (!thought) {
        res.status(404).json({ message: "No thought found with this ID!" });
      }
      res.status(201).json({
        message: "Success",
        thought,
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a reaction
module.exports = router;
