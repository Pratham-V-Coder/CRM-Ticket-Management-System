import { userSchema } from "./userSchema.js";
import mongoose from "mongoose";

const UserModel = mongoose.model("User", userSchema);

const insertUser = (userObj) => {
  return new Promise((resolve, reject) => {
    new UserModel(userObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (!email) {
      return reject("Email is required");
    }
    try {
      UserModel.findOne({ email })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getUserById = (_id) => {
  return new Promise((resolve, reject) => {
    if (!_id) {
      return reject("Id is required");
    }
    try {
      UserModel.findOne({ _id })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const storeUserRefreshJWT = (_id, token) => {
  return new Promise((resolve, reject) => {
    try {
      UserModel.findOneAndUpdate(
        { _id },
        {
          $set: {
            "refreshJWT.token": token,
            "refreshJWT.addedAt": Date.now(),
          },
        },
        { new: true },
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const updatePassword = (email, newHashedPass) => {
  return new Promise((resolve, reject) => {
    try {
      UserModel.findOneAndUpdate(
        { email },
        {
          $set: {
            password: newHashedPass,
          },
        },
        { new: true },
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

// Sabhi users ki list (password aur refreshJWT hide)
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    try {
      UserModel.find({}, { password: 0, refreshJWT: 0 })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

// User ko active/inactive karo
const updateUserStatus = (_id, isActive) => {
  return new Promise((resolve, reject) => {
    try {
      UserModel.findOneAndUpdate({ _id }, { $set: { isActive } }, { new: true })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

export {
  insertUser,
  getUserByEmail,
  getUserById,
  storeUserRefreshJWT,
  updatePassword,
  getAllUsers,
  updateUserStatus,
};
