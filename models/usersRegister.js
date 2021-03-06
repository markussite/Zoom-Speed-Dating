const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),

  usersRegisterSchema = new Schema({
  name: {
    first: {
      type: String,
      trim: true
    },
  last: {
    type: String,
    trim: true
    }
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  
  password: {
    type: String,
    required: true
    },

  hobby: [
    {
      type: Schema.Types.ObjectId,
      ref: "Hobby"
    }
  ],
  userAccount: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
},
{
  timestamps: true
}
);

//registerUser. .getInfo("fullName").get(function(){
 // return `${this.name.first} ${this.name.last}`
//});

usersRegisterSchema.pre("save", function (next) {
  let regUser = this;
  if (reqUser.regAccount === undefined) {
    User.findeOne({
      email: registerUser.email
    })
    .catch(error => {
      console.log(`Error in connecting user: ${error.message}`);
      next(error);
    });
  } else{
    next();
  }
});
module.exports = mongoose.model("usersRegister", usersRegisterSchema)
