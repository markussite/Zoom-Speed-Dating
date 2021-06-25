const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  registerUserSchema = new Schema({
  title: {
    type: String
  }
},
{
  timestamps: true
});
module.exports = mongoose.model("Course", courseSchema);
