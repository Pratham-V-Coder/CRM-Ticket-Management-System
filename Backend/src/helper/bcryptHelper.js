import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = (plainPassword) => {
  return bcrypt.hash(plainPassword, saltRounds); // ✅ Already returns Promise, no need to wrap
};

const comparePassword = (plainPassword, passFromDb) => {
  return bcrypt.compare(plainPassword, passFromDb); // ✅ Already returns Promise, no need to wrap
};

export { hashPassword, comparePassword }; // ✅ Added comparePassword to export
