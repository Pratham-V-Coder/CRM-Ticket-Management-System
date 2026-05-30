import { randomPinNumber } from "../../utils/randomGenerator.js";
import { ResetPinModel } from "./ResetPinSchema.js"; // ✅ Fixed: ResetPinSchema → ResetPinModel

const setPasswordResetPin = async (email) => {
  const pinLength = 6;
  const randPin = randomPinNumber(pinLength); // ✅ Fixed: await not needed, added pinLength argument
  const resetObj = {
    email,
    pin: randPin,
  };
  return new Promise((resolve, reject) => {
    new ResetPinModel(resetObj) // ✅ Fixed: ResetPinSchema → ResetPinModel, userObj → resetObj, added new
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getPinByEmailPin = (email, pin) => {
  // ✅ Fixed: getPinEmailPin → getPinByEmailPin
  return new Promise((resolve, reject) => {
    // ✅ Fixed: Project → Promise
    try {
      ResetPinModel.findOne({ email, pin }, (error, data) => {
        // ✅ Fixed: ResetPinSchema → ResetPinModel
        if (error) {
          console.log(error);
          return reject(error); // ✅ Fixed: resolve(false) → reject(error)
        }
        resolve(data);
      });
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
};

const deletePin = (email, pin) => {
  return new Promise((resolve, reject) => {
    // ✅ Fixed: missing Promise wrapper
    try {
      ResetPinModel.findOneAndDelete({ email, pin }, (error, data) => {
        // ✅ Fixed: ResetPinSchema → ResetPinModel
        if (error) {
          console.log(error);
          return reject(error); // ✅ Fixed: missing reject
        }
        resolve(data); // ✅ Fixed: missing resolve
      });
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
};

export { setPasswordResetPin, getPinByEmailPin, deletePin };
