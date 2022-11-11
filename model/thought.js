const { Schema, model } = require("mongoose");
const { reactionSchema } = require("./reaction");
// create a thought schema for model
const thoughtSchema = new Schema(
  {
    content: { type: String, required: true, maxLength: 280, minLength: 1 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: { type: [reactionSchema] },
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
thoughtSchema.virtual("thoughtCount").get(function () {
  return `${this.reactions.count}`;
});
// pass the schema to the model
const Thoughts = model("Thoughts", thoughtSchema);

module.exports = Thoughts;
