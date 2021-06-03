const UserRegister = require("../models/registerUser");
const passport = require("passport");
getUserParams = (body) => {
    return {
        name: body.name,
        email: body.email,
        password: body.password,
        hobby: body.hobby,
        userAccount: body.userAccount
    }
};

module.exports = {
    index: (req, res, next) => {
        UserRegister.find()
            .then(usersRegister => {
                res.locals.usersRegister = usersRegister;
                next();
            })
            .catch(error => {
                console.log(`Error fetching users:${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
        res.render("usersRegister/index");
    },
    new: (req, res) => {
        res.render("usersRegister/new");
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let userId = req.params.id;
        UserRegister.findById(userId)
            .then(userRegister => {
                res.locals.userRegister = userRegister;
                next();
            })
            .catch(error => {
                console.log(`Error fetching subscriber by ID: ${error.message}`)
                next(error);
            });
    },
    showView: (req, res) => {
        res.render("usersRegister/show");
    },

    edit: (req, res, next) => {
        let userId = req.params.id;
        UserRegister.findById(userId)
            .then(userRegister=> {
                res.render("usersRegister/edit", {
                    userRegister: userRegister
                });
            }).catch(error => {
            console.log(`Error fetching subscriber by ID: ${error.message}`);
            next(error);
        });
    },

    update: (req, res, next) => {
        let userId = req.params.id,
            userRegisterParams = getUserParams(req.body);

        UserRegister.findByIdAndUpdate(userId, {
            $set: userRegisterParams
        })
            .then(user => {
                res.locals.redirect = `/usersRegister/${userId}`;
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
        UserRegister.findByIdAndRemove(userId)
            .then(() => {
                res.locals.redirect = "/usersRegister";
                next();
            })
            .catch(error => {
                console.log(`Error deleting user by ID: ${error.message}`);
                next();
            });
    },

    //add the login action to render my form for browser viewing
    login: (req, res) => {
        res.render("usersRegister/login");
    },

    //add passport registration and flash messaging in the create action
    create: (req, res, next) => {
        if (req.skip) next();

        let newUser = new UserRegister(getUserParams(req.body));

        UserRegister.register(newUser, req.body.password, (e, user) => {
            if (user) {
                req.flash("success", `${user.fullName}'s account created successfully!`);
                res.locals.redirect = "/usersRegister";
                next();
            } else {
                req.flash("error", `Failed to create user account because: ${e.message}.`);
                res.locals.redirect = "/usersRegister/new";
                next();
            }
        });
    },

    //add a validate action
    validate: (req, res, next) => {
        req
            .sanitizeBody("email")
            .normalizeEmail({
                all_lowercase: true
            })
            .trim();
        req.check("email", "Email is invalid").isEmail();
        req.equals(req.body.hobby);
        req.check("password", "Password cannot be empty").notEmpty();
        req.getValidationResult().then((error) => {
            if (!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                req.skip = true;
                req.flash("error", messages.join(" and "));
                res.locals.redirect = '/usersRegister/new';
                next();
            } else {
                next();
            }
        });
    },

    //add authentication middleware with redirect and flash-message options
    authenticate: passport.authenticate("local", {
        failureRedirect: "/usersRegister/login",
        failureFlash: "Failed to login.",
        successRedirect: "/",
        successFlash: "Logged in!"
    }),

    //logout action
    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You have been logged out!");
        res.locals.redirect = " / " ;
        next();
    }

};