exports.showHomepage = (req, res) => {
  res.render("homepage");
};
exports.showSignUp = (req, res) => {
  res.render("contact");
};
exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
};
