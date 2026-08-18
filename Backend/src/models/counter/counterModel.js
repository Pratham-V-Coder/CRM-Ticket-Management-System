// Backend/src/models/counter/counterModel.js

import CounterSchema from "./counterSchema.js";

const getNextSequence = (name) => {
  return new Promise((resolve, reject) => {
    try {
      CounterSchema.findOneAndUpdate(
        { name },
        { $inc: { seq: 1 } },
        { new: true, upsert: true },
      )
        .then((data) => resolve(data.seq))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

export { getNextSequence };
