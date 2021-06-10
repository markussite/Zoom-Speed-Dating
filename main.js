const router = require("./routes/index");
const passport = require("passport"), //passport module
  cookieParser = require("cookie-parser"),
  expressSession = require("express-session"),
  User = require("./models/user");

const mongoose = require("mongoose"); //mongoose module
mongoose.connect(
  "mongodb://localhost:27017/zoomSpeedDating_db",
  {useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
})



//Initialise the app
const express = require("express").Router(),
  app = express();
app.use("/", router);
app.set("port",process.env.PORT || 3000);

const methodOverride = require("method-override")
app.use(
  methodOverride(
    "_method", {
  methods: ["POST", "GET"]
}));

//Enables static assets
app.use(express.static("public"))

//Require the express-ejs-layouts module
const layouts = require("express-ejs-layouts");
app.set("view engine", "ejs"); // Set the application to use ejs.


//Tell the Express.js app to use body-parser for processing URL-encoded and JSON parameters
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(cookieParser("secretzoomSpeedDating123"));
app.use(expressSession({
  secret: "secretzoomSpeedDating123",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const connectFlash = require("connect-flash"); //connect-flash module
app.use(connectFlash())
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

app.use(layouts); //Set the application to use the layout.

const expressValidator = require("express-validator") //express validator module
app.use(expressValidator())
//add validation middleware to the user reate route
app.post("/usersRegister/create", function(req,res) {
  userRegisterController.validate, userRegisterController.create, userRegisterController.redirectView
});



const server = app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost: ${app.get("port")}`);
});
