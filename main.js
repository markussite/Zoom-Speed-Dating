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



const homeController = require("./controllers/homeController")

//Add routes for the courses, page, contact page and contact form submission.
app.get("/homepage", homeController.showHomepage);
app.get("/contact", homeController.showSignUp);

app.post("/contact", homeController.postedSignUpForm);
app.get("/", homeController.showUser);
//Add error handlers as middleware functions.
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(
    `Server running at http://localhost:${app.get(
      "port"
    )}`
  );
});
