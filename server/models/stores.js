const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const storeScheme = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    trim: true,
  },
  number: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isNumber(value)) {
        throw new Error("Invalid Number.");
      }
    },
  },
  code: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: false,
      },
    },
  ],
});

// Hashing Passwords

storeScheme.pre(
  "save",
  (next = async () => {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
      console.log(this.password);
    }
    next();
  })
);

storeScheme.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token });
    await this.save();
  } catch (error) {
    console.log(`Failed to generate token --> ${error}`);
  }
};

storeScheme.methods.deleteToken = async (authToken) => {
  this.tokens = this.tokens.filter((currentToken) => {
    return currentToken != authToken;
  });
  await this.save();
  return authToken;
};

const Store = mongoose.model("STORE", storeScheme);
module.exports = Store;
