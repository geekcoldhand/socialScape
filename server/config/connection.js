import mongoose from "mongoose";

export default function connection() {
  console.log("in conn fx");
  mongoose.connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/scape", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  return db;
}

// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("Connected to MongoDB");
// });

// module.exports = db;
