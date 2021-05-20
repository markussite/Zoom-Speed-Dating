const User = require("../models/user");

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

exports.getUsersPage = (req, res) => {
  res.render("contact");
};

exports.saveUser = (req, res) => {
  console.log(req.body);
  let newUser = new User( {
    name: req.body.name,
    geschlecht: req.body.geschlecht,
    alter: req.body.alter,
    hobbys: req.body.hobbys,
    sucht: req.body.sucht,
    interessiert: req.body.interessiert,
    wohnort: req.body.wohnort,
    religion: req.body.religion
  });

  newUser.save()
    .then( () => {
      res.render("showUser");
    })
    .catch(error => {
      res.send(error);
    });
};
