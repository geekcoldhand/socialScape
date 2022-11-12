const db = require("../config/connection");
const userDb = require("../model");
const { userSeeds, thoughtSeeds } = require("./data");

db.on("error", (err) => console.error(err));

db.once("open", async () => {
  console.log("connected");

  // Drop existing courses
  await userDb.user.deleteMany({});
  await userDb.thoughts.deleteMany({});

  const users = userSeeds;
  const thoughts = thoughtSeeds;

  await userDb.user.collection.insertMany(users);
  await userDb.thoughts.collection.insertMany(thoughts);

  console.info("Seeding complete! 🌱");
  process.exit(0);
});
