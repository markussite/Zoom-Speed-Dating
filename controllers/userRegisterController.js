passport = require("passport");

validate: (req, res, next) => {
  req
    .sanitizeBody("email")
    .normalizeEmail({all_lowercase: true
  })
    .trim();
  req.check("email", "Email is invalid").isEmail();
      req.check("password", "Password cannot be empty").notEmpty();
      req.getValidationResult().then((error) => {
        if (!error.isEmpty()) {
          let messages = error.array().map(e => e.msg);

          req.skip = true;
          req.flash("error", messages.join("and"));
          res.locals.redirect = '/userRegister/new';
          next();
        } else {
          next();
        }
      });
    }

    authenticate: passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: "Failed to login.",
        successRedirect: "/",
        successFlash: "Logged in!"
      })
