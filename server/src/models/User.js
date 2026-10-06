import mongoose from "mongoose";
import "./Profile.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      default: "citizen",
    },

    isDemoUser: {
      type: Boolean,
      default: false,
    },

    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;