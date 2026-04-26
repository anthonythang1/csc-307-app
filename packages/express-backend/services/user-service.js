import mongoose from "mongoose";
import userModel from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("debug", true);

// Connect using the connection string from .env
const { MONGO_CONNECTION_STRING } = process.env;

mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then(() =>
    console.log("Connected to MongoDB Atlas successfully!")
  )
  .catch((error) => console.log("Connection Error: ", error));

// --- SERVICE STUBS ---

function getUsers(name, job) {
  if (name && job) {
    // New Task: Match both
    return userModel.find({ name: name, job: job });
  } else if (name) {
    return userModel.find({ name: name });
  } else if (job) {
    return userModel.find({ job: job });
  } else {
    return userModel.find();
  }
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  return userToAdd.save();
}

function removeUserById(id) {
  // New Task: Use findByIdAndDelete
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  removeUserById
};