const User = require("../models/user");
getUserParams = (body) => {
    return {
        name: body.name,
        email: body.email,
        geschlecht: body.geschlecht,
        alter: parseInt(body.alter),
        hobbys: body.hobbys,
        sucht: body.sucht,
        interessiert: body.interessiert,
        wohnort: body.wohnort,
    };
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
    homepage: (req, res) => {
        res.render("homepage");
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let userId = req.params.id;
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
        let userId = req.params.id;
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
    },


    create: (req, res, next) => {
        let userParams = getUserParams(req.body);
        User.create(userParams).then(user => {
            res.locals.redirect = "/subscribers";
            res.locals.subscriber = user;
            next();
        }).catch(error => {
            console.log(`Error saving user:${error.message}`);
            next(error);
        });
    },
};
