import mongoose from "mongoose";
import { adminSchema } from "./adminSchema.js";

const AdminModel = mongoose.model("Admin", adminSchema);

const insertAdmin = (adminObj) => {
  return new Promise((resolve, reject) => {
    new AdminModel(adminObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getAdminByEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (!email) return reject("Email is required");
    AdminModel.findOne({ email })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getAdminById = (_id) => {
  return new Promise((resolve, reject) => {
    if (!_id) return reject("Id is required");
    AdminModel.findOne({ _id })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const storeAdminRefreshJWT = (_id, token) => {
  return new Promise((resolve, reject) => {
    AdminModel.findOneAndUpdate(
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
  });
};

const updateAdminPassword = (email, newHashedPass) => {
  return new Promise((resolve, reject) => {
    AdminModel.findOneAndUpdate(
      { email },
      { $set: { password: newHashedPass } },
      { new: true },
    )
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export {
  insertAdmin,
  getAdminByEmail,
  getAdminById,
  storeAdminRefreshJWT,
  updateAdminPassword,
};
