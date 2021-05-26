const User = require("../models/user");
const passport = require("passport");

exports.getAllUser = (req, res) => {
  User.find({})
    .exec()
    .then((users) => {
      res.render("showUser", {
        users: users
      });
    })
    .catch((error) => {
      console.log(error.message);
      return[];
    })
    .then(() => {
      console.log("promise complete");
    });
};

//add the login action to render my form for browser viewing
login: (req, res) => {
  res.render("users/login");
}

//add passport registration and flash messaging in the create action
create: (req, res, next) => {
  if (req.skip) next();

  let newUser = new User(getUserParams(req.body));

  User.register(newUser, req.body.password, (e, user) => {
    if (user) {
      req.flash("success", `${user.fullName}'s account created successfully!`);
        res.locals.redirect = "/users";
      next();
    } else {
      req.flash("error", `Failed to create user account because: ${e.message}.`);
      res.locals.redirect = "/users/new";
      next();
    }
  });
}

exports.getUsersPage = (req, res) => {
  res.render("contact");
};

exports.saveUser = (req, res) => {
  let newUser = new User( {
    name: req.body.name,
    geschlecht: req.body.geschlecht,
    alter: req.body.alter,
    hobbys: req.body.hobbys,
    sucht: req.body.sucht,
    interessiert: req.body.interessiert,
    wohnort: req.body.wohnort,
    religion: req.body.religion
  })

  newUser.save()
    .then( () => {
      res.render("homepage");
    })
    .catch(error => {
      res.send(error);
    });
};
