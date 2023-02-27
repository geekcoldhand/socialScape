import mongoose from "mongoose";

const communitySchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      users: {
        type: Array,
        default: [],
      },
      profession: {
        type: String,
        required: true,
      },
      picutePath: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
    
      location: String,
      description: String,
      picturePath: String,
      userPicturePath: String,
      likes: {
        type: Map,
        of: Boolean,
      },
      comments: {
        type: Array,
        default: [],
      },
    },
    { timestamps: true }
  );
  
  const Community = mongoose.model("Community", communitySchema);
  
  export default Post;