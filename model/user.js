const { Schema, model } = require("mongoose");
// create a user schema for the model
const userSchema = new Schema(
  {
    username: { type: String, required: true, maxLength: 50 },
    email: {
      type: String,
      required: true,
      validate: {
        validator: () => Promise.resolve(false),
        message: "Email validation failed",
      },
    },
    thoughts: [{ type: String }],
    friends: [{ type: String }],
    lastAccessed: { type: Date, default: Date.now },
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
userSchema.virtual("friendCount").get(function () {
  console.log("here is friends array", this);
  return `${this.friends.length}`;
});

// pass the schema to the model
const Users = model("Users", userSchema);

module.exports = Users;
