const router = require("express").Router(),
  userController = require("../controllers/userController"),
  homeController = require("../controllers/homeController");

//router.get("/", homeController.showHomepage);
router.get("/", userController.index, userController.indexView);
router.get("/users/new", userController.new);
router.get("/users/:id", userController.show, userController.showView);
router.get("/users/:id/edit", userController.edit);
router.put("/users/:id/update", userController.update, userController.redirectView);
router.delete("/users/:id/delete", userController.delete, userController.redirectView);

module.exports = router;
