import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
      default: "/images/profile.avif",
    },
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

export default User;
