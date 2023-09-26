const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testcaseSchema = new Schema({
  //   problemId: { type: mongoose.Types.ObjectId, ref: "Problem" },
  testcases: { type: String },
});

module.exports = mongoose.model("TestCase", testcaseSchema);
