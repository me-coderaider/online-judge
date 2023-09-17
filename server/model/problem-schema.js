const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const problemSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true },
  solved: { type: Boolean },
  creator: { type: String, required: true },
});

// model method takes 2 parameter, first : collection name, 2nd schema for it
module.exports = mongoose.model("Problem", problemSchema);
