const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  content: { type: String, required: true },
  username: { type: String, required: true },
  lastAccessed: { type: Date, default: Date.now },
});
// pass the schema to the model
const Reactions = model("Reactions", reactionSchema);
export default Reactions;
