const mongoose= require("mongoose");

// Defining Schema
const userSchema= new mongoose.Schema({

    userId: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        max: 500,
      },
      img: {
        type: String,
      },
      likes: {
        type: Array,
        default: [],
      },

},
{timestamps: true}
)

// Model
const PostModel= mongoose.model("Post",userSchema);

module.exports= PostModel;