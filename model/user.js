const { Schema, model } = require("mongoose");
// create a user schema for the model
const userSchema = new Schema(
  {
    username: { type: String, required: true, maxLength: 50 },
    email: {
      type: String,
      required: true,
      validate: {
        validator: () =>
          function (email) {
            var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return re.test(email);
          },
      },
    },
    password: { type: String, required: true },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thoughts" }],
    friends: [{ type: Object }],
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
