const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let todoSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    collection: "todos",
  }
);
module.exports = mongoose.model("Todo", todoSchema);
