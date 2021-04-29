exports.showHomepage = (req, res) => {
  res.render("homepage");
};
exports.showSignUp = (req, res) => {
  res.render("contact");
};
exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
};

var user= [{
    "name": "Hans Zimmer",
    "geschlecht": "Maennlich",
    "alter": 30,
    "hobbys": "Lesen, Schach",
    "sucht": "Frau",
    "interessiert": "Beziehung",
    "wohnort": "Berlin",
    "religion": "Christ",
    "created_at": "2020-05-01T10:15:24.706Z",
    "updated_at": "2020-05-01T10:15:24.706Z"
}];

exports.showUser = (req, res) => {
  res.render("user", {
    shownUser : user
  });
};
