//require the modules
const passport = require("passport"), //passport module
  cookieParser = require("cookie-parser"),
  expressSession = require("express-session"),
  User = require("./models/user");

router.use(cookieParser("secretCuisine123"));
router.use(expressSession({
  secret: "secretCuisine123",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const connectFlash = require("connect-flash"); //connect-flash module
router.use(connectFlash())
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

const expressValidator = require("express-validator") //express validator module
router.use(expressValidator())
//add validation middleware to the user reate route
router.post("/users/create", userController.validate, userController.create, userController.redirectView);


const mongoose = require("mongoose"); //mongoose module
mongoose.connect(
  "mongodb://localhost:27017/zoomSpeedDating_db",
  {useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
})

//Require the error handler controller.
const errorController = require("./controllers/errorController")

//Initialise the app
const express = require("express"),
  app = express();

app.set("port",process.env.PORT || 3000);

//Enables static assets
app.use(express.static("public"))

//Require the express-ejs-layouts module
const layouts = require("express-ejs-layouts");
app.set("view engine", "ejs"); // Set the application to use ejs.
app.use(layouts); //Set the application to use the layout.

//Tell the Express.js app to use body-parser for processing URL-encoded and JSON parameters
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

//add a login route to main.js
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate);
router.get("/users/logout", usersController.logout, usersController.redirectView);


const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
//Add routes for the courses, page, contact page and contact form submission.
app.get("/", userController.getUsersPage);
app.get("/addUser", userController.getUsersPage);
app.get("/showUsers", userController.getAllUser);
app.post("/saveUser", userController.saveUser);
//Add error handlers as middleware functions.
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


const server = app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost: ${app.get("port")}`);
});
