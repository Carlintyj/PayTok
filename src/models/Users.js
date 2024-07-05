const mongoose = require("mongoose");
const cryptoJs = require("crypto-js");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  uid: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  pin: { type: String },
  role: { type: String, enum: ["user", "agent"], default: "user" },
  account: { type: Number, unique: true },
  balance: { type: Number, default: "0" },
});

async function generateUniqueAccountNumber() {
  let accountNumber;
  let user;

  do {
    accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000; // Generate a 10-digit random number
    user = await mongoose
      .model("User")
      .findOne({ accountNumber: accountNumber.toString() });
  } while (user);

  return accountNumber.toString();
}

UserSchema.pre("save", async function (next) {
  if (this.isModified("pin")) {
    try {
      if (this.pin) {
        const hash = cryptoJs.SHA256(this.pin).toString(cryptoJs.enc.Hex);
        this.pin = hash;
      }
    } catch (error) {
      next(error);
    }
  }

  // Set a unique account number
  if (this.isNew) {
    try {
      this.account = await generateUniqueAccountNumber();
    } catch (err) {
      return next(err);
    }
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
