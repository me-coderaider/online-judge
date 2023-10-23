const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    problems: [
      { type: mongoose.Types.ObjectId, required: true, ref: "Problem" },
    ], //array means 1 user can be creator of many problems
  },
  {
    timestamps: true,
  }
);
// adding uniquevalidator to our schema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
