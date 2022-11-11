const db = require("../config/connection");
const { User, Thought } = require("../model");

db.on("error", (err) => console.error(err));

db.once("open", async () => {
  console.log("connected");

  // Drop existing courses
  await User.deleteMany({});
  await Thought.deleteMany({});

  const users = [];
  const thoughts = [];

  await User.collection.insertMany(users);
  await Thoughts.collection.insertMany(thoughts);

  console.info("Seeding complete! 🌱");
  process.exit(0);
});
