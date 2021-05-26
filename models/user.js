//require the modules
const passportLocalMongoose = require("passport-local-mongoose")
userSchema.plugin(passportLocalMongoose, {
usernameField: "email"
});

const mongoose = require("mongoose"),
  userSchema = mongoose.Schema({
  name: String,
  geschlecht: String,
  alter: Number,
  hobbys: String,
  sucht: String,
  interessiert: String,
  wohnort: String,
  religion: String
});

module.exports = mongoose.model("User", userSchema);
