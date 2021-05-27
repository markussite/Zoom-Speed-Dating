const mongoose = require("mongoose"),
  { Schema } = mongoose,
  userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  geschlecht: String,
  alter: {
    type: Number,
    min: [1, "Geben sie ein Richtiges Alter an"],
    max: [130, "Geben sie ein Richtiges Alter an"]
  },
  hobbys: [{type: Schema.Types.ObjectId, ref: "Hobby"}],
  sucht: String,
  interessiert: String,
  wohnort: String,
  religion: String
})
{
  timestamps: true
};
userSchema.methods.getInfo = function () {
  return `Name: ${this.name} Email: ${this.email}`;
};
module.exports = mongoose.model("User", userSchema);
