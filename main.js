//require the modules
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

//Require the error handler controller.
const errorController = require("./controllers/errorController")

//Initialise the app
const express = require("express"),
  app = express();

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

const router = express.Router();
const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
const userRegisterController = require("./controllers/userRegisterController");
//Add routes for the courses, page, contact page and contact form submission.

app.use("/", router);
router.get("/", userController.homepage);
router.get("/users", userController.index, userController.indexView);
router.get("/users/new", userController.new);
router.post("/users/create", userController.create);
router.get("/users/:id", userController.show, userController.showView);
router.get("/users/:id/edit", userController.edit);
router.put("/users/:id/update", userController.update, userController.redirectView);
router.delete("/users/:id/delete", userController.delete, userController.redirectView);

router.get("/usersRegister", userRegisterController.index, userRegisterController.indexView);
router.get("/usersRegister/new", userRegisterController.new);
router.get("/usersRegister/login", userRegisterController.login);
router.post("/usersRegister/create", userRegisterController.create);
router.get("/usersRegister/:id", userRegisterController.show, userRegisterController.showView);
router.get("/usersRegister/:id/edit", userRegisterController.edit);
router.put("/usersRegister/:id/update", userRegisterController.update, userRegisterController.redirectView);
router.delete("/usersRegister/:id/delete", userRegisterController.delete, userRegisterController.redirectView);

router.use(cookieParser("secretzoomSpeedDating123"));
router.use(expressSession({
  secret: "secretzoomSpeedDating123",
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

router.use(layouts); //Set the application to use the layout.

const expressValidator = require("express-validator") //express validator module
router.use(expressValidator())
//add validation middleware to the user reate route
router.post("/usersRegister/create", function(req,res) {
  userRegisterController.validate, userRegisterController.create, userRegisterController.redirectView
});

//Add error handlers as middleware functions.
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


const server = app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost: ${app.get("port")}`);
});
