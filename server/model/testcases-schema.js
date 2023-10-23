const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testcaseSchema = new Schema({
  problemId: { type: mongoose.Types.ObjectId, ref: "Problem" },
  testcasesInput: { type: String },
  testcasesOutput: { type: String },
});

module.exports = mongoose.model("TestCase", testcaseSchema);
