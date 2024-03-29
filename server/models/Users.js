// const { Schema, model, default: mongoose } = require("mongoose");
import {Schema, model} from "mongoose";
// create a user schema for the model
 const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
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
    picturePath: {
      type: String,
      default: "",
    },
    lastAccessed: { type: Date, default: Date.now },
    communities: {
      type: Array,
      default: []
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
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

export default  Users;
