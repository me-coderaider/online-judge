const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const problemSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    testcasesInput: { type: String, required: true },
    testcasesOutput: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// model method takes 2 parameter, first : collection name, 2nd schema for it
module.exports = mongoose.model("Problem", problemSchema);
