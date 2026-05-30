const randomPinNumber = (length) => {
  // ✅ Fixed: Length → length (case sensitive)
  let pin = "";

  for (let i = 0; i < length; i++) {
    pin += Math.floor(Math.random() * 10);
  }
  return pin;
};

export { randomPinNumber }; // ✅ Fixed: module.exports → export
