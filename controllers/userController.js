const User = require("../models/user");
const passport = require("passport");
  getuserParams = (body) => {
    return {
      name: body.name,
      email: body.email,
      geschlecht: body.geschlecht,
      alter: parseInt(body.alter),
      hobbys: body.hobbys,
      sucht: body.sucht,
      interessiert: body.interessiert,
      wohnort: body.wohnort,
      religion: body.religion
    }
  };

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users:${error.message}`);
        next(error);
      });
    },
    indexView: (req, res) => {
      res.render("users/index");
    },
    new: (req, res) => {
      res.render("users/new");
    },
    create: (req, res, next) => {
      let userParams = getUserParams(req.body);
      User.create(userParams)
        .then(user => {
          res.locals.redirect = "/users";res.locals.user = user;
          next();
        }).catch(error => {
          console.log(`Error saving user:${error.message}`);
          next(error);
        });
      },
            redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
      },
      show: (req, res, next) => {
        var userId = req.params.id;
        User.findById(userId)
        .then(user => {
          res.locals.user = user;
          next();
        })
        .catch(error => {
          console.log(`Error fetching subscriber by ID: ${error.message}`)
          next(error);
        });
      },
      showView: (req, res) => {
        res.render("users/show");
        },

        edit: (req, res, next) => {
          var userId = req.params.id;
          User.findById(userId)
          .then(user => {
          res.render("users/edit", {
            user: user
          });
        }).catch(error => {
          console.log(`Error fetching subscriber by ID: ${error.message}`);
          next(error);
        });
      },

      update: (req, res, next) => {
        let userId = req.params.id,
        userParams = getUserParams(req.body);

        User.findByIdAndUpdate(userId, {
          $set: userParams
        })
          .then(user => {
            res.locals.redirect = `/users/${userId}`;
            res.locals.user = user;
            next();
          })
          .catch(error => {
            console.log(`Error updating user by ID: ${error.message}`);
            next(error);
          });
        },
        delete: (req, res, next) => {
          let userId = req.params.id;
          User.findByIdAndRemove(userId)
          .then(() => {
            res.locals.redirect = "/users";
            next();
          })
          .catch(error => {
            console.log(`Error deleting user by ID: ${error.message}`);
            next();
          });
        }
      };

  //add the login action to render my form for browser viewing
login: (req, res) => {
  res.render("users/login");
  //local variables to the response through middleware
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
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

//add a validate action
validate: (req, res, next) => {
  req
    .sanitizeBody("email")
    .normalizeEmail({
      all_lowercase: true
    })
    .trim();
  req.check("email", "Email is invalid").isEmail();
  req.equals(req.body.zipCode);
  req.check("password", "Password cannot be empty").notEmpty();
  req.getValidationResult().then((error) => {
    if (!error.isEmpty()) {
      let messages = error.array().map(e => e.msg);
      req.skip = true;
      req.flash("error", messages.join(" and "));
      res.locals.redirect = '/users/new';
      next();
    } else {
      next();
    }
  });
}

//add authentication middleware with redirect and flash-message options
authenticate: passport.authenticate("local", {
  failureRedirect: "/users/login",
  failureFlash: "Failed to login.",
  successRedirect: "/",
  successFlash: "Logged in!"
})

//logout action
logout: (req, res, next) => {
  req.logout();
  req.flash("success", "You have been logged out!");
  res.locals.redirect = " / " ;
  next();
}
