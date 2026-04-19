import mongoose from "mongoose";
import userModel from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

// Helper function to build the URI from your 3 variables
function getMongoURI(dbname) {
  let connection_string = `mongodb://localhost:27017/${dbname}`;
  const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER } = process.env;

  if (MONGO_USER && MONGO_PWD && MONGO_CLUSTER) {
    // This builds the Atlas SRV string
    connection_string = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${dbname}?retryWrites=true&w=majority`;
  }
  return connection_string;
}

mongoose.set("debug", true);

// Connect using the helper function
mongoose
  .connect(getMongoURI("users"))
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